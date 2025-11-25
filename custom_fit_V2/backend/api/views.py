from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from .serializers import UserProfileSerializer, ProjectSerializer, RolSerializer
from .models import UserProfile, Project, Rol, Tela, Estampado, Producto, ProveedorSolicitud
import random
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
import logging
import string
from django.core.mail import send_mail
from django.db import OperationalError
from .serializers import TelaSerializer,EstampadoSerializer,ProductoSerializer, ProveedorSolicitudSerializer, ProductosPersonalizadosSerializer
from .models import ProductosPersonalizados
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from functools import wraps;
from rest_framework.decorators import authentication_classes
from .models import Carrito, CarritoItem, Producto
from .serializers import CarritoSerializer
from .models import Carrito, CarritoItem, Pedido, PedidoItem, Producto
from .serializers import PedidoSerializer
from django.db import transaction
logger = logging.getLogger(__name__)

def admin_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not hasattr(request.user, 'userprofile') or request.user.userprofile.rol.id != 2:
            return Response({'error': 'NO autenticado'}, status=status.HTTP_403_FORBIDDEN)

        return func(request, *args, **kwargs)
    return wrapper


def home(request):
    """Vista de inicio."""
    return HttpResponse("Principal")
class UserViewSet(viewsets.ModelViewSet):
    """Vista para gestionar el perfil del usuario."""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        """Guardar un nuevo perfil de usuario."""
        serializer.save()

    def perform_update(self, serializer):
        """Actualizar un perfil de usuario existente."""
        serializer.save()

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def register_user(request):
    """Registrar un nuevo usuario."""
    try:
        # Obtener los datos del request
        data = request.data
        
        # Validar que los campos requeridos estén presentes
        required_fields = ['nombre_usuario', 'correo_electronico', 'password', 'nombres', 'apellidos']
        for field in required_fields:
            if not data.get(field):
                return Response({
                    'error': f'El campo {field} es requerido'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar si el usuario ya existe
        if User.objects.filter(username=data.get('nombre_usuario')).exists():
            return Response({
                'error': 'El nombre de usuario ya existe'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(email=data.get('correo_electronico')).exists():
            return Response({
                'error': 'El correo electrónico ya está registrado'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Crear el usuario de Django
        user = User.objects.create_user(
            username=data.get('nombre_usuario'),
            email=data.get('correo_electronico'),
            password=data['password']
        )
        codigo = generar_codigo()
        # Validar confirmación de correo si viene
        confirmar_correo = data.get('confirmar_correo') or data.get('conf_correo_electronico')
        correo = data.get('correo_electronico')
        if confirmar_correo and confirmar_correo != correo:
            return Response({'error': 'El correo y su confirmación no coinciden'}, status=status.HTTP_400_BAD_REQUEST)

        # Resolver rol: puede venir como id o como nombre (desde el frontend suelen enviar el nombre)
        rol_input = data.get('rol')
        rol_obj = None
        if rol_input is not None and rol_input != '':
            # intentar interpretar como id
            try:
                rol_obj = Rol.objects.get(pk=int(rol_input))
            except (ValueError, TypeError, Rol.DoesNotExist):
                # intentar buscar por nombre (case-insensitive)
                rol_obj = Rol.objects.filter(nombrerol__iexact=str(rol_input)).first()

        # si no se encontró, usar rol por defecto (intentamos id 2, si no existe creamos o usamos el primero)
        if not rol_obj:
            rol_obj = Rol.objects.filter(pk=2).first()
            if not rol_obj:
                rol_obj = Rol.objects.first()
            if not rol_obj:
                # crear un rol por defecto seguro
                rol_obj = Rol.objects.create(nombrerol='User', descripcion='Usuario normal con permisos limitados')

        # Crear el perfil de usuario
        user_profile = UserProfile.objects.create(
            user=user,
            nombres=data.get('nombres'),
            apellidos=data.get('apellidos'),
            nombre_usuario=user.username,
            celular=data.get('celular', ''),  # Campo opcional
            correo_electronico=correo or user.email,
            conf_correo_electronico=confirmar_correo or correo or user.email,
            rol=rol_obj,
            codigo_verificacion=codigo
        )
        
        # Serializar la respuesta
        serializer = UserProfileSerializer(user_profile)
        
        return Response({
            'message': 'Usuario registrado correctamente',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        logger.error(f"Error during user registration: {str(e)}")
        return Response({
            'error': f'Error interno del servidor: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def generar_codigo():
    """Generar un código de verificación aleatorio de 6 dígitos."""
    return str(random.randint(100000, 999999))

    
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def enviar_codigo_view(request):
    """Enviar un código de verificación al correo electrónico del usuario."""
    correo_electronico = request.data.get('correo_electronico')
    if not correo_electronico:
        return Response({'status': 'error', 'message': 'Correo electrónico no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_profile = UserProfile.objects.get(correo_electronico=correo_electronico)
        codigo = generar_codigo()
        user_profile.codigo_verificacion = codigo
        user_profile.save()

        send_mail(
            'Tu código de verificación',
            f'Tu código es {codigo}',
            'noreply@tuapp.com',
            [correo_electronico],
            fail_silently=False,
        )
        return Response({'status': 'ok', 'message': 'Código enviado'}, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({'status': 'error', 'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error during code sending: {str(e)}")
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login_view(request):
    correo_electronico = request.data.get('correo_electronico')
    codigo_verificacion = request.data.get('codigo_verificacion')

    try:
        user_profile = UserProfile.objects.get(correo_electronico=correo_electronico)
        
        if user_profile.codigo_verificacion == str(codigo_verificacion):
            user_profile.codigo_verificacion = None
            user_profile.save()

            token, created = Token.objects.get_or_create(user=user_profile.user)

            return Response({
                'status': 'ok',
                'nombre_usuario': user_profile.nombre_usuario,
                'nombres': user_profile.nombres,
                'apellidos': user_profile.apellidos,
                'correo_electronico': user_profile.correo_electronico,
                'celular': user_profile.celular,
                'token': token.key,
                'rol': user_profile.rol.id  # <-- asegúrate de enviar el rol
            }, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'Código incorrecto'}, status=status.HTTP_401_UNAUTHORIZED)

    except UserProfile.DoesNotExist:
        return Response({'status': 'error', 'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CustomAuthToken(ObtainAuthToken):
    """Clase personalizada para manejar la autenticación y token del usuario."""
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'name': user.username,
            'avatarUrl': getattr(user, 'avatarUrl', None),
        })

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def logout_view(request):
    """Cerrar sesión del usuario."""
    try:
        request.user.auth_token.delete()
        return Response({'status': 'ok', 'message': 'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error during logout: {str(e)}")
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        user_profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user_profile.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
# Add views for Project model
@api_view(['GET', 'POST'])
def project_list(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response({'error': 'Proyecto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Add views for Rol model
@api_view(['GET', 'POST'])
def rol_list(request):
    if request.method == 'GET':
        roles = Rol.objects.all()
        serializer = RolSerializer(roles, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def rol_detail(request, pk):
    try:
        rol = Rol.objects.get(pk=pk)
    except Rol.DoesNotExist:
        return Response({'error': 'Rol no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RolSerializer(rol)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RolSerializer(rol, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        rol.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def update_user(request, pk):
    try:
        user_profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)  # partial=True permite actualizar parcialmente

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@admin_required
def tela_list(request):
    if request.method == 'GET':
        telas = Tela.objects.all().order_by('idTela')
        serializer = TelaSerializer(telas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = TelaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔍 Consultar, actualizar o eliminar una tela específica
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def tela_detail(request, pk):
    try:
        tela = Tela.objects.get(pk=pk)
    except Tela.DoesNotExist:
        return Response({'error': 'Tela no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TelaSerializer(tela)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = TelaSerializer(tela, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        tela.delete()
        return Response({'message': 'Tela eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)





@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def talla_update_delete(request, pk):
    """
    Endpoint para ver, actualizar (PUT/PATCH) o eliminar una talla por su id.
    """
    try:
        talla = Talla.objects.get(pk=pk)
    except Talla.DoesNotExist:
        return Response({'error': 'Talla no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TallaSerializer(talla)
        return Response(serializer.data)
    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'
        serializer = TallaSerializer(talla, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        talla.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_required
def talla_list(request):
    tallas = Talla.objects.all()
    serializer = TallaSerializer(tallas, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_required
def talla_detail(request, pk):
    try:
        talla = Talla.objects.get(pk=pk)
    except Talla.DoesNotExist:
        return Response({'error': 'Talla no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TallaSerializer(talla)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@admin_required
def talla_create(request):
    serializer = TallaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
    
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def talla_update_delete(request, pk):
    try:
        talla = Talla.objects.get(pk=pk)
    except Talla.DoesNotExist:
        return Response({"error": "Talla no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = TallaSerializer(talla, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        talla.delete()
        return Response({"mensaje": "Talla eliminada"}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_required
def estampado_list(request):
    estampados = Estampado.objects.all()
    serializer = EstampadoSerializer(estampados, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def estampados_usuario_list(request):
    """Endpoint público que devuelve solo estampados creados por usuarios (rolestampado='usuario')."""
    try:
        estampados = Estampado.objects.filter(rolestampado='usuario')
        serializer = EstampadoSerializer(estampados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error fetching usuario estampados: {e}")
        return Response({'error': 'Error interno al obtener estampados'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def estampados_emoji_list(request):
    """Endpoint público que devuelve solo estampados con rol 'emoji' (rolestampado='emoji')."""
    try:
        estampados = Estampado.objects.filter(rolestampado='emoji')
        serializer = EstampadoSerializer(estampados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error fetching emoji estampados: {e}")
        return Response({'error': 'Error interno al obtener estampados'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_required
def estampado_detail(request, pk):
    try:
        estampado = Estampado.objects.get(pk=pk)
        serializer = EstampadoSerializer(estampado)
        return Response(serializer.data)
    except Estampado.DoesNotExist:
        return Response({'error': 'Estampado no encontrado'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@admin_required
def estampado_create(request):
    serializer = EstampadoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def estampado_update_delete(request, pk):
    try:
        estampado = Estampado.objects.get(pk=pk)
    except Estampado.DoesNotExist:
        return Response({'error': 'Estampado no encontrado'}, status=404)

    if request.method == 'PUT':
        serializer = EstampadoSerializer(estampado, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        estampado.delete()
        return Response(status=204)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_required
def color_list(request):
    colores = Color.objects.all()
    serializer = ColorSerializer(colores, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_required
def color_detail(request, pk):
    try:
        color = Color.objects.get(pk=pk)
        serializer = ColorSerializer(color)
        return Response(serializer.data)
    except Color.DoesNotExist:
        return Response({'error': 'Color no encontrado'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@admin_required
def color_create(request):
    serializer = ColorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def color_update_delete(request, pk):
    try:
        color = Color.objects.get(pk=pk)
    except Color.DoesNotExist:
        return Response({'error': 'Color no encontrado'}, status=404)

    if request.method == 'PUT':
        serializer = ColorSerializer(color, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        color.delete()
        return Response(status=204)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def producto_list(request):
    productos = Producto.objects.all()
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)


# CRUD para Productos Personalizados
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@admin_required
def productos_personalizados_list(request):
    try:
        if request.method == 'GET':
            items = ProductosPersonalizados.objects.all()
            serializer = ProductosPersonalizadosSerializer(items, many=True)
            return Response(serializer.data)
        elif request.method == 'POST':
            serializer = ProductosPersonalizadosSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError as oe:
        # probable migration / tabla no creada. Devolvemos lista vacía para no romper el frontend
        logger.error(f"OperationalError in productos_personalizados_list (likely missing table): {str(oe)}")
        return Response([], status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error in productos_personalizados_list: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def productos_personalizados_detail(request, pk):
    try:
        try:
            item = ProductosPersonalizados.objects.get(pk=pk)
        except ProductosPersonalizados.DoesNotExist:
            return Response({'error': 'Producto personalizado no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = ProductosPersonalizadosSerializer(item)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ProductosPersonalizadosSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except OperationalError as oe:
        logger.error(f"OperationalError in productos_personalizados_detail (likely missing table): {str(oe)}")
        return Response({'error': 'Tabla productos_personalizados no encontrada. Ejecuta migraciones.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        logger.error(f"Error in productos_personalizados_detail: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# 🔹 Obtener detalle de un producto (cualquier usuario autenticado)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def producto_detail(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)

    serializer = ProductoSerializer(producto)
    return Response(serializer.data)


# 🔹 Crear un nuevo producto (solo admin)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@admin_required
def producto_create(request):
    serializer = ProductoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# 🔹 Actualizar o eliminar producto (solo admin)
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@admin_required
def producto_update_delete(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)

    if request.method == 'PUT':
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        producto.delete()
        return Response({'message': 'Producto eliminado correctamente'}, status=204)


        
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def proveedor_solicitud_list(request):
    if request.method == 'GET':
        solicitudes = ProveedorSolicitud.objects.all()
        serializer = ProveedorSolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProveedorSolicitudSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=request.user)  # Aquí asignas el usuario autenticado
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def proveedor_solicitud_detail(request, pk):
    try:
        solicitud = ProveedorSolicitud.objects.get(pk=pk)
    except ProveedorSolicitud.DoesNotExist:
        return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProveedorSolicitudSerializer(solicitud)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = ProveedorSolicitudSerializer(solicitud, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        solicitud.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CarritoView(APIView):
    permission_classes = [IsAuthenticated]
# Obtener el carrito del usuario
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_carrito(request):
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)
    serializer = CarritoSerializer(carrito)
    return Response(serializer.data)

# Agregar un producto al carrito
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def agregar_al_carrito(request):
    try:
        usuario = request.user
        producto_id = request.data.get('producto_id')
        cantidad = int(request.data.get('cantidad', 1))

        # Obtener el objeto producto
        producto = Producto.objects.get(idProductos=producto_id)

        # Obtener o crear el carrito del usuario
        carrito, _ = Carrito.objects.get_or_create(usuario=usuario)

        # Obtener o crear el item en el carrito
        item, item_created = CarritoItem.objects.get_or_create(
    carrito=carrito,
    producto=producto,  # Ahora sí funciona
    defaults={'cantidad': cantidad}
)

        if not item_created:
            # Si el item ya existía, solo actualizamos la cantidad
            item.cantidad += cantidad
            item.save()

        return Response({
            'message': 'Producto agregado al carrito',
            'item_id': item.id,
            'cantidad': item.cantidad
        })

    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# Actualizar cantidad de un item
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def actualizar_item(request):
    item_id = request.data.get('item_id')
    cantidad = int(request.data.get('cantidad', 1))

    try:
        item = CarritoItem.objects.get(id=item_id, carrito__usuario=request.user)
        item.cantidad = cantidad
        item.save()
        carrito = item.carrito
        serializer = CarritoSerializer(carrito)
        return Response(serializer.data)
    except CarritoItem.DoesNotExist:
        return Response({"error": "Item no encontrado"}, status=status.HTTP_404_NOT_FOUND)

# Eliminar un item del carrito
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def eliminar_item(request):
    item_id = request.data.get('item_id')

    try:
        item = CarritoItem.objects.get(id=item_id, carrito__usuario=request.user)
        carrito = item.carrito
        item.delete()
        serializer = CarritoSerializer(carrito)
        return Response(serializer.data)
    except CarritoItem.DoesNotExist:
        return Response({"error": "Item no encontrado"}, status=status.HTTP_404_NOT_FOUND)

#PEDIDOS
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def finalizar_compra(request):
    usuario = request.user
    direccion = request.data.get('direccion')
    metodo_pago = request.data.get('metodo_pago')

    carrito, _ = Carrito.objects.get_or_create(usuario=usuario)
    items_carrito = carrito.items.all()

    if not items_carrito:
        return Response({"error": "El carrito está vacío"}, status=400)

    total = sum(item.cantidad * Producto.objects.get(idProductos=item.producto_id).PrecioProducto for item in items_carrito)

    with transaction.atomic():
        pedido = Pedido.objects.create(
            usuario=usuario,
            direccion=direccion,
            metodo_pago=metodo_pago,
            total=total
        )

        for item in items_carrito:
            producto = Producto.objects.get(idProductos=item.producto_id)
            PedidoItem.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=item.cantidad,
                talla=getattr(producto, 'Tallas', None),
                precio_unitario=producto.PrecioProducto
            )

        # Vaciar carrito
        items_carrito.delete()

    serializer = PedidoSerializer(pedido)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def finalizar_compra(request):
    usuario = request.user

    direccion = request.data.get("direccion")
    ciudad = request.data.get("ciudad")
    metodo_pago = request.data.get("metodo_pago")

    if not direccion or not ciudad or not metodo_pago:
        return Response({"error": "Faltan datos del formulario"}, status=400)

    # Obtener carrito
    carrito, _ = Carrito.objects.get_or_create(usuario=usuario)
    items = carrito.items.all()

    if not items.exists():
        return Response({"error": "El carrito está vacío"}, status=400)

    # Calcular total
    total = sum([item.producto.precio * item.cantidad for item in items])

    # Crear Pedido
    pedido = Pedido.objects.create(
        usuario=usuario,
        direccion=direccion,
        ciudad=ciudad,
        metodo_pago=metodo_pago,
        total=total
    )

    # Crear PedidoItems
    for item in items:
        PedidoItem.objects.create(
            pedido=pedido,
            producto=item.producto,
            cantidad=item.cantidad,
            precio=item.producto.precio
        )

    # Vaciar carrito
    items.delete()

    serializer = PedidoSerializer(pedido)
    return Response({
        "message": "Compra realizada con éxito",
        "pedido": serializer.data
    })
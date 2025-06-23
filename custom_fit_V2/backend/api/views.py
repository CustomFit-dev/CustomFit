from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from .serializers import UserProfileSerializer, ProjectSerializer, RolSerializer
from .models import UserProfile, Project, Rol, Tela, Talla, Estampado, Color, Producto
import random
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
import logging 
import string
from django.core.mail import send_mail
from .serializers import TelaSerializer, TallaSerializer, EstampadoSerializer, ColorSerializer, ProductoSerializer

logger = logging.getLogger(__name__)
    

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
        # Crear el perfil de usuario
        user_profile = UserProfile.objects.create(
            user=user,
            nombres=data.get('nombres'),
            apellidos=data.get('apellidos'),
            nombre_usuario=user.username,
            celular=data.get('celular', ''),  # Campo opcional
            correo_electronico=user.email,
            conf_correo_electronico=user.email,
            rol_id=data.get('rol', 1),  # Rol por defecto si no se proporcio
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

# telas
@api_view(['GET', 'POST'])
def tela_list(request):
    if request.method == 'GET':
        telas = Tela.objects.all()
        serializer = TelaSerializer(telas, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TelaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def tela_detail(request, pk):
    try:
        tela = Tela.objects.get(pk=pk)
    except Tela.DoesNotExist:
        return Response({'error': 'Tela no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TelaSerializer(tela)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TelaSerializer(tela, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tela.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





@api_view(['GET'])
def talla_list(request):
    tallas = Talla.objects.all()
    serializer = TallaSerializer(tallas, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def talla_detail(request, pk):
    try:
        talla = Talla.objects.get(pk=pk)
    except Talla.DoesNotExist:
        return Response({'error': 'Talla no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TallaSerializer(talla)
    return Response(serializer.data)

@api_view(['POST'])
def talla_create(request):
    serializer = TallaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
    
@api_view(['PUT', 'DELETE'])
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
def estampado_list(request):
    estampados = Estampado.objects.all()
    serializer = EstampadoSerializer(estampados, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def estampado_detail(request, pk):
    try:
        estampado = Estampado.objects.get(pk=pk)
        serializer = EstampadoSerializer(estampado)
        return Response(serializer.data)
    except Estampado.DoesNotExist:
        return Response({'error': 'Estampado no encontrado'}, status=404)

@api_view(['POST'])
def estampado_create(request):
    serializer = EstampadoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT', 'DELETE'])
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
def color_list(request):
    colores = Color.objects.all()
    serializer = ColorSerializer(colores, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def color_detail(request, pk):
    try:
        color = Color.objects.get(pk=pk)
        serializer = ColorSerializer(color)
        return Response(serializer.data)
    except Color.DoesNotExist:
        return Response({'error': 'Color no encontrado'}, status=404)

@api_view(['POST'])
def color_create(request):
    serializer = ColorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT', 'DELETE'])
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
def producto_list(request):
    productos = Producto.objects.all()
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def producto_detail(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)

@api_view(['POST'])
def producto_create(request):
    serializer = ProductoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT', 'DELETE'])
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
        return Response(status=204)

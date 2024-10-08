from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from .serializers import UserProfileSerializer, ProjectSerializer, RolSerializer
from .models import UserProfile, Project, Rol
import random
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
import logging

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
    serializer = UserProfileSerializer(data=request.data)
    try:
        if serializer.is_valid(raise_exception=True):
            user_data = {
                'username': request.data.get('nombre_usuario'),
                'email': request.data.get('correo_electronico'),
            }
            user = User.objects.create_user(**user_data)
            
            profile_data = {
                'user': user,
                'nombres': request.data.get('nombres'),
                'apellidos': request.data.get('apellidos'),
                'nombre_usuario': user.username,
                'celular': request.data.get('celular'),
                'correo_electronico': user.email,
                'conf_correo_electronico': user.email,
                'rol_id': request.data.get('rol', 2),
            }
            
            UserProfile.objects.create(**profile_data)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error during user registration: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.authtoken.models import Token

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
                'token': token.key
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
    """Eliminar un perfil de usuario."""
    try:
        user_profile = UserProfile.objects.get(pk=pk)
        user_profile.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error during user deletion: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

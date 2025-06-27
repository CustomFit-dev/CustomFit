from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
import random
import logging

from .models import (
    UserProfile, Project, Rol, Tela, Talla, Estampado, Color, Producto, Proveedor
)
from .serializers import (
    UserProfileSerializer, ProjectSerializer, RolSerializer,
    TelaSerializer, TallaSerializer, EstampadoSerializer,
    ColorSerializer, ProductoSerializer, ProveedorSerializer
)

logger = logging.getLogger(__name__)

# -------------------- HOME SIMPLE --------------------

def home(request):
    return HttpResponse("Backend activo correctamente")


# -------------------- USERS --------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        required_fields = ['nombre_usuario', 'correo_electronico', 'password', 'nombres', 'apellidos']
        for field in required_fields:
            if not data.get(field):
                return Response({'error': f'El campo {field} es requerido'}, status=400)

        if User.objects.filter(username=data['nombre_usuario']).exists():
            return Response({'error': 'El nombre de usuario ya existe'}, status=400)

        if User.objects.filter(email=data['correo_electronico']).exists():
            return Response({'error': 'El correo electrónico ya está registrado'}, status=400)

        user = User.objects.create_user(
            username=data['nombre_usuario'],
            email=data['correo_electronico'],
            password=data['password']
        )

        codigo = str(random.randint(100000, 999999))

        user_profile = UserProfile.objects.create(
            user=user,
            nombres=data['nombres'],
            apellidos=data['apellidos'],
            nombre_usuario=user.username,
            correo_electronico=user.email,
            codigo_verificacion=codigo
        )

        serializer = UserProfileSerializer(user_profile)
        return Response({'message': 'Usuario registrado correctamente', 'user': serializer.data}, status=201)

    except Exception as e:
        logger.error(f"Error en el registro: {str(e)}")
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def enviar_codigo_view(request):
    correo = request.data.get('correo_electronico')
    try:
        user_profile = UserProfile.objects.get(correo_electronico=correo)
        codigo = str(random.randint(100000, 999999))
        user_profile.codigo_verificacion = codigo
        user_profile.save()

        send_mail(
            'Tu código de verificación',
            f'Código: {codigo}',
            'noreply@customfit.com',
            [correo],
            fail_silently=False
        )
        return Response({'status': 'ok', 'message': 'Código enviado'}, status=200)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)


@api_view(['POST'])
def login_view(request):
    correo = request.data.get('correo_electronico')
    codigo = request.data.get('codigo_verificacion')

    try:
        user_profile = UserProfile.objects.get(correo_electronico=correo)
        if user_profile.codigo_verificacion == codigo:
            user_profile.codigo_verificacion = None
            user_profile.save()
            token, _ = Token.objects.get_or_create(user=user_profile.user)
            return Response({'status': 'ok', 'token': token.key}, status=200)
        return Response({'error': 'Código incorrecto'}, status=401)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)


@api_view(['POST'])
def logout_view(request):
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Sesión cerrada'}, status=200)
    except:
        return Response({'error': 'Error al cerrar sesión'}, status=500)


@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        UserProfile.objects.get(pk=pk).delete()
        return Response(status=204)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)


@api_view(['PUT'])
def update_user(request, pk):
    try:
        user_profile = UserProfile.objects.get(pk=pk)
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)


# -------------------- CRUD TELAS --------------------

@api_view(['GET', 'POST'])
def tela_list(request):
    if request.method == 'GET':
        telas = Tela.objects.all()
        return Response(TelaSerializer(telas, many=True).data)
    elif request.method == 'POST':
        serializer = TelaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def tela_detail(request, pk):
    try:
        tela = Tela.objects.get(pk=pk)
    except Tela.DoesNotExist:
        return Response({'error': 'Tela no encontrada'}, status=404)

    if request.method == 'GET':
        return Response(TelaSerializer(tela).data)
    elif request.method == 'PUT':
        serializer = TelaSerializer(tela, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        tela.delete()
        return Response(status=204)


# -------------------- CRUD PROVEEDORES --------------------

@api_view(['GET', 'POST'])
def proveedor_list(request):
    if request.method == 'GET':
        proveedores = Proveedor.objects.all()
        return Response(ProveedorSerializer(proveedores, many=True).data)
    elif request.method == 'POST':
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def proveedor_detail(request, pk):
    try:
        proveedor = Proveedor.objects.get(pk=pk)
    except Proveedor.DoesNotExist:
        return Response({'error': 'Proveedor no encontrado'}, status=404)

    if request.method == 'GET':
        return Response(ProveedorSerializer(proveedor).data)
    
    elif request.method in ['PUT', 'PATCH']:
        serializer = ProveedorSerializer(proveedor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        proveedor.delete()
        return Response(status=204)

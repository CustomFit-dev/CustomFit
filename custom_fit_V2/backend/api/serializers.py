from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, Project, Rol,
    Tela, Talla, Estampado, Color,
    Producto, ProveedorSolicitud
)

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombrerol', 'descripcion']

class UserProfileSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'nombres', 'apellidos', 'nombre_usuario', 'celular', 'correo_electronico', 'conf_correo_electronico', 'rol']

    def create(self, validated_data):
        user = validated_data.get('user')
        if not user:
            raise serializers.ValidationError({'user': 'This field is required.'})

        rol = validated_data.get('rol')
        if not rol:
            rol = Rol.objects.get(id=2)  # Ajusta el ID según tu configuración

        user_profile = UserProfile.objects.create(
            user=user,
            nombres=validated_data.get('nombres'),
            apellidos=validated_data.get('apellidos'),
            nombre_usuario=validated_data.get('nombre_usuario'),
            celular=validated_data.get('celular'),
            correo_electronico=validated_data.get('correo_electronico'),
            conf_correo_electronico=validated_data.get('conf_correo_electronico'),
            rol=rol,
        )
        return user_profile

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'start_date', 'end_date', 'comentarios', 'status', 'created', 'modificado']

class TelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tela
        fields = '__all__'

class TallaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talla
        fields = '__all__'

class EstampadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estampado
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(source='userprofile', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'profile']

class ProveedorSolicitudSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)  # Solo lectura

    class Meta:
        model = ProveedorSolicitud
        fields = '__all__'
        read_only_fields = ['usuario']
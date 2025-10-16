from rest_framework import serializers
from .models import UserProfile, Project, Rol
from django.contrib.auth.models import User

from rest_framework import serializers
from .models import UserProfile, Project, Rol
from .models import Tela, Estampado,  Producto, ProveedorSolicitud, ProductosPersonalizados

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    # Hacemos 'user' solo lectura para evitar que se envíe desde el frontend
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    rol = RolSerializer(read_only=True)  # Muestra el objeto completo
    
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'nombres', 'apellidos', 'nombre_usuario', 'celular', 'correo_electronico', 'conf_correo_electronico', 'rol']

    # Override the create method to automatically assign the user and rol if not provided
    def create(self, validated_data):
        # Asignamos el usuario (esto ya se hace en la vista, pero es una buena práctica tenerlo aquí también)
        user = validated_data.get('user')
        if not user:
            raise serializers.ValidationError({'user': 'This field is required.'})

        # Si el rol no viene, asignamos un rol predeterminado
        rol = validated_data.get('rol')
        if not rol:
            rol = Rol.objects.get(id=2)  # Aquí deberías elegir el rol predeterminado, en este caso asumo que el ID 2 es el predeterminado

        # Creamos el UserProfile
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

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombrerol', 'descripcion']

class TelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tela
        fields = '__all__'


class EstampadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estampado
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class ProductosPersonalizadosSerializer(serializers.ModelSerializer):
    # Incluir estampados relacionados (ImgEstampado, NombreEstampado, id, etc.)
    estampados = EstampadoSerializer(many=True, read_only=True)

    class Meta:
        model = ProductosPersonalizados
        fields = '__all__'  # la declaración de 'estampados' será agregada automáticamente al serializer


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
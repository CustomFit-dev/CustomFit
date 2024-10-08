from rest_framework import serializers
from .models import UserProfile, Project, Rol

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'nombres', 'apellidos', 'nombre_usuario', 'celular', 'correo_electronico', 'conf_correo_electronico', 'rol']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'start_date', 'end_date', 'comentarios', 'status', 'created', 'modificado']

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombrerol', 'descripcion']

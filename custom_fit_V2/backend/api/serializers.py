# serializers.py
from rest_framework import serializers
from .models import UserProfile, rol

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = rol
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True) 

    class Meta:
        model = UserProfile
        fields = '__all__'

        
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from .models import UserProfile
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
import random
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from api.models import UserProfile

def home(request):
    return HttpResponse("Principal")

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
def generar_codigo():
    return str(random.randint(100000, 999999))

@api_view(['POST'])
def enviar_codigo_view(request):
    correo_electronico = request.data.get('correo_electronico')
    print(f"Correo electrónico recibido: {correo_electronico}")  # Para verificar si el correo se está recibiendo

    if not correo_electronico:
        return Response({'status': 'error', 'message': 'Correo electrónico no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = UserProfile.objects.get(correo_electronico=correo_electronico)
        codigo = generar_codigo()
        user.codigo_verificacion = codigo
        user.save()

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
        print(f"Error en enviar_codigo_view: {e}")  # Imprimir el error para debug
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login_view(request):
    correo_electronico = request.data.get('correo_electronico')
    codigo_verificacion = request.data.get('codigo_verificacion')
    print(f"Intento de login con correo: {correo_electronico} y código: {codigo_verificacion}")

    try:
        user = UserProfile.objects.get(correo_electronico=correo_electronico)
        if user.codigo_verificacion == codigo_verificacion:
            return Response({'status': 'ok', 'nombre_usuario': user.nombre_usuario}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'Código incorrecto'}, status=status.HTTP_401_UNAUTHORIZED)
    except UserProfile.DoesNotExist:
        return Response({'status': 'error', 'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error en login_view: {e}")  # Imprimir el error para debug
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

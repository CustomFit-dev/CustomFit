from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from .models import UserProfile
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError

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
    

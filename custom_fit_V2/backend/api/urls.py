from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet,register_user

router = DefaultRouter()
router.register(r'userprofiles', UserProfileViewSet)

urlpatterns = [
    path('api/register/', register_user, name='register_user'),
    path('api/userprofiles/', UserProfileViewSet.as_view({'get': 'list'}), name='userprofile-list'),
]

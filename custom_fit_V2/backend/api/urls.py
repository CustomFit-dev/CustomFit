from django.urls import path, include
from .views import home, register_user, enviar_codigo_view, login_view, UserProfileViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'userprofiles', UserProfileViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('api/register/', register_user, name='register_user'),
    path('api/enviar_codigo/', enviar_codigo_view, name='enviar_codigo'),
    path('api/login/', login_view, name='login'),
    path('api/', include(router.urls)),
]
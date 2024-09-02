from django.urls import path, include
from .views import home, register_user, enviar_codigo_view, login_view, UserViewSet,delete_user, logout_view
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'userprofiles', UserViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('api/register/', register_user, name='register_user'),
    path('api/enviar_codigo/', enviar_codigo_view, name='enviar_codigo'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/delete-user/<int:pk>/', delete_user, name='delete-user'),
    path('api/', include(router.urls)),
]
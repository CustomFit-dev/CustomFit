from django.urls import path, include
from .views import home, register_user, enviar_codigo_view, login_view, UserViewSet,delete_user, logout_view
from rest_framework.routers import DefaultRouter
from .views import delete_user
from .views import update_user
from .views import register_user

router = DefaultRouter()
router.register(r'userprofiles', UserViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('api/register/', register_user, name='register_user'),
    path('api/enviar_codigo/', enviar_codigo_view, name='enviar_codigo'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/', include(router.urls)),
     path('api/delete-user/<int:pk>/', delete_user, name='delete-user'),
     path('api/update-user/<int:pk>/', update_user, name='update-user'),
]
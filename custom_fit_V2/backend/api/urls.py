from django.urls import path, include
from .views import (
    home, register_user, enviar_codigo_view, login_view,
    UserViewSet, delete_user, logout_view, update_user,
    tela_list, tela_detail,
    talla_list, talla_detail, talla_create, talla_update_delete,
    estampado_list, estampado_detail, estampado_create, estampado_update_delete,
    color_list, color_detail, color_create, color_update_delete,
    producto_list, producto_detail, producto_create, producto_update_delete, proveedor_solicitud_list, proveedor_solicitud_detail
)
from rest_framework.routers import DefaultRouter

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

    # Telas
    path('api/telas/', tela_list, name='tela-list'),
    path('api/telas/<int:pk>/', tela_detail, name='tela-detail'),

    # Tallas
    path('api/tallas/', talla_list, name='talla-list'),
    path('api/tallas/<int:pk>/', talla_detail, name='talla-detail'),
    path('api/tallas/create/', talla_create, name='talla-create'),
    path('api/tallas/<int:pk>/edit/', talla_update_delete, name='talla-update-delete'),

    # Estampados
    path('api/estampados/', estampado_list, name='estampado-list'),
    path('api/estampados/<int:pk>/', estampado_detail, name='estampado-detail'),
    path('api/estampados/create/', estampado_create, name='estampado-create'),
    path('api/estampados/<int:pk>/edit/', estampado_update_delete, name='estampado-update-delete'),

    # Colores
    path('api/colores/', color_list, name='color-list'),
    path('api/colores/<int:pk>/', color_detail, name='color-detail'),
    path('api/colores/create/', color_create, name='color-create'),
    path('api/colores/<int:pk>/edit/', color_update_delete, name='color-update-delete'),

    # Productos
    path('api/productos/', producto_list, name='producto-list'),
    path('api/productos/<int:pk>/', producto_detail, name='producto-detail'),
    path('api/productos/create/', producto_create, name='producto-create'),
    path('api/productos/<int:pk>/edit/', producto_update_delete, name='producto-update-delete'),

    path('api/proveedorsolicitudes/', proveedor_solicitud_list, name='proveedor-solicitud-list'),
    path('api/proveedorsolicitudes/<int:pk>/', proveedor_solicitud_detail, name='proveedorsolicitud-detail'),
]


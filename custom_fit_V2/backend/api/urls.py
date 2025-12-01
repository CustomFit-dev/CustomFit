from django.urls import path, include
from . import views   # <-- AGREGA ESTA LÍNEA
from .views import (
    home, register_user, enviar_codigo_view, login_view,
    UserViewSet, delete_user, logout_view, update_user,
    tela_list, tela_detail,
    estampado_list, estampado_detail, estampado_create, estampado_update_delete, estampados_usuario_list,
    producto_list, producto_detail, producto_create, producto_update_delete,
    proveedor_solicitud_list, proveedor_solicitud_detail,
    productos_personalizados_list, productos_personalizados_detail, productos_tienda_list,
    estampados_emoji_list,
    obtener_carrito, agregar_al_carrito, actualizar_item, eliminar_item,
    finalizar_compra, finalizar_personalizacion,
    EstadoPedidoViewSet, TransportadoraViewSet, PedidoViewSet,
    paypal_create_order, paypal_capture_order  # <-- NUEVAS VISTAS PAYPAL
)

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'userprofiles', UserViewSet)
router.register(r'estados-pedido', EstadoPedidoViewSet)
router.register(r'transportadoras', TransportadoraViewSet)
router.register(r'pedidos', PedidoViewSet)

urlpatterns = [
    path('', home, name='home'),

    # Auth
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
    
    # Estampados
    path('api/estampados/', estampado_list, name='estampado-list'),
    path('api/estampados/<int:pk>/', estampado_detail, name='estampado-detail'),
    path('api/estampados/create/', estampado_create, name='estampado-create'),
    path('api/estampados/<int:pk>/edit/', estampado_update_delete, name='estampado-update-delete'),
    path('api/estampados_usuario/', estampados_usuario_list, name='estampado-usuario-list'),
    path('api/estampados_emoji/', estampados_emoji_list, name='estampado-emoji-list'),
    # Productos
    path('api/productos/', producto_list, name='producto-list'),
    path('api/productos/<int:pk>/', producto_detail, name='producto-detail'),
    path('api/productos/create/', producto_create, name='producto-create'),
    path('api/productos/<int:pk>/edit/', producto_update_delete, name='producto-update-delete'),

    # Productos personalizados
    path('api/productos_personalizados/', productos_personalizados_list, name='productos-personalizados-list'),
    path('api/productos_personalizados/<int:pk>/', productos_personalizados_detail, name='productos-personalizados-detail'),
    path('api/productos_tienda/', productos_tienda_list, name='productos-tienda-list'),

    # Proveedores
    path('api/proveedorsolicitudes/', proveedor_solicitud_list, name='proveedor-solicitud-list'),
    path('api/proveedorsolicitudes/<int:pk>/', proveedor_solicitud_detail, name='proveedorsolicitud-detail'),

    # Carrito por usuario
    path('api/carrito/obtener/', obtener_carrito, name="carrito-obtener"),
    path('api/carrito/agregar/', agregar_al_carrito, name="carrito-agregar"),
    path('api/carrito/actualizar/', actualizar_item, name="carrito-actualizar"),
    path('api/carrito/eliminar/', eliminar_item, name="carrito-eliminar"),
    
    path('checkout/finalizar/', finalizar_compra, name='finalizar_compra'),
    path('api/personalizar/finalizar/', finalizar_personalizacion, name='finalizar_personalizacion'),

    # PayPal Integration
    path('api/paypal/create-order/', paypal_create_order, name='paypal-create-order'),
    path('api/paypal/capture-order/', paypal_capture_order, name='paypal-capture-order'),

]


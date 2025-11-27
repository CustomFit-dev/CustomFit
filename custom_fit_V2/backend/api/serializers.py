from rest_framework import serializers
from .models import UserProfile, Project, Rol
from django.contrib.auth.models import User
from .models import Carrito, CarritoItem, Producto
from .models import Tela, Estampado,  Producto, ProveedorSolicitud, ProductosPersonalizados
from .models import Pedido, PedidoItem, EstadoPedido, Transportadora

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    # Hacemos 'user' solo lectura para evitar que se envíe desde el frontend
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    rol = RolSerializer(read_only=True)  # Muestra el objeto completo
    
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'nombres', 'apellidos', 'nombre_usuario', 'celular', 'correo_electronico', 'conf_correo_electronico', 'rol']

    # Override the create method to automatically assign the user and rol if not provided
    def create(self, validated_data):
        # Asignamos el usuario (esto ya se hace en la vista, pero es una buena práctica tenerlo aquí también)
        user = validated_data.get('user')
        if not user:
            raise serializers.ValidationError({'user': 'This field is required.'})

        # Si el rol no viene, asignamos un rol predeterminado
        rol = validated_data.get('rol')
        if not rol:
            rol = Rol.objects.get(id=2)  # Aquí deberías elegir el rol predeterminado, en este caso asumo que el ID 2 es el predeterminado

        # Creamos el UserProfile
        user_profile = UserProfile.objects.create(
            user=user,
            nombres=validated_data.get('nombres'),
            apellidos=validated_data.get('apellidos'),
            nombre_usuario=validated_data.get('nombre_usuario'),
            celular=validated_data.get('celular'),
            correo_electronico=validated_data.get('correo_electronico'),
            conf_correo_electronico=validated_data.get('conf_correo_electronico'),
            rol=rol,
        )
        return user_profile


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'start_date', 'end_date', 'comentarios', 'status', 'created', 'modificado']

class TelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tela
        fields = '__all__'


class EstampadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estampado
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class ProductosPersonalizadosSerializer(serializers.ModelSerializer):
    # Incluir estampados relacionados (ImgEstampado, NombreEstampado, id, etc.)
    estampados = EstampadoSerializer(many=True, read_only=True)
    
    # Campo personalizado para compatibilidad con frontend (traduce urlEspadarl -> urlEspaldar)
    urlEspaldar = serializers.SerializerMethodField()

    class Meta:
        model = ProductosPersonalizados
        fields = '__all__'  # la declaración de 'estampados' será agregada automáticamente al serializer
    
    def get_urlEspaldar(self, obj):
        """Retorna el valor de urlEspadarl con el nombre correcto urlEspaldar"""
        return obj.urlEspadarl


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(source='userprofile', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'profile']

class ProveedorSolicitudSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)  # Solo lectura

    class Meta:
        model = ProveedorSolicitud
        fields = '__all__'
        read_only_fields = ['usuario']

class CarritoItemSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_personalizado = ProductosPersonalizadosSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CarritoItem
        fields = ['id', 'producto', 'producto_personalizado', 'cantidad', 'subtotal']

    def get_subtotal(self, obj):
        if obj.producto:
            return obj.cantidad * obj.producto.PrecioProducto
        elif obj.producto_personalizado:
            return obj.cantidad * obj.producto_personalizado.precioPersonalizado
        return 0

class CarritoSerializer(serializers.ModelSerializer):
    items = CarritoItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'items', 'total']

    def get_total(self, obj):
        return sum(item.cantidad * (item.producto.PrecioProducto if item.producto else item.producto_personalizado.precioPersonalizado) for item in obj.items.all())

        #PEDIDOS

class EstadoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPedido
        fields = '__all__'

class TransportadoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transportadora
        fields = '__all__'

class PedidoItemSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.SerializerMethodField()
    producto_imagen = serializers.SerializerMethodField()

    class Meta:
        model = PedidoItem
        fields = ['id', 'producto', 'producto_personalizado', 'producto_nombre', 'producto_imagen', 'cantidad', 'precio', 'subtotal']

    def get_producto_nombre(self, obj):
        if obj.producto:
            return obj.producto.NombreProductos
        elif obj.producto_personalizado:
            return obj.producto_personalizado.NombrePersonalizado
        return "Desconocido"

    def get_producto_imagen(self, obj):
        if obj.producto:
            return obj.producto.urlFrontal
        elif obj.producto_personalizado:
            return obj.producto_personalizado.urlFrontal
        return None


class PedidoSerializer(serializers.ModelSerializer):
    items = PedidoItemSerializer(many=True, read_only=True)
    usuario_nombre = serializers.CharField(source="usuario.nombre_usuario", read_only=True)
    estado_nombre = serializers.CharField(source="estado.nombre", read_only=True)
    transportadora_nombre = serializers.CharField(source="transportadora.nombre", read_only=True)

    class Meta:
        model = Pedido
        fields = [
            'id',
            'usuario',
            'usuario_nombre',
            'fecha',
            'direccion',
            'ciudad',
            'metodo_pago',
            'total',
            'items',
            'estado',
            'estado_nombre',
            'transportadora',
            'transportadora_nombre',
            'numero_guia'
        ]


# Serializador para crear pedido desde Checkout
class CrearPedidoSerializer(serializers.Serializer):
    direccion = serializers.CharField()
    ciudad = serializers.CharField()
    metodo_pago = serializers.CharField()
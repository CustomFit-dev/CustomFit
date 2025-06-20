from django.db import models
from django.contrib.auth.models import User

class Rol(models.Model):
    nombrerol = models.CharField(max_length=20, default="User", null=True, blank=True)
    descripcion = models.CharField(max_length=255, default="Usuario normal con permisos limitados", null=True, blank=True)

    def __str__(self):
        return self.nombrerol


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    nombre_usuario = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    correo_electronico = models.EmailField()
    conf_correo_electronico = models.EmailField()
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name='usuarios', default=2, null=True, blank=True)
    codigo_verificacion = models.CharField(max_length=6, null=True, blank=True)
    fecha_sesion = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    def __str__(self):
        return self.nombre_usuario

    @property
    def email(self):
        return self.user.email

    @property
    def username(self):
        return self.user.username


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comentarios = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Tela(models.Model):
    idTela = models.BigAutoField(primary_key=True)
    NombreTela = models.CharField(max_length=45)
    TipoTela = models.CharField(max_length=45)
    PrecioTela = models.BigIntegerField()
    fecha_agregado = models.DateField()
    Disponibilidad = models.CharField(max_length=45)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tela' 
        managed = False 


class Talla(models.Model):
    idTallas = models.BigAutoField(primary_key=True)
    Talla = models.CharField(max_length=3)
    Disponibilidad = models.CharField(max_length=45)
    genero = models.CharField(max_length=45)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tallas'


class Estampado(models.Model):
    idEstampado = models.BigAutoField(primary_key=True)
    NombreEstampado = models.CharField(max_length=45)
    TipoEstampado = models.CharField(max_length=45)
    PrecioEstampado = models.BigIntegerField()
    ImgEstampado = models.CharField(max_length=100)
    ColorEstampado = models.CharField(max_length=45)
    fecha_agregado = models.DateField()
    Disponibilidad = models.CharField(max_length=45)
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'estampado'  # nombre exacto de tu tabla
        managed = False  


class Color(models.Model):
    IdColor = models.BigAutoField(primary_key=True)
    NombreColor = models.CharField(max_length=45)
    disponibilidad = models.CharField(max_length=2)
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'color'  # nombre exacto en tu base de datos
        managed = False 

class Producto(models.Model):
    idProductos = models.BigAutoField(primary_key=True)
    NombreProductos = models.CharField(max_length=45)
    imgProducto = models.CharField(max_length=100)
    TipoProductos = models.CharField(max_length=45)
    PrecioProducto = models.BigIntegerField()
    Descripcion = models.CharField(max_length=255)
    
    Color_IdColor = models.ForeignKey('Color', on_delete=models.DO_NOTHING, db_column='Color_IdColor')
    Tela_idTela = models.ForeignKey('Tela', on_delete=models.DO_NOTHING, db_column='Tela_idTela')
    Tallas_idTallas = models.ForeignKey('Talla', on_delete=models.DO_NOTHING, db_column='Tallas_idTallas')
    
    fecha_creacion = models.DateField()
    fecha_actualizacion = models.DateField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'productos'
        managed = False
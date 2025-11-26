
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def finalizar_personalizacion(request):
    try:
        data = request.data
        
        # 1. Crear el producto personalizado
        producto_personalizado = ProductosPersonalizados.objects.create(
            NombrePersonalizado=data.get('NombrePersonalizado'),
            precioPersonalizado=data.get('precioPersonalizado'),
            rolProducto=data.get('rolProducto', 'cliente'),
            stock=data.get('stock', 1),
            productos_idProductos_id=data.get('productos_idProductos'), # Asegúrate de enviar este ID desde el frontend
            urlFrontal=data.get('urlFrontal'),
            urlEspadarl=data.get('urlEspadarl'), # Nota: mantener el typo del modelo si es necesario, o corregirlo si se puede
            urlMangaDerecha=data.get('urlMangaDerecha'),
            urlMangaIzquierda=data.get('urlMangaIzquierda')
        )

        # 2. Asociar estampados (si los hay)
        estampados_ids = data.get('estampados', [])
        if estampados_ids:
            # Opción A: Si recibes IDs de estampados ya existentes
            # producto_personalizado.estampados.set(estampados_ids)
            
            # Opción B: Si recibes objetos completos o necesitas lógica custom, iterar
            # Por ahora asumiremos que recibimos una lista de IDs de estampados válidos
            for est_id in estampados_ids:
                 try:
                     estampado = Estampado.objects.get(idEstampado=est_id)
                     ProductosPersonalizadosHasEstampado.objects.create(
                         ProductosPeronalizaos_idProductosPeronalizaos=producto_personalizado,
                         estampado_idEstampado=estampado
                     )
                 except Estampado.DoesNotExist:
                     pass # O manejar el error

        serializer = ProductosPersonalizadosSerializer(producto_personalizado)
        return Response(serializer.data, status=201)

    except Exception as e:
        print(f"Error en finalizar_personalizacion: {e}")
        return Response({'error': str(e)}, status=500)

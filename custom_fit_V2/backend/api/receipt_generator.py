# backend/api/receipt_generator.py
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from io import BytesIO
from datetime import datetime
import os

def generate_payment_receipt(pedido):
    """
    Genera un comprobante de pago en PDF para un pedido dado.
    
    Args:
        pedido: Instancia del modelo Pedido
        
    Returns:
        BytesIO: Buffer con el contenido del PDF
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
    
    # Contenedor para los elementos del PDF
    elements = []
    
    # Estilos
    styles = getSampleStyleSheet()
    
    # Estilo personalizado para el título
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#17BEBB'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para subtítulos
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#17BEBB'),
        spaceAfter=12,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para texto normal
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=6
    )
    
    # Título principal
    title = Paragraph("COMPROBANTE DE PAGO", title_style)
    elements.append(title)
    
    # Nombre de la empresa
    company_name = Paragraph("<b>CustomFit</b>", ParagraphStyle(
        'CompanyName',
        parent=styles['Normal'],
        fontSize=16,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#17BEBB'),
        spaceAfter=20
    ))
    elements.append(company_name)
    
    elements.append(Spacer(1, 0.2*inch))
    
    # Información del pedido
    pedido_info = [
        ['<b>Información del Pedido</b>', ''],
    ]
    
    info_data = [
        ['Número de Pedido:', f'#{pedido.id}'],
        ['Fecha:', pedido.fecha.strftime('%d/%m/%Y %H:%M')],
        ['Estado:', pedido.estado.nombre if pedido.estado else 'N/A'],
        ['Método de Pago:', pedido.metodo_pago.upper()],
    ]
    
    # Agregar información de PayPal si existe
    if pedido.paypal_transaction_id:
        info_data.append(['ID de Transacción PayPal:', pedido.paypal_transaction_id])
    if pedido.paypal_order_id:
        info_data.append(['ID de Orden PayPal:', pedido.paypal_order_id])
    if pedido.paypal_payer_email:
        info_data.append(['Email del Pagador:', pedido.paypal_payer_email])
    if pedido.paypal_payer_name:
        info_data.append(['Nombre del Pagador:', pedido.paypal_payer_name])
    
    pedido_info.extend(info_data)
    
    pedido_table = Table(pedido_info, colWidths=[2.5*inch, 4*inch])
    pedido_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#17BEBB')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 1), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
    ]))
    
    elements.append(pedido_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Información del cliente
    cliente_info = [
        ['<b>Información del Cliente</b>', ''],
        ['Nombre:', pedido.usuario.user.get_full_name() or pedido.usuario.user.username],
        ['Email:', pedido.usuario.user.email],
        ['Dirección de Envío:', pedido.direccion],
        ['Ciudad:', pedido.ciudad],
    ]
    
    cliente_table = Table(cliente_info, colWidths=[2.5*inch, 4*inch])
    cliente_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#17BEBB')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 1), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
    ]))
    
    elements.append(cliente_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Detalles de los productos
    productos_header = [['<b>Detalles de Productos</b>', '', '', '']]
    productos_data = [['Producto', 'Cantidad', 'Precio Unit.', 'Subtotal']]
    
    # Obtener los items del pedido
    from .models import PedidoItem
    items = PedidoItem.objects.filter(pedido=pedido)
    
    for item in items:
        if item.producto:
            nombre = item.producto.NombreProductos
        elif item.producto_personalizado:
            nombre = f"{item.producto_personalizado.NombrePersonalizado} (Personalizado)"
        else:
            nombre = "Producto desconocido"
        
        cantidad = str(item.cantidad)
        precio_unit = f"${item.precio:,.2f}"
        subtotal = f"${(item.precio * item.cantidad):,.2f}"
        
        productos_data.append([nombre, cantidad, precio_unit, subtotal])
    
    # Agregar fila de total
    productos_data.append(['', '', '<b>TOTAL:</b>', f'<b>${pedido.total:,.2f}</b>'])
    
    productos_table = Table(productos_header + productos_data, colWidths=[3*inch, 1*inch, 1.25*inch, 1.25*inch])
    productos_table.setStyle(TableStyle([
        # Header principal
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#17BEBB')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('SPAN', (0, 0), (-1, 0)),
        
        # Subheader de columnas
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor('#E0F7F7')),
        ('TEXTCOLOR', (0, 1), (-1, 1), colors.black),
        ('ALIGN', (0, 1), (-1, 1), 'CENTER'),
        ('FONTNAME', (0, 1), (-1, 1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, 1), 10),
        ('TOPPADDING', (0, 1), (-1, 1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 8),
        
        # Datos de productos
        ('BACKGROUND', (0, 2), (-1, -2), colors.white),
        ('GRID', (0, 0), (-1, -2), 1, colors.grey),
        ('FONTNAME', (0, 2), (-1, -2), 'Helvetica'),
        ('FONTSIZE', (0, 2), (-1, -2), 9),
        ('ALIGN', (1, 2), (1, -2), 'CENTER'),
        ('ALIGN', (2, 2), (2, -2), 'RIGHT'),
        ('ALIGN', (3, 2), (3, -2), 'RIGHT'),
        ('TOPPADDING', (0, 2), (-1, -2), 8),
        ('BOTTOMPADDING', (0, 2), (-1, -2), 8),
        
        # Fila de total
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#E0F7F7')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, -1), (-1, -1), 11),
        ('ALIGN', (2, -1), (2, -1), 'RIGHT'),
        ('ALIGN', (3, -1), (3, -1), 'RIGHT'),
        ('TOPPADDING', (0, -1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 10),
        ('LINEABOVE', (0, -1), (-1, -1), 2, colors.HexColor('#17BEBB')),
    ]))
    
    elements.append(productos_table)
    elements.append(Spacer(1, 0.5*inch))
    
    # Pie de página
    footer_text = Paragraph(
        "<i>Gracias por su compra en CustomFit. Este documento es un comprobante válido de pago.</i>",
        ParagraphStyle(
            'Footer',
            parent=styles['Normal'],
            fontSize=9,
            alignment=TA_CENTER,
            textColor=colors.grey
        )
    )
    elements.append(footer_text)
    
    # Generar el PDF
    doc.build(elements)
    
    # Mover el puntero al inicio del buffer
    buffer.seek(0)
    
    return buffer

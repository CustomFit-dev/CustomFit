# Generated manually to add PayPal fields to Pedido table

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_estadopedido_transportadora_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='paypal_order_id',
            field=models.CharField(blank=True, help_text='ID de la orden de PayPal', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='pedido',
            name='paypal_transaction_id',
            field=models.CharField(blank=True, help_text='ID de la transacción de PayPal', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='pedido',
            name='paypal_payer_email',
            field=models.EmailField(blank=True, help_text='Email del pagador en PayPal', max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='pedido',
            name='paypal_payer_name',
            field=models.CharField(blank=True, help_text='Nombre del pagador en PayPal', max_length=200, null=True),
        ),
    ]

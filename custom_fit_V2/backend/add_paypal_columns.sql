-- Script SQL para agregar campos PayPal a la tabla api_pedido

ALTER TABLE api_pedido 
ADD COLUMN paypal_order_id VARCHAR(100) NULL COMMENT 'ID de la orden de PayPal',
ADD COLUMN paypal_transaction_id VARCHAR(100) NULL COMMENT 'ID de la transacción de PayPal',
ADD COLUMN paypal_payer_email VARCHAR(254) NULL COMMENT 'Email del pagador en PayPal',
ADD COLUMN paypal_payer_name VARCHAR(200) NULL COMMENT 'Nombre del pagador en PayPal';

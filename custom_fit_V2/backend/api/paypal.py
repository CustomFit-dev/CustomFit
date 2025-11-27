# backend/api/paypal.py
import requests
import base64
import os
from decimal import Decimal
import logging

logger = logging.getLogger(__name__)

class PayPalService:
    """Servicio para manejar la integración con PayPal API"""
    
    def __init__(self):
        self.client_id = os.getenv('PAYPAL_CLIENT_ID')
        self.secret = os.getenv('PAYPAL_SECRET')
        self.api_url = os.getenv('PAYPAL_API', 'https://api-m.sandbox.paypal.com')
        self.mode = os.getenv('PAYPAL_MODE', 'sandbox')
        
        if not self.client_id or not self.secret:
            raise ValueError("PayPal credentials not configured in environment variables")
    
    def get_access_token(self):
        """
        Genera un token de acceso OAuth 2.0 para autenticarse con PayPal API
        """
        url = f"{self.api_url}/v1/oauth2/token"
        
        # Codificar credenciales en Base64
        credentials = f"{self.client_id}:{self.secret}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        
        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        data = {
            "grant_type": "client_credentials"
        }
        
        try:
            response = requests.post(url, headers=headers, data=data)
            response.raise_for_status()
            
            token_data = response.json()
            return token_data.get('access_token')
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error getting PayPal access token: {str(e)}")
            raise Exception(f"Failed to get PayPal access token: {str(e)}")
    
    def create_order(self, amount, currency='USD', return_url=None, cancel_url=None):
        """
        Crea una orden de pago en PayPal
        
        Args:
            amount: Monto total a cobrar (Decimal o float)
            currency: Código de moneda (USD, COP, etc.)
            return_url: URL de retorno después del pago exitoso
            cancel_url: URL de retorno si se cancela el pago
        
        Returns:
            dict: Datos de la orden creada incluyendo order_id y approval_url
        """
        access_token = self.get_access_token()
        url = f"{self.api_url}/v2/checkout/orders"
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        # Convertir amount a string con 2 decimales
        if isinstance(amount, Decimal):
            amount_str = f"{amount:.2f}"
        else:
            amount_str = f"{float(amount):.2f}"
        
        # Construir el payload de la orden
        payload = {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": currency,
                        "value": amount_str
                    }
                }
            ],
            "application_context": {
                "brand_name": "CustomFit",
                "landing_page": "BILLING",
                "user_action": "PAY_NOW",
                "return_url": return_url or "http://localhost:3000/checkout/success",
                "cancel_url": cancel_url or "http://localhost:3000/checkout/cancel"
            }
        }
        
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            order_data = response.json()
            
            # Extraer la URL de aprobación
            approval_url = None
            for link in order_data.get('links', []):
                if link.get('rel') == 'approve':
                    approval_url = link.get('href')
                    break
            
            return {
                'order_id': order_data.get('id'),
                'status': order_data.get('status'),
                'approval_url': approval_url,
                'full_response': order_data
            }
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error creating PayPal order: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"PayPal API response: {e.response.text}")
            raise Exception(f"Failed to create PayPal order: {str(e)}")
    
    def capture_order(self, order_id):
        """
        Captura (completa) una orden de PayPal que ya fue aprobada por el usuario
        
        Args:
            order_id: ID de la orden de PayPal
        
        Returns:
            dict: Datos de la captura incluyendo transaction_id y status
        """
        access_token = self.get_access_token()
        url = f"{self.api_url}/v2/checkout/orders/{order_id}/capture"
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        try:
            response = requests.post(url, headers=headers)
            response.raise_for_status()
            
            capture_data = response.json()
            
            # Extraer información de la transacción
            transaction_id = None
            payer_email = None
            payer_name = None
            
            if 'purchase_units' in capture_data and len(capture_data['purchase_units']) > 0:
                captures = capture_data['purchase_units'][0].get('payments', {}).get('captures', [])
                if captures:
                    transaction_id = captures[0].get('id')
            
            if 'payer' in capture_data:
                payer_email = capture_data['payer'].get('email_address')
                payer_name_obj = capture_data['payer'].get('name', {})
                payer_name = f"{payer_name_obj.get('given_name', '')} {payer_name_obj.get('surname', '')}".strip()
            
            return {
                'order_id': order_id,
                'transaction_id': transaction_id,
                'status': capture_data.get('status'),
                'payer_email': payer_email,
                'payer_name': payer_name,
                'full_response': capture_data
            }
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error capturing PayPal order: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"PayPal API response: {e.response.text}")
            raise Exception(f"Failed to capture PayPal order: {str(e)}")
    
    def get_order_details(self, order_id):
        """
        Obtiene los detalles de una orden de PayPal
        
        Args:
            order_id: ID de la orden de PayPal
        
        Returns:
            dict: Detalles completos de la orden
        """
        access_token = self.get_access_token()
        url = f"{self.api_url}/v2/checkout/orders/{order_id}"
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            return response.json()
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error getting PayPal order details: {str(e)}")
            raise Exception(f"Failed to get PayPal order details: {str(e)}")

"""
Django settings for custom_f project.
Adaptado para Render (producción con MySQL + React)
"""

from pathlib import Path
import os
# import dj_database_url  # 👈 asegúrate de tenerlo en requirements.txt

# ----------------------------
# RUTAS BASE
# ----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ----------------------------
# VARIABLES DE ENTORNO (seguras)
# ----------------------------
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'clave-insegura-local')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.environ.get(
    'ALLOWED_HOSTS', 'localhost,127.0.0.1'
).split(',')

CSRF_TRUSTED_ORIGINS = [
    f"https://{host}" for host in ALLOWED_HOSTS if not host.startswith("0.0.0.0")
]


# ----------------------------
# TEMPLATES (necesario para el admin)
# ----------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # carpeta opcional para tus plantillas
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ----------------------------
# APLICACIONES INSTALADAS
# ----------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Paquetes externos
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    # Tus apps
    'api',
]

# ----------------------------
# MIDDLEWARE
# ----------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # 👈 antes del CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ----------------------------
# CORS (para React frontend)
# ----------------------------
CORS_ALLOWED_ORIGINS = [
    
    "http://localhost:3000",  # desarrollo local
    "https://tuappfrontend.onrender.com",  # dominio del frontend en Render
]
CORS_ALLOW_CREDENTIALS = True

# ----------------------------
# REST FRAMEWORK
# ----------------------------
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# ----------------------------
# URLS / WSGI
# ----------------------------
ROOT_URLCONF = 'custom_f.urls'
WSGI_APPLICATION = 'custom_f.wsgi.application'

# ----------------------------
# BASE DE DATOS (usando dj-database-url)
# ----------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'customfit_d3',  
        'USER': 'root',           
        'PASSWORD': '',           
        'HOST': '127.0.0.1',     
        'PORT': '3306',          
    }
}

#'default': dj_database_url.parse( RECORDAR ARRIBA REACTIVAR DJ 
#        os.
#        n.get('DATABASE_URL', 'mysql://root@localhost:3306/customfit_d3'),
#        conn_max_age=600
#    )

# ----------------------------
# VALIDACIÓN DE CONTRASEÑAS
# ----------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ----------------------------
# LOGGING (útil para Render logs)
# ----------------------------
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {'console': {'class': 'logging.StreamHandler'}},
    'loggers': {
        'django': {'handlers': ['console'], 'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO')},
        'api': {'handlers': ['console'], 'level': os.getenv('APP_LOG_LEVEL', 'DEBUG')},
    },
}

# ----------------------------
# INTERNACIONALIZACIÓN
# ----------------------------
LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

# ----------------------------
# ARCHIVOS ESTÁTICOS
# ----------------------------
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# ----------------------------
# EMAILS (opcional)
# ----------------------------
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', 'tu_correo@gmail.com')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', 'tu_app_password')

# ----------------------------
# CLAVE AUTO
# ----------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Imagen base de Python
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar dependencias del sistema para mariadbclient y herramientas básicas
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev build-essential pkg-config \
    mariadb-client curl netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias
COPY requirements.txt /app/

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar TODO el proyecto backend (api, custom_f, manage.py, etc.)
COPY . /app/

# Copiar el script de espera y darle permisos
COPY wait_for_db.sh /wait_for_db.sh
RUN chmod +x /wait_for_db.sh

# Exponer puerto
EXPOSE 8000

# Ejecutar el script que espera a la base de datos, migra y levanta el servidor
CMD ["/wait_for_db.sh"]

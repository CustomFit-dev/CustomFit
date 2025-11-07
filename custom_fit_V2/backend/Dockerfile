# Imagen base de Python
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev build-essential pkg-config \
    mariadb-client curl netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY requirements.txt /app/

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el backend
COPY . /app/

# Exponer puerto
EXPOSE 8000

# Comando de ejecución directo
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

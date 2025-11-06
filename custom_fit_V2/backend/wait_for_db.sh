#!/bin/sh

echo "⏳ Esperando a que MySQL esté disponible..."

# Espera hasta que MySQL acepte conexiones
while ! nc -z db 3306; do
  sleep 1
done

echo "✅ MySQL está disponible. Aplicando migraciones..."
python manage.py makemigrations
python manage.py migrate

echo "🚀 Iniciando servidor Django..."
python manage.py runserver 0.0.0.0:8000

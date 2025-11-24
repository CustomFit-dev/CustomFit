FROM python:3.11-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev build-essential pkg-config \
    mariadb-client curl netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar dependencias
COPY custom_fit_V2/backend/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

# Copiar el backend completo
COPY custom_fit_V2/backend /app

EXPOSE 8000

CMD ["gunicorn", "custom_f.wsgi:application", "--bind", "0.0.0.0:8000"]

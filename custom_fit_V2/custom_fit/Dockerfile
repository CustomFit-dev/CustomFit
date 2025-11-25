# Imagen base
FROM node:18

WORKDIR /app

# Copiar configuraciones
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Construir la aplicación
COPY . .
RUN npm run build

# Instalar servidor estático
RUN npm install -g serve

# Exponer el puerto
EXPOSE 3000

# Servir la build
CMD ["serve", "-s", "dist", "-l", "3000"]

# Etapa 1: Construir el frontend 
FROM node:18 AS build 
WORKDIR /app 
# Copiar configuración e instalar dependencias 
COPY package*.json ./ 
RUN npm install 
# Copiar el resto del frontend 
COPY . . 
# Crear la build optimizada 
RUN npm run build 
# Etapa 2: Servir la app con Nginx 
FROM nginx:alpine 
# Copiar configuración personalizada de Nginx 
COPY nginx.conf /etc/nginx/conf.d/default.conf 
# Copiar la build generada 
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"] 
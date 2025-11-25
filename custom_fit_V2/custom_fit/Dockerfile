# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json si existe
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Compilar el frontend
RUN npm run build

# Instalar servidor estático
RUN npm install -g serve

# Exponer el puerto
EXPOSE 3000

# Servir la build de CRA
CMD ["serve", "-s", "build", "-l", "3000"]

# Imagen base con Node
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto donde corre React
EXPOSE 3000

# Comando para iniciar el frontend
CMD ["npm", "start"]

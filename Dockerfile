FROM node:20-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar yt-dlp
RUN pip3 install --break-system-packages yt-dlp

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm ci --only=production

# Copiar código de la aplicación
COPY . .

# Crear directorio de descargas
RUN mkdir -p /app/downloads

# Puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]

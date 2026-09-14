# Descargador de Videos

Aplicación web para descargar videos y audios de YouTube, TikTok, Instagram y más de 1000 sitios compatibles con yt-dlp.

## Funcionalidades

- Descarga de videos en múltiples calidades (360p - 4K)
- Extracción de audio en formato MP3, M4A y Opus
- Interfaz web intuitiva y responsive
- Limpieza automática de archivos temporales
- Soporte para más de 1000 sitios web

## Tecnologías

- **Backend:** Node.js, Express
- **Herramientas:** yt-dlp, ffmpeg
- **Frontend:** HTML, CSS, JavaScript

## Instalación

### Requisitos previos

- Node.js 20+
- Python 3 (para yt-dlp)
- ffmpeg

### Con Docker (recomendado)

```bash
docker build -t descargador-videos .
docker run -p 3000:3000 descargador-videos
```

### Sin Docker

```bash
npm install
pip install yt-dlp
npm start
```

El servidor estará disponible en `http://localhost:3000`

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/info?url=` | Obtener información del video |
| GET | `/api/download?url=&format=&title=` | Descargar video/audio |
| GET | `/api/files/:filename` | Servir archivo descargado |

## Licencia

MIT

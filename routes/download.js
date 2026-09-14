const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const downloadsDir = path.join(__dirname, '..', 'downloads');

// GET /api/info?url=... - Obtener información del video
router.get('/info', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL es requerida' });
    }

    try {
        const cmd = `yt-dlp --dump-json --no-download "${url}"`;
        
        exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Error obteniendo info:', stderr);
                return res.status(500).json({ error: 'No se pudo obtener información del video' });
            }

            try {
                const info = JSON.parse(stdout);
                
                const formats = {
                    video: [],
                    audio: []
                };

                // Procesar formatos de video
                if (info.formats) {
                    const seen = new Set();
                    
                    info.formats.forEach(fmt => {
                        // Videos con audio integrado
                        if (fmt.vcodec !== 'none' && fmt.acodec !== 'none' && fmt.ext === 'mp4') {
                            const key = `${fmt.height || 'audio'}p`;
                            if (!seen.has(key) && fmt.height) {
                                seen.add(key);
                                formats.video.push({
                                    formatId: fmt.format_id,
                                    quality: `${fmt.height}p`,
                                    ext: fmt.ext,
                                    filesize: fmt.filesize ? (fmt.filesize / 1024 / 1024).toFixed(1) + ' MB' : 'Desconocido',
                                    vcodec: fmt.vcodec,
                                    acodec: fmt.acodec
                                });
                            }
                        }
                    });

                    // Ordenar por calidad
                    formats.video.sort((a, b) => {
                        const heightA = parseInt(a.quality);
                        const heightB = parseInt(b.quality);
                        return heightB - heightA;
                    });

                    // Agregar opciones de audio
                    formats.audio = [
                        { formatId: 'bestaudio', quality: 'Mejor calidad', ext: 'mp3', filesize: 'Variable' },
                        { formatId: 'bestaudio[ext=m4a]', quality: 'M4A (AAC)', ext: 'm4a', filesize: 'Variable' },
                        { formatId: 'bestaudio[ext=opus]', quality: 'Opus', ext: 'opus', filesize: 'Variable' }
                    ];
                }

                // Si no hay formatos específicos, agregar opciones genéricas
                if (formats.video.length === 0) {
                    formats.video = [
                        { formatId: 'bestvideo[height<=2160]+bestaudio/best', quality: '4K', ext: 'mp4', filesize: 'Variable' },
                        { formatId: 'bestvideo[height<=1080]+bestaudio/best', quality: '1080p', ext: 'mp4', filesize: 'Variable' },
                        { formatId: 'bestvideo[height<=720]+bestaudio/best', quality: '720p', ext: 'mp4', filesize: 'Variable' },
                        { formatId: 'bestvideo[height<=480]+bestaudio/best', quality: '480p', ext: 'mp4', filesize: 'Variable' },
                        { formatId: 'bestvideo[height<=360]+bestaudio/best', quality: '360p', ext: 'mp4', filesize: 'Variable' }
                    ];
                }

                res.json({
                    id: info.id,
                    title: info.title || 'Sin título',
                    thumbnail: info.thumbnail,
                    duration: info.duration,
                    duration_string: info.duration_string,
                    uploader: info.uploader || info.channel || 'Desconocido',
                    view_count: info.view_count,
                    upload_date: info.upload_date,
                    description: info.description ? info.description.substring(0, 300) : '',
                    webpage_url: info.webpage_url,
                    formats: formats
                });
            } catch (parseError) {
                console.error('Error parseando JSON:', parseError);
                res.status(500).json({ error: 'Error procesando información del video' });
            }
        });
    } catch (err) {
        console.error('Error general:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// GET /api/download?url=...&format=...&quality=...&title=... - Descargar video
router.get('/download', (req, res) => {
    const { url, format, quality, title } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL es requerida' });
    }

    const fileId = uuidv4();
    const outputTemplate = path.join(downloadsDir, `${fileId}.%(ext)s`);

    let formatArg = '';

    if (format === 'audio') {
        // Descargar solo audio
        formatArg = quality || 'bestaudio';
        const audioFormat = 'mp3';
        
        const cmd = `yt-dlp -x --audio-format ${audioFormat} -f "${formatArg}" -o "${outputTemplate}" "${url}"`;
        
        exec(cmd, { timeout: 300000 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Error descargando audio:', stderr);
                return res.status(500).json({ error: 'Error descargando audio' });
            }

            const safeTitle = sanitizeFilename(title || 'audio');
            findDownloadedFile(fileId, res, 'audio', safeTitle);
        });
    } else {
        // Descargar video con audio siempre
        const cmd = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best" --merge-output-format mp4 -o "${outputTemplate}" "${url}"`;
        
        exec(cmd, { timeout: 600000 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Error descargando video:', stderr);
                return res.status(500).json({ error: 'Error descargando video' });
            }

            const safeTitle = sanitizeFilename(title || 'video');
            findDownloadedFile(fileId, res, 'video', safeTitle);
        });
    }
});

// GET /api/files/:filename - Servir archivo descargado
router.get('/files/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(downloadsDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const ext = path.extname(filename).toLowerCase();

    let contentType = 'application/octet-stream';
    if (ext === '.mp4') contentType = 'video/mp4';
    else if (ext === '.mp3') contentType = 'audio/mpeg';
    else if (ext === '.webm') contentType = 'video/webm';
    else if (ext === '.mkv') contentType = 'video/x-matroska';
    else if (ext === '.m4a') contentType = 'audio/mp4';
    else if (ext === '.opus') contentType = 'audio/opus';

    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fileSize,
        'Content-Disposition': `attachment; filename="${filename}"`
    });

    fs.createReadStream(filePath).pipe(res);
});

// Función para limpiar el nombre del archivo
function sanitizeFilename(name) {
    return name
        .replace(/[<>:"/\\|?*]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 100);
}

// Función auxiliar para encontrar el archivo descargado
function findDownloadedFile(fileId, res, type, safeTitle) {
    setTimeout(() => {
        fs.readdir(downloadsDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error accediendo a archivos' });
            }

            const downloadedFile = files.find(f => f.startsWith(fileId));
            
            if (!downloadedFile) {
                return res.status(500).json({ error: 'Archivo no encontrado después de la descarga' });
            }

            const ext = path.extname(downloadedFile).toLowerCase();
            const finalName = `${safeTitle}${ext}`;
            let contentType = 'application/octet-stream';
            
            if (ext === '.mp4') contentType = 'video/mp4';
            else if (ext === '.mp3') contentType = 'audio/mpeg';
            else if (ext === '.webm') contentType = 'video/webm';
            else if (ext === '.m4a') contentType = 'audio/mp4';
            else if (ext === '.opus') contentType = 'audio/opus';
            else if (ext === '.mkv') contentType = 'video/x-matroska';

            const filePath = path.join(downloadsDir, downloadedFile);
            const stat = fs.statSync(filePath);

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': stat.size,
                'Content-Disposition': `attachment; filename="${finalName}"; filename*=UTF-8''${encodeURIComponent(finalName)}`
            });

            fs.createReadStream(filePath).pipe(res);

            // Eliminar archivo temporal después de enviarlo
            setTimeout(() => {
                try { fs.unlinkSync(filePath); } catch(e) {}
            }, 5000);
        });
    }, 2000);
}

module.exports = router;

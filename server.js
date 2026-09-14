const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const downloadRoutes = require('./routes/download');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Archivos descargados
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}
app.use('/downloads', express.static(downloadsDir));

// Rutas API
app.use('/api', downloadRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Limpiar archivos temporales cada 30 minutos
setInterval(() => {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutos
    
    fs.readdir(downloadsDir, (err, files) => {
        if (err) return;
        
        files.forEach(file => {
            const filePath = path.join(downloadsDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return;
                if (now - stats.mtimeMs > maxAge) {
                    fs.unlink(filePath, () => {});
                }
            });
        });
    });
}, 30 * 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

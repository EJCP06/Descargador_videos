const API_BASE = '';

function getToastFill() {
    return document.documentElement.classList.contains('dark') ? '#1e293b' : '#000000';
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    html.classList.remove('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    sunIcon.classList.toggle('hidden', !isDark);
    moonIcon.classList.toggle('hidden', isDark);
});

// Elementos del DOM
const urlInput = document.getElementById('urlInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const videoThumbnail = document.getElementById('videoThumbnail');
const videoDuration = document.getElementById('videoDuration');
const videoTitle = document.getElementById('videoTitle');
const videoChannel = document.getElementById('videoChannel');
const videoViews = document.getElementById('videoViews');
const videoDescription = document.getElementById('videoDescription');
const videoFormats = document.getElementById('videoFormats');
const downloadBtn = document.getElementById('downloadBtn');
const historySection = document.getElementById('historySection');
const downloadHistory = document.getElementById('downloadHistory');

// Estado de la aplicación
let currentVideoInfo = null;
let selectedFormat = null;
let downloadHistoryList = [];

// Event Listeners
searchBtn.addEventListener('click', searchVideo);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchVideo();
});

// Event Listeners para tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover active de todos los tabs
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.remove('active');
            t.classList.add('bg-gray-100', 'dark:bg-dark-800/50', 'text-gray-500', 'dark:text-dark-400');
            t.classList.remove('bg-white', 'dark:bg-dark-700', 'text-gray-900', 'dark:text-white', 'shadow-sm');
        });
        
        // Ocultar todos los contenidos
        document.getElementById('videoOptions').classList.add('hidden');
        document.getElementById('audioOptions').classList.add('hidden');
        
        // Activar tab clickeado
        tab.classList.add('active');
        tab.classList.remove('bg-gray-100', 'dark:bg-dark-800/50', 'text-gray-500', 'dark:text-dark-400');
        tab.classList.add('bg-white', 'dark:bg-dark-700', 'text-gray-900', 'dark:text-white', 'shadow-sm');
        
        const tabName = tab.dataset.tab;
        document.getElementById(`${tabName}Options`).classList.remove('hidden');
    });
});

// Event Listener para descarga
downloadBtn.addEventListener('click', downloadVideo);

// Buscar video
async function searchVideo() {
    const url = urlInput.value.trim();
    
    if (!url) {
        showStatus('Por favor, ingresa una URL', 'error');
        return;
    }

    // Validar URL
    if (!isValidUrl(url)) {
        showStatus('URL no válida. Asegúrate de pegar una URL completa.', 'error');
        return;
    }

    // Mostrar loading
    setLoading(searchBtn, true);
    hideStatus();
    resultsSection.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE}/api/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (response.ok) {
            currentVideoInfo = data;
            displayVideoInfo(data);
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('fade-in');
            
            // Scroll suave a resultados
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            showStatus(data.error || 'Error al obtener información del video', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('Error de conexión. Verifica tu internet y intenta de nuevo.', 'error');
    } finally {
        setLoading(searchBtn, false);
    }
}

// Mostrar información del video
function displayVideoInfo(info) {
    videoThumbnail.src = info.thumbnail || '';
    videoThumbnail.onerror = () => {
        videoThumbnail.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect fill="%231e293b" width="320" height="180"/><text fill="%2364748b" font-family="Arial" font-size="16" x="160" y="95" text-anchor="middle">Sin imagen</text></svg>');
    };
    
    videoDuration.textContent = info.duration_string || '';
    videoTitle.textContent = info.title || 'Sin título';
    videoChannel.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        ${info.uploader || 'Desconocido'}
    `;
    videoViews.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        ${info.view_count ? formatNumber(info.view_count) + ' vistas' : ''}
    `;
    videoDescription.textContent = info.description || 'Sin descripción disponible';

    // Llenar formatos de video
    videoFormats.innerHTML = '';
    if (info.formats && info.formats.video && info.formats.video.length > 0) {
        info.formats.video.forEach((format, index) => {
            const item = createFormatItem(format, 'video', index === 0);
            videoFormats.appendChild(item);
        });
        selectedFormat = info.formats.video[0];
    } else {
        // Formatos por defecto
        const defaultFormats = [
            { formatId: 'bestvideo[height<=2160]+bestaudio/best', quality: '4K', ext: 'mp4', filesize: 'Mejor calidad' },
            { formatId: 'bestvideo[height<=1080]+bestaudio/best', quality: '1080p', ext: 'mp4', filesize: 'Full HD' },
            { formatId: 'bestvideo[height<=720]+bestaudio/best', quality: '720p', ext: 'mp4', filesize: 'HD' },
            { formatId: 'bestvideo[height<=480]+bestaudio/best', quality: '480p', ext: 'mp4', filesize: 'Estándar' },
            { formatId: 'bestvideo[height<=360]+bestaudio/best', quality: '360p', ext: 'mp4', filesize: 'Baja' }
        ];
        defaultFormats.forEach((format, index) => {
            const item = createFormatItem(format, 'video', index === 1);
            videoFormats.appendChild(item);
        });
        selectedFormat = defaultFormats[1];
    }
}

// Crear elemento de formato
function createFormatItem(format, type, isSelected = false) {
    const item = document.createElement('label');
    item.className = `format-item flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800/50 border-2 ${isSelected ? 'border-primary-500 bg-primary-500/10' : 'border-gray-200 dark:border-dark-600'} rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-dark-700/50 hover:border-gray-300 dark:hover:border-dark-500`;
    
    const radioName = type === 'video' ? 'videoFormat' : 'audioFormat';
    const radioId = `${type}_${format.formatId}_${Math.random().toString(36).substr(2, 9)}`;
    
    item.innerHTML = `
        <div class="flex items-center gap-3">
            <input type="radio" name="${radioName}" id="${radioId}" 
                   value="${format.formatId}" ${isSelected ? 'checked' : ''}
                   class="focus:ring-primary-500 focus:ring-offset-white dark:focus:ring-offset-dark-900">
            <div>
                <span class="font-medium text-gray-900 dark:text-white">${format.quality}</span>
                <span class="text-gray-500 dark:text-dark-400 text-sm ml-2">.${format.ext}</span>
            </div>
        </div>
        <span class="text-gray-400 dark:text-dark-500 text-sm">${format.filesize || 'Variable'}</span>
    `;

    item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
            const radio = item.querySelector('input[type="radio"]');
            radio.checked = true;
        }
        
        // Actualizar estilos de todos los items
        document.querySelectorAll('#videoFormats .format-item, #audioFormats .format-item').forEach(fi => {
            fi.classList.remove('border-primary-500', 'bg-primary-500/10');
            fi.classList.add('border-gray-200', 'dark:border-dark-600');
        });
        
        item.classList.add('border-primary-500', 'bg-primary-500/10');
        item.classList.remove('border-gray-200', 'dark:border-dark-600');
        selectedFormat = format;
    });

    return item;
}

// Descargar video
async function downloadVideo() {
    if (!currentVideoInfo) {
        showStatus('Primero busca un video', 'error');
        return;
    }

    const url = currentVideoInfo.webpage_url;
    const activeTab = document.querySelector('.tab.active').dataset.tab;
    
    let formatArg = '';
    let type = 'video';
    let fileExt = 'mp4';

    if (activeTab === 'audio') {
        const selectedAudio = document.querySelector('input[name="audioFormat"]:checked');
        formatArg = selectedAudio ? selectedAudio.value : 'bestaudio';
        type = 'audio';
        fileExt = 'mp3';
    } else {
        const selectedVideo = document.querySelector('input[name="videoFormat"]:checked');
        formatArg = selectedVideo ? selectedVideo.value : 'bestvideo[height<=1080]+bestaudio/best';
    }

    const fileName = `${currentVideoInfo.title || 'video'}.${fileExt}`;
    const downloadUrl = `${API_BASE}/api/download?url=${encodeURIComponent(url)}&format=${type}&quality=${encodeURIComponent(formatArg)}&title=${encodeURIComponent(currentVideoInfo.title || 'video')}`;
    const tipoLabel = type === 'audio' ? 'audio' : 'video';

    // Abrir dialogo nativo ANTES de cualquier async (requerido por la API)
    let fileHandle = null;
    if ('showSaveFilePicker' in window) {
        try {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [
                    {
                        description: type === 'audio' ? 'Audio MP3' : 'Video MP4',
                        accept: {
                            [type === 'audio' ? 'audio/mpeg' : 'video/mp4']: [`.${fileExt}`]
                        }
                    }
                ]
            });
        } catch (e) {
            if (e.name === 'AbortError') {
                showStatus('Descarga cancelada.', 'error');
                return;
            }
        }
    }

    setLoading(downloadBtn, true);

    // Crear toast de descarga con ID para poder actualizarlo
    const toastId = 'download-toast';
    if (window.gtoast) {
        window.gtoast.show({
            id: toastId,
            title: 'Descargando ' + tipoLabel + '... 0%',
            state: 'loading',
            duration: null,
            autopilot: false,
            fill: getToastFill()
        });
    }

    let progress = 0;
    let progressInterval;

    // Funcion para actualizar el toast
    const updateToast = (pct) => {
        if (window.gtoast) {
            window.gtoast.show({
                id: toastId,
                title: 'Descargando ' + tipoLabel + '... ' + pct + '%',
                state: 'loading',
                duration: null,
                autopilot: false,
                fill: getToastFill()
            });
        }
    };

    // Simular progreso mientras el servidor procesa (yt-dlp tarda)
    progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 3;
            if (progress > 90) progress = 90;
            updateToast(Math.round(progress));
        }
    }, 500);

    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error('Error en la descarga');

        clearInterval(progressInterval);

        // Obtener tamaño total
        const contentLength = response.headers.get('Content-Length');
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
        const reader = response.body.getReader();
        const chunks = [];
        let receivedBytes = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            receivedBytes += value.length;

            // Calcular porcentaje real (empezando desde 90%)
            if (totalBytes > 0) {
                const streamPct = Math.round((receivedBytes / totalBytes) * 10);
                const finalPct = 90 + streamPct;
                updateToast(Math.min(finalPct, 99));
            } else {
                // Si no hay Content-Length, mantener en 90% con animacion
                progress = 90 + (Math.random() * 8);
                updateToast(Math.round(progress));
            }
        }

        const blob = new Blob(chunks);

        // Mostrar 100% antes de guardar
        updateToast(100);

        // Esperar un momento para que se vea el 100%
        await new Promise(r => setTimeout(r, 300));

        // Si se eligió ubicación con el dialogo nativo
        if (fileHandle) {
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            // Actualizar toast a success
                if (window.gtoast) {
                    window.gtoast.show({
                        id: toastId,
                        title: 'Descarga completada',
                        description: 'Archivo guardado como "' + fileName + '"',
                        state: 'success',
                        duration: 4000,
                        fill: getToastFill()
                    });
                }
            addToHistory(currentVideoInfo.title, type === 'audio' ? 'MP3' : 'MP4');
        } else {
            // Fallback: enlace normal
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            }, 100);
            // Actualizar toast a success
            if (window.gtoast) {
                window.gtoast.show({
                    id: toastId,
                    title: 'Descarga completada',
                    description: 'Revisa tu carpeta de descargas.',
                    state: 'success',
                    duration: 4000,
                    fill: getToastFill()
                });
            }
            addToHistory(currentVideoInfo.title, type === 'audio' ? 'MP3' : 'MP4');
        }

    } catch (error) {
        console.error('Error:', error);
        clearInterval(progressInterval);
        // Actualizar toast a error
        if (window.gtoast) {
            window.gtoast.show({
                id: toastId,
                title: 'Error en la descarga',
                description: 'Intenta de nuevo.',
                state: 'error',
                duration: 4000,
                fill: getToastFill()
            });
        }
    } finally {
        setLoading(downloadBtn, false);
    }
}

// Agregar al historial
function addToHistory(title, format) {
    downloadHistoryList.unshift({ title, format, date: new Date() });
    
    if (downloadHistoryList.length > 5) {
        downloadHistoryList.pop();
    }

    updateHistoryDisplay();
}

// Actualizar historial
function updateHistoryDisplay() {
    if (downloadHistoryList.length === 0) {
        historySection.classList.add('hidden');
        return;
    }

    historySection.classList.remove('hidden');
    downloadHistory.innerHTML = '';

    downloadHistoryList.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <span class="history-item-title">${escapeHtml(item.title)}</span>
            <span class="history-item-format">${item.format}</span>
        `;
        downloadHistory.appendChild(div);
    });
}

// Funciones auxiliares
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function setLoading(btn, loading) {
    const textEl = btn.querySelector('.btn-text');
    const loaderEl = btn.querySelector('.btn-loader');
    
    if (loading) {
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-not-allowed');
        textEl.classList.add('hidden');
        loaderEl.classList.remove('hidden');
    } else {
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
        textEl.classList.remove('hidden');
        loaderEl.classList.add('hidden');
    }
}

function showStatus(message, type) {
    if (window.gtoast) {
        const fill = getToastFill();
        if (type === 'success') {
            window.gtoast.success({ title: message, fill });
        } else if (type === 'error') {
            window.gtoast.error({ title: message, fill });
        } else {
            window.gtoast.info({ title: message, fill });
        }
    }
}

function hideStatus() {}

// Inicializar - activar primer tab
document.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.querySelector('.tab');
    if (firstTab) {
        firstTab.classList.add('active');
        firstTab.classList.remove('bg-gray-100', 'dark:bg-dark-800/50', 'text-gray-500', 'dark:text-dark-400');
        firstTab.classList.add('bg-white', 'dark:bg-dark-700', 'text-gray-900', 'dark:text-white', 'shadow-sm');
    }
});

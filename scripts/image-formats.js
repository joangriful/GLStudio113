// Utilidades para manejar formatos modernos de imagen (WebP/AVIF) con fallback

// Detectar soporte de formatos modernos
let formatSupport = {
    webp: null,
    avif: null
};

// Función para detectar soporte de WebP
function detectWebPSupport() {
    if (formatSupport.webp !== null) return formatSupport.webp;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    formatSupport.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    return formatSupport.webp;
}

// Función para detectar soporte de AVIF
function detectAVIFSupport() {
    if (formatSupport.avif !== null) return formatSupport.avif;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 1, 1);
    
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    }).then(supported => {
        formatSupport.avif = supported;
        return supported;
    });
}

// Inicializar detección de formatos
let formatDetectionPromise = null;
function initFormatDetection() {
    if (formatDetectionPromise) return formatDetectionPromise;
    
    formatDetectionPromise = Promise.all([
        Promise.resolve(detectWebPSupport()),
        detectAVIFSupport()
    ]);
    
    return formatDetectionPromise;
}

// Función para obtener la extensión de un archivo
function getFileExtension(path) {
    const match = path.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : '';
}

// Función para obtener el nombre base sin extensión
function getBaseName(path) {
    return path.replace(/\.(jpg|jpeg|png|webp|avif|JPG|JPEG|PNG|WEBP|AVIF)$/i, '');
}

// Función para generar rutas de formatos alternativos
function generateImageSources(originalPath) {
    const baseName = getBaseName(originalPath);
    const originalExt = getFileExtension(originalPath);
    
    const sources = {
        original: originalPath,
        webp: `${baseName}.webp`,
        avif: `${baseName}.avif`
    };
    
    return sources;
}

// Función para crear elemento picture con formatos modernos
function createOptimizedImage(src, alt, options = {}) {
    const {
        loading = 'lazy',
        className = '',
        sizes = '',
        onError = null
    } = options;
    
    const sources = generateImageSources(src);
    const picture = document.createElement('picture');
    
    // Crear source para AVIF (mejor compresión)
    const avifSource = document.createElement('source');
    avifSource.type = 'image/avif';
    avifSource.srcset = sources.avif;
    
    // Crear source para WebP (fallback intermedio)
    const webpSource = document.createElement('source');
    webpSource.type = 'image/webp';
    webpSource.srcset = sources.webp;
    
    // Imagen original como fallback final
    const img = document.createElement('img');
    img.src = sources.original;
    img.alt = alt || '';
    img.loading = loading;
    if (className) img.className = className;
    if (sizes) img.sizes = sizes;
    
    // Manejo de errores con fallback progresivo
    let errorAttempts = 0;
    img.onerror = function() {
        errorAttempts++;
        
        // Si falla AVIF, intentar WebP
        if (errorAttempts === 1 && formatSupport.avif) {
            this.src = sources.webp;
            return;
        }
        
        // Si falla WebP, usar original
        if (errorAttempts === 2 && formatSupport.webp) {
            this.src = sources.original;
            return;
        }
        
        // Si el original también falla, intentar diferentes extensiones
        if (errorAttempts >= 3) {
            const baseName = getBaseName(src);
            const formats = ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png'];
            const currentFormat = getFileExtension(src);
            
            for (let format of formats) {
                if (format.toLowerCase() !== currentFormat.toLowerCase()) {
                    this.src = baseName + format;
                    break;
                }
            }
        }
        
        // Si todo falla, llamar callback de error personalizado
        if (onError && errorAttempts >= 5) {
            onError.call(this);
        }
    };
    
    // Añadir sources al picture (solo si el navegador soporta el formato)
    initFormatDetection().then(([webpSupported, avifSupported]) => {
        if (avifSupported) {
            picture.appendChild(avifSource);
        }
        if (webpSupported) {
            picture.appendChild(webpSource);
        }
    });
    
    picture.appendChild(img);
    
    return picture;
}

// Función para crear imagen simple con formato optimizado (sin picture)
// Útil cuando necesitas solo un elemento img
function createOptimizedImg(src, alt, options = {}) {
    const {
        loading = 'lazy',
        className = '',
        sizes = '',
        onError = null
    } = options;
    
    const sources = generateImageSources(src);
    const img = document.createElement('img');
    
    // Detectar mejor formato disponible
    initFormatDetection().then(([webpSupported, avifSupported]) => {
        if (avifSupported) {
            img.src = sources.avif;
        } else if (webpSupported) {
            img.src = sources.webp;
        } else {
            img.src = sources.original;
        }
    });
    
    // Fallback inmediato al original mientras se detecta
    img.src = sources.original;
    img.alt = alt || '';
    img.loading = loading;
    if (className) img.className = className;
    if (sizes) img.sizes = sizes;
    
    // Manejo de errores con fallback progresivo
    let errorAttempts = 0;
    img.onerror = function() {
        errorAttempts++;
        
        initFormatDetection().then(([webpSupported, avifSupported]) => {
            if (errorAttempts === 1 && avifSupported && this.src === sources.avif) {
                // Si AVIF falla, intentar WebP
                this.src = sources.webp;
            } else if (errorAttempts === 2 && webpSupported && this.src === sources.webp) {
                // Si WebP falla, usar original
                this.src = sources.original;
            } else if (errorAttempts >= 3) {
                // Intentar diferentes extensiones del original
                const baseName = getBaseName(src);
                const formats = ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png'];
                const currentFormat = getFileExtension(src);
                
                for (let format of formats) {
                    if (format.toLowerCase() !== currentFormat.toLowerCase()) {
                        this.src = baseName + format;
                        break;
                    }
                }
            }
            
            // Si todo falla, llamar callback de error personalizado
            if (onError && errorAttempts >= 5) {
                onError.call(this);
            }
        });
    };
    
    return img;
}

// Función helper para codificar rutas (compatible con encodeImagePath existente)
function encodeImagePath(path) {
    const parts = path.split('/');
    const encodedParts = parts.map((part) => encodeURIComponent(part));
    return encodedParts.join('/');
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.ImageFormats = {
        createOptimizedImage,
        createOptimizedImg,
        generateImageSources,
        detectWebPSupport,
        detectAVIFSupport,
        initFormatDetection,
        encodeImagePath
    };
}


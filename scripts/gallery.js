// Funcionalidad de galerías

// Función helper para codificar URLs correctamente (case-sensitive y caracteres especiales)
// Esta función codifica solo los caracteres especiales necesarios para GitHub Pages
function encodeImagePath(path) {
    // Dividir la ruta en partes (directorios y archivo)
    const parts = path.split('/');
    // Codificar cada parte individualmente para mantener las barras
    const encodedParts = parts.map((part) => {
        // Codificar solo los caracteres especiales que pueden causar problemas en URLs
        // Mantener la estructura y case-sensitivity
        return encodeURIComponent(part);
    });
    return encodedParts.join('/');
}

function createGalleryItem(image, isMainGallery = false) {
    const item = document.createElement('div');
    item.className = isMainGallery ? 'gallery-item' : 'photo-item';
    item.dataset.category = image.category.toLowerCase();
    
    const img = document.createElement('img');
    // Codificar la ruta de la imagen para GitHub Pages (case-sensitive y caracteres especiales)
    img.src = encodeImagePath(image.src);
    img.alt = image.title;
    img.loading = 'lazy';
    
    // Manejo de error de imagen - intenta diferentes formatos y mayúsculas/minúsculas
    const errorState = { attempts: 0 };
    const originalSrc = image.src;
    img.onerror = function() {
        errorState.attempts++;
        const baseName = originalSrc.replace(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/i, '');
        
        // Intentar primero con la extensión opuesta (mayúscula/minúscula)
        if (errorState.attempts === 1) {
            const currentExt = originalSrc.match(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/i);
            if (currentExt) {
                const ext = currentExt[0];
                const oppositeExt = ext === ext.toUpperCase() ? ext.toLowerCase() : ext.toUpperCase();
                this.src = baseName + oppositeExt;
                return;
            }
        }
        
        // Si eso falla, intentar otros formatos
        const formats = ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png', '.WEBP', '.webp'];
        if (errorState.attempts <= formats.length) {
            this.src = baseName + formats[errorState.attempts - 1];
        } else {
            // Si ningún formato funciona, usar placeholder
            this.src = `https://via.placeholder.com/800x600/f5f5f5/666666?text=${encodeURIComponent(image.title)}`;
        }
    };
    
    const info = document.createElement('div');
    info.className = isMainGallery ? 'gallery-item-info' : '';
    info.innerHTML = `
        <div class="gallery-item-title">${image.title}</div>
        <div class="gallery-item-category">${image.category}</div>
    `;
    
    item.appendChild(img);
    if (isMainGallery) {
        item.appendChild(info);
    }
    
    // Click para redirigir o abrir modal
    item.addEventListener('click', () => {
        if (isMainGallery) {
            // En la galería principal, redirigir a la página correspondiente
            const category = image.category.toLowerCase();
            if (category.includes('eventos de moda') || category.includes('fashion')) {
                window.location.href = 'fashion-events.html';
            } else if (category.includes('colecciones') || category.includes('collections')) {
                window.location.href = 'collections.html';
            } else if (category.includes('conciertos') || category.includes('concerts')) {
                window.location.href = 'concerts.html';
            }
        } else {
            // En otras galerías, abrir modal
            if (typeof openModal === 'function') {
                openModal(image);
            }
        }
    });
    
    return item;
}

// Cargar galería principal con fotos de todas las secciones
function loadMainGallery() {
    const mainGallery = document.getElementById('mainGallery');
    if (!mainGallery) {
        return;
    }
    
    const allImages = [];
    
    // Mezclar imágenes de todas las secciones
    Object.values(imageData).forEach(section => {
        allImages.push(...section);
    });
    
    if (allImages.length === 0) {
        return;
    }
    
    // Mezclar aleatoriamente
    const shuffled = allImages.sort(() => Math.random() - 0.5);
    
    // Mostrar las primeras 12 imágenes
    shuffled.slice(0, 12).forEach((image, index) => {
        const item = createGalleryItem(image, true);
        item.style.animationDelay = `${index * 0.1}s`;
        mainGallery.appendChild(item);
    });
}

// Cargar secciones individuales - ELIMINADO: Ya no hay secciones en index.html
// function loadSections() {
//     // Esta función ya no se usa en index.html
// }

// Nota: El filtrado de galería se maneja en filters.js


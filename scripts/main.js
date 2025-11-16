// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando carga...');
    
    // Esperar un momento para asegurar que todo el DOM esté listo
    setTimeout(() => {
        console.log('=== INICIANDO CARGA DE CONTENIDO ===');
        loadMainGallery();
        console.log('loadMainGallery ejecutado');
        
        // loadSections(); // Eliminado: Ya no hay secciones en index.html
        
        initAboutSection();
        console.log('initAboutSection ejecutado');
        
        // Verificar que las imágenes se hayan cargado
        setTimeout(() => {
            const photoItems = document.querySelectorAll('.photo-item');
            const galleryItems = document.querySelectorAll('.gallery-item');
            console.log(`\n=== VERIFICACIÓN POST-CARGA ===`);
            console.log(`Total de photo-items encontrados: ${photoItems.length}`);
            console.log(`Total de gallery-items encontrados: ${galleryItems.length}`);
        }, 1000);
    }, 100);
    
    // Animación inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
});

// Preload de imágenes
function preloadImages() {
    const allImages = Object.values(imageData).flat();
    allImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

// Preload después de un delay
setTimeout(preloadImages, 1000);


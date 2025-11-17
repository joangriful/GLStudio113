// Script para las páginas de galería con mural horizontal

// Cursor personalizado (si no está ya inicializado)
if (document.querySelector('.custom-cursor')) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    const interactiveElements = document.querySelectorAll('a, button, .gallery-box, .preview-item, .expanded-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Toggle del menú
const menuToggle = document.getElementById('menuToggle');
const floatingNav = document.getElementById('floatingNav');

if (menuToggle && floatingNav) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        floatingNav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (floatingNav.classList.contains('active') && 
            !floatingNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            floatingNav.classList.remove('active');
        }
    });

    floatingNav.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const section = item.dataset.section;
            
            if (section === 'home') {
                window.location.href = 'index.html';
            } else if (section === 'collections') {
                window.location.href = 'collections.html';
            } else if (section === 'concerts') {
                window.location.href = 'concerts.html';
            } else if (section === 'fashion-events') {
                window.location.href = 'fashion-events.html';
            } else if (section === 'about') {
                window.location.href = 'index.html#about';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && floatingNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            floatingNav.classList.remove('active');
        }
    });
}

// Función helper para codificar URLs correctamente (case-sensitive y caracteres especiales)
// Esta función maneja la codificación para GitHub Pages
function encodeImagePath(path) {
    // Para GitHub Pages, necesitamos mantener la case-sensitivity exacta
    // Los paréntesis en nombres de archivo pueden funcionar sin codificar en algunos casos
    // pero es más seguro codificarlos para evitar problemas
    
    // Dividir la ruta en partes (directorios y archivo)
    const parts = path.split('/');
    
    // Codificar cada parte individualmente para mantener las barras
    const encodedParts = parts.map((part) => {
        // encodeURIComponent codifica:
        // - Paréntesis () como %28 y %29
        // - Espacios como %20
        // - Otros caracteres especiales
        // Mantiene case-sensitivity (mayúsculas/minúsculas exactas)
        return encodeURIComponent(part);
    });
    
    const encodedPath = encodedParts.join('/');
    
    return encodedPath;
}

// Función para crear preview de imágenes
function createPreviewItem(imageSrc, title, allGalleryImages = []) {
    const item = document.createElement('div');
    item.className = 'preview-item';
    
    const img = document.createElement('img');
    // Codificar la ruta de la imagen para GitHub Pages
    const encodedSrc = encodeImagePath(imageSrc);
    img.src = encodedSrc;
    img.alt = title;
    img.loading = 'lazy';
    
    img.onerror = function() {
        console.error('Error al cargar imagen:', encodedSrc);
        // Ocultar imagen si falla
        this.style.display = 'none';
    };
    
    item.appendChild(img);
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentImage = { src: imageSrc, title: title, category: '' };
        // Si hay imágenes de la galería completa, pasarlas todas para poder navegar
        if (allGalleryImages.length > 0) {
            openModal(currentImage, allGalleryImages);
        } else {
            openModal(currentImage);
        }
    });
    
    return item;
}

// Función para crear item expandido con título
function createExpandedItem(image) {
    const item = document.createElement('div');
    item.className = 'expanded-item';
    
    const img = document.createElement('img');
    // Codificar la ruta de la imagen para GitHub Pages
    const encodedSrc = encodeImagePath(image.src);
    img.src = encodedSrc;
    img.alt = image.title;
    img.loading = 'lazy';
    
    img.onerror = function() {
        console.error('Error al cargar imagen:', encodedSrc);
        // Ocultar imagen si falla
        this.style.display = 'none';
    };
    
    // Título de la imagen
    const titleDiv = document.createElement('div');
    titleDiv.className = 'expanded-item-title';
    titleDiv.textContent = image.title || '';
    
    item.appendChild(img);
    item.appendChild(titleDiv);
    
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        // Obtener todas las imágenes de la galería
        const galleryBox = item.closest('.gallery-box');
        if (galleryBox) {
            const galleryDataAttr = galleryBox.dataset.gallery;
            if (galleryDataAttr) {
                const gallery = JSON.parse(galleryDataAttr);
                openModal(image, gallery.images || []);
            } else {
                openModal(image);
            }
        } else {
            openModal(image);
        }
    });
    
    return item;
}

// Función para crear caja de galería
function createGalleryBox(galleryData, index) {
    const box = document.createElement('div');
    box.className = 'gallery-box';
    // Guardar datos de la galería en el elemento para acceso rápido
    box.dataset.gallery = JSON.stringify(galleryData);
    
    // Header
    const header = document.createElement('div');
    header.className = 'gallery-box-header';
    
    const title = document.createElement('h2');
    title.className = 'gallery-box-title';
    title.textContent = galleryData.title;
    
    const toggle = document.createElement('button');
    toggle.className = 'gallery-box-toggle';
    toggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    `;
    
    header.appendChild(title);
    header.appendChild(toggle);
    
    // Preview
    const preview = document.createElement('div');
    preview.className = 'gallery-preview';
    
    // Limitar preview a 3 imágenes
    const previewImages = galleryData.preview.slice(0, 3);
    // Pasar todas las imágenes de la galería para poder navegar entre ellas
    const allGalleryImages = galleryData.images || [];
    previewImages.forEach((imgSrc, i) => {
        const previewItem = createPreviewItem(imgSrc, `${galleryData.title} - Preview ${i + 1}`, allGalleryImages);
        preview.appendChild(previewItem);
    });
    
    // Galería expandida (mural horizontal)
    const expanded = document.createElement('div');
    expanded.className = 'gallery-expanded';
    
    const expandedGrid = document.createElement('div');
    expandedGrid.className = 'expanded-gallery-grid';
    
    // Limitar a máximo 15 imágenes para mejor rendimiento
    const imagesToShow = galleryData.images.slice(0, 15);
    imagesToShow.forEach((image, imgIndex) => {
        const expandedItem = createExpandedItem(image);
        expandedGrid.appendChild(expandedItem);
    });
    
    expanded.appendChild(expandedGrid);
    
    // Toggle expandir/colapsar
    const toggleExpand = () => {
        box.classList.toggle('expanded');
        const isExpanded = box.classList.contains('expanded');
        
        if (isExpanded) {
            // Scroll suave a la caja expandida
            setTimeout(() => {
                box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Añadir efectos dinámicos al scroll
                initParallaxEffects(expanded);
                initScrollAnimations(expandedGrid);
            }, 100);
        } else {
            // Resetear scroll cuando se colapsa
            expanded.scrollLeft = 0;
        }
    };
    
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpand();
    });
    
    box.addEventListener('click', (e) => {
        // Solo expandir si se hace clic en el box, no en los items
        if (e.target === box || e.target === header || e.target === title) {
            toggleExpand();
        }
    });
    
    box.appendChild(header);
    box.appendChild(preview);
    box.appendChild(expanded);
    
    return box;
}

// Efectos de parallax al hacer scroll horizontal
function initParallaxEffects(expandedContainer) {
    if (!expandedContainer) return;
    
    let rafId = null;
    
    const handleScroll = () => {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            const items = expandedContainer.querySelectorAll('.expanded-item');
            const scrollLeft = expandedContainer.scrollLeft;
            const containerWidth = expandedContainer.offsetWidth;
            
            items.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const containerRect = expandedContainer.getBoundingClientRect();
                const itemLeft = rect.left - containerRect.left;
                const itemCenter = itemLeft + rect.width / 2;
                const containerCenter = containerWidth / 2;
                const distanceFromCenter = itemCenter - containerCenter;
                const maxDistance = containerWidth;
                
                // Efecto parallax: las imágenes cercanas al centro se agrandan ligeramente
                const parallaxAmount = Math.abs(distanceFromCenter) / maxDistance;
                const scale = 1 - parallaxAmount * 0.1; // Reduce escala cuanto más lejos del centro
                const opacity = 1 - parallaxAmount * 0.3; // Reduce opacidad cuanto más lejos
                
                item.style.transform = `scale(${Math.max(scale, 0.85)}) translateY(0)`;
                item.style.opacity = Math.max(opacity, 0.6);
            });
            
            rafId = null;
        });
    };
    
    expandedContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpiar cuando se colapsa
    const box = expandedContainer.closest('.gallery-box');
    if (box) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (!box.classList.contains('expanded')) {
                    expandedContainer.removeEventListener('scroll', handleScroll);
                    const items = expandedContainer.querySelectorAll('.expanded-item');
                    items.forEach(item => {
                        item.style.transform = '';
                        item.style.opacity = '';
                    });
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(box, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Animaciones al entrar en el viewport
function initScrollAnimations(expandedGrid) {
    if (!expandedGrid) return;
    
    const items = expandedGrid.querySelectorAll('.expanded-item');
    
    const observerOptions = {
        root: expandedGrid.closest('.gallery-expanded'),
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('parallax-active');
                setTimeout(() => {
                    entry.target.classList.remove('parallax-active');
                }, 500);
            }
        });
    }, observerOptions);
    
    items.forEach(item => {
        observer.observe(item);
    });
}

// Función para inicializar la galería
function initGallery(sectionKey) {
    const galleryBoxes = document.getElementById('galleryBoxes');
    const data = galleryData[sectionKey];
    
    if (!data || !galleryBoxes) return;
    
    data.forEach((gallery, index) => {
        const box = createGalleryBox(gallery, index);
        galleryBoxes.appendChild(box);
    });
}

// Modal para vista ampliada (mantener funcionalidad anterior)
const modal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalCategory = document.querySelector('.modal-category');
const modalClose = document.querySelector('.modal-close');

// Estado del visor
let currentGallery = [];
let currentImageIndex = 0;
let isTransitioning = false;

// Variables para gestos táctiles
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Variable para rastrear si los controles ya están creados
let modalControlsCreated = false;

// Crear controles de navegación si no existen
function createModalControls() {
    if (!modal || modalControlsCreated) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;
    
    // Botón anterior
    let prevBtn = modal.querySelector('.modal-nav-prev');
    if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.className = 'modal-nav-prev';
        prevBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        `;
        prevBtn.setAttribute('aria-label', 'Imagen anterior');
        modalContent.appendChild(prevBtn);
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateImage(-1);
        });
    }
    
    // Botón siguiente
    let nextBtn = modal.querySelector('.modal-nav-next');
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.className = 'modal-nav-next';
        nextBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        nextBtn.setAttribute('aria-label', 'Imagen siguiente');
        modalContent.appendChild(nextBtn);
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateImage(1);
        });
    }
    
    // Contador de imágenes
    let counter = modal.querySelector('.modal-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'modal-counter';
        modalContent.appendChild(counter);
    }
    
    modalControlsCreated = true;
}

// Función global para manejar navegación por teclado (se añade una sola vez)
function handleModalKeyboardNavigation(e) {
    if (!modal || !modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateImage(1);
    } else if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
    }
}

// Añadir listener de teclado una sola vez al cargar la página
if (typeof document !== 'undefined') {
    document.addEventListener('keydown', handleModalKeyboardNavigation);
}

function navigateImage(direction) {
    if (isTransitioning || currentGallery.length === 0) return;
    
    isTransitioning = true;
    const newIndex = (currentImageIndex + direction + currentGallery.length) % currentGallery.length;
    
    // Animación de salida más suave
    if (modalImage) {
        modalImage.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        modalImage.style.opacity = '0';
        modalImage.style.transform = direction > 0 
            ? 'translateX(80px) scale(0.9)' 
            : 'translateX(-80px) scale(0.9)';
    }
    
    setTimeout(() => {
        currentImageIndex = newIndex;
        
        // Preparar para animación de entrada
        if (modalImage) {
            modalImage.style.transform = direction > 0 
                ? 'translateX(-80px) scale(0.9)' 
                : 'translateX(80px) scale(0.9)';
            modalImage.style.opacity = '0';
        }
        
        updateModalImage();
        
        // Animación de entrada
        setTimeout(() => {
            if (modalImage) {
                modalImage.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                modalImage.style.opacity = '1';
                modalImage.style.transform = 'translateX(0) scale(1)';
            }
            
            isTransitioning = false;
        }, 50);
    }, 300);
}

function updateModalImage() {
    if (!modalImage || !currentGallery[currentImageIndex]) return;
    
    const image = currentGallery[currentImageIndex];
    
    // Pre-cargar la imagen para una transición más suave
    const img = new Image();
    img.onload = () => {
        // Codificar la ruta de la imagen para GitHub Pages
        modalImage.src = encodeImagePath(image.src);
        modalImage.alt = image.title || '';
        
        // Restablecer transformación
        if (modalImage) {
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'translateX(0) scale(1)';
        }
    };
    // Codificar la ruta antes de cargar
    img.src = encodeImagePath(image.src);
    
    if (modalTitle) {
        modalTitle.textContent = image.title || '';
    }
    
    if (modalCategory) {
        modalCategory.textContent = image.category || '';
    }
    
    // Actualizar contador
    const counter = modal.querySelector('.modal-counter');
    if (counter && currentGallery.length > 1) {
        counter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
        counter.style.display = 'block';
    } else if (counter) {
        counter.style.display = 'none';
    }
    
    // Actualizar visibilidad de botones
    const prevBtn = modal.querySelector('.modal-nav-prev');
    const nextBtn = modal.querySelector('.modal-nav-next');
    
    if (prevBtn && nextBtn) {
        if (currentGallery.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
}

function openModal(image, galleryImages = []) {
    if (!modal || !modalImage) return;
    
    // Configurar galería
    if (galleryImages.length > 0) {
        currentGallery = galleryImages;
        currentImageIndex = galleryImages.findIndex(img => img.src === image.src);
        if (currentImageIndex === -1) currentImageIndex = 0;
    } else {
        currentGallery = [image];
        currentImageIndex = 0;
    }
    
    // Crear controles si no existen
    createModalControls();
    
    // Ocultar cursor personalizado cuando el modal esté abierto
    const customCursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (customCursor) customCursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    
    // Mostrar cursor normal del body
    document.body.style.cursor = 'default';
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Actualizar imagen con animación inicial
    modalImage.style.opacity = '0';
    modalImage.style.transform = 'scale(0.9)';
    updateModalImage();
    
    // Animar entrada
    setTimeout(() => {
        if (modalImage) {
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'scale(1)';
        }
    }, 50);
}

function closeModal() {
    if (!modal || isTransitioning) return;
    
    // Animación de salida
    if (modalImage) {
        modalImage.style.opacity = '0';
        modalImage.style.transform = 'scale(0.9)';
    }
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentGallery = [];
        currentImageIndex = 0;
        
        // Mostrar cursor personalizado nuevamente cuando el modal se cierra
        const customCursor = document.querySelector('.custom-cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (customCursor) customCursor.style.display = '';
        if (cursorFollower) cursorFollower.style.display = '';
        document.body.style.cursor = 'none';
    }, 300);
}

if (modalClose) {
    modalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });
    
    // Prevenir cierre al hacer clic en el contenido
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Soporte para gestos táctiles (swipe)
    modal.addEventListener('touchstart', (e) => {
        if (!modal.classList.contains('active')) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    modal.addEventListener('touchend', (e) => {
        if (!modal.classList.contains('active') || isTransitioning) return;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    const horizontalDistance = Math.abs(swipeDistance);
    
    // Solo procesar swipe si el movimiento horizontal es mayor que el vertical
    if (horizontalDistance > swipeThreshold && horizontalDistance > verticalDistance) {
        if (swipeDistance > 0) {
            // Swipe hacia la derecha - imagen anterior
            navigateImage(-1);
        } else {
            // Swipe hacia la izquierda - imagen siguiente
            navigateImage(1);
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

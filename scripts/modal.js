// Modal de imágenes
const modal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalCategory = document.querySelector('.modal-category');
const modalClose = document.querySelector('.modal-close');

function openModal(image) {
    if (!modal || !modalImage || !modalTitle || !modalCategory) {
        return;
    }
    
    modalImage.src = image.src;
    modalTitle.textContent = image.title;
    modalCategory.textContent = image.category;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Efecto de entrada
    modal.style.animation = 'fadeIn 0.3s ease';
}

function closeModal() {
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Exportar para uso en otros módulos
if (typeof window !== 'undefined') {
    window.openModal = openModal;
}


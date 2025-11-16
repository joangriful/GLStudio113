// Funcionalidad de filtrado de galería
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Actualizar botones activos
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filtrar galería
        const filter = btn.dataset.filter;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Efecto de ondas (ripple) en botones
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        ripple.style.background = 'rgba(0, 0, 0, 0.1)';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


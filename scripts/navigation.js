// Animación de números en navegación
function initNavigationAnimations() {
    const navItems = document.querySelectorAll('.nav-item');
    
    if (navItems && navItems.length > 0) {
        navItems.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                const number = item.querySelector('.nav-number');
                if (number) {
                    number.style.transform = 'scale(1.2) rotate(360deg)';
                    number.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const number = item.querySelector('.nav-number');
                if (number) {
                    number.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigationAnimations);
} else {
    initNavigationAnimations();
}


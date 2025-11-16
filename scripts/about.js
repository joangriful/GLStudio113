// Funcionalidad About Me
function initAboutSection() {
    // Manejo de error de imagen de perfil
    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage) {
        // Configurar manejo de error antes de que se intente cargar
        aboutImage.onerror = function() {
            this.src = 'https://via.placeholder.com/600x800/f5f5f5/666666?text=Joan+Griful+Lara';
            this.onerror = null; // Prevenir bucle infinito
        };
    }

    // Animación de entrada para elementos de About
    const aboutElements = document.querySelectorAll('.about-name, .about-role, .about-description p, .specialty-item, .social-link');
    aboutElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // Efecto hover en imagen de perfil
    if (aboutImage) {
        aboutImage.addEventListener('mousemove', (e) => {
            const rect = aboutImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            aboutImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        aboutImage.addEventListener('mouseleave', () => {
            aboutImage.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // Animación de links sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación de especialidades
    const specialtyItems = document.querySelectorAll('.specialty-item');
    specialtyItems.forEach((item) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            const icon = this.querySelector('.specialty-icon');
            if (icon) {
                icon.style.transform = 'rotate(5deg) scale(1.1)';
            }
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('.specialty-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}


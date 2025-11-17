// Funcionalidad About Me - Carrusel
function initAboutSection() {
    // Manejo de error de imágenes de perfil
    const aboutImage1 = document.getElementById('aboutImage1');
    const aboutImage2 = document.getElementById('aboutImage2');
    
    const handleImageError = function(imageElement, placeholderText) {
        if (imageElement) {
            imageElement.onerror = function() {
                this.src = `https://via.placeholder.com/600x800/f5f5f5/666666?text=${encodeURIComponent(placeholderText)}`;
                this.onerror = null; // Prevenir bucle infinito
            };
        }
    };

    handleImageError(aboutImage1, 'Foto+1');
    handleImageError(aboutImage2, 'Foto+2');

    // Carrusel de imágenes
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Iniciar carrusel cada 2 segundos
    if (slides.length > 0) {
        setInterval(nextSlide, 2000);
        showSlide(0); // Mostrar primera imagen
    }

    // Animación de entrada para elementos de About
    const aboutElements = document.querySelectorAll('.about-name, .about-role, .about-description p, .specialty-item, .social-link');
    aboutElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 400 + (index * 80));
    });

    // Animación de links sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animación de especialidades
    const specialtyItems = document.querySelectorAll('.specialty-item');
    specialtyItems.forEach((item) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}


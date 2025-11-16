// Animaciones y efectos visuales

// Animación de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.photo-item, .gallery-item').forEach(item => {
    observer.observe(item);
});

// Efecto parallax en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = Math.max(0.3, 1 - scrolled / 800);
    }
    
    // Animación de formas de fondo
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.3}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Efecto de partículas en hover
document.querySelectorAll('.gallery-item, .photo-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Movimiento más sutil
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) translate(0, 0)';
        }
    });
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto sutil en títulos
const titles = document.querySelectorAll('.section-title-large, .hero-title');
titles.forEach(title => {
    title.addEventListener('mousemove', (e) => {
        const rect = title.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        // Efecto sutil de opacidad en lugar de gradiente
        title.style.opacity = 0.7 + (percentage / 100) * 0.3;
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.opacity = '1';
    });
});

// Animación de entrada para secciones
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const items = entry.target.querySelectorAll('.photo-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = `fadeInUp 0.6s ease forwards`;
                }, index * 100);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.photo-section, .about-section').forEach(section => {
    sectionObserver.observe(section);
});


// Funcionalidad del menú lateral - Igual que en collections.html
const menuToggle = document.getElementById('menuToggle');
const floatingNav = document.getElementById('floatingNav');

if (menuToggle && floatingNav) {
    // Toggle del menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        floatingNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (floatingNav.classList.contains('active') && 
            !floatingNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            floatingNav.classList.remove('active');
        }
    });

    // Prevenir que el clic en el menú lo cierre
    floatingNav.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Navegación
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const section = item.dataset.section;
            
            // Si estamos en index.html, usar scroll suave para secciones internas
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                if (section === 'home') {
                    const targetElement = document.getElementById('home');
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else if (section === 'about') {
                    const targetElement = document.getElementById('about');
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else if (section === 'collections') {
                    window.location.href = 'collections.html';
                    return;
                } else if (section === 'concerts') {
                    window.location.href = 'concerts.html';
                    return;
                } else if (section === 'fashion-events') {
                    window.location.href = 'fashion-events.html';
                    return;
                }
            } else {
                // Para otras páginas, redirigir siempre
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
            }
        });
    });

    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && floatingNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            floatingNav.classList.remove('active');
        }
    });
}


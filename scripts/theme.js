// Gestión del modo oscuro
(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Obtener tema guardado o usar preferencia del sistema
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Si no hay tema guardado, usar preferencia del sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Aplicar tema (sin actualizar label, para uso rápido)
    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }

    // Aplicar tema completo (con localStorage y label)
    function setTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeLabel('Modo Claro');
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeLabel('Modo Oscuro');
        }
    }

    // Actualizar etiqueta del botón
    function updateThemeLabel(text) {
        const label = themeToggle && themeToggle.querySelector('.nav-label');
        if (label) {
            label.textContent = text;
        }
    }

    // Toggle tema
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    // Inicializar tema al cargar (solo aplicación, sin label)
    function initThemeFast() {
        const theme = getInitialTheme();
        applyTheme(theme);
    }

    // Inicializar tema completo (con label)
    function initTheme() {
        const theme = getInitialTheme();
        setTheme(theme);
    }

    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Escuchar cambios en la preferencia del sistema (opcional)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo aplicar si no hay tema guardado manualmente
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();


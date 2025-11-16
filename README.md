# Portfolio Creativo - Joan Griful Lara

Portfolio fotográfico profesional con diseño moderno y responsive.

## 🚀 Despliegue en GitHub Pages

Este proyecto está listo para desplegarse en GitHub Pages. Simplemente:

1. Sube todos los archivos a tu repositorio de GitHub
2. Ve a **Settings → Pages** en tu repositorio
3. Selecciona **Deploy from a branch**
4. Elige la rama `main` (o `master`)
5. Selecciona la carpeta `/ (root)` si moviste los archivos a la raíz, o `/portfolio` si los dejaste en esa carpeta
6. Espera 1-5 minutos y visita `https://tu-usuario.github.io/tu-repo/`

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html              # Página principal
├── collections.html         # Galería de colecciones
├── concerts.html           # Galería de conciertos
├── fashion-events.html     # Galería de eventos de moda
├── css/                    # Estilos modulares
│   ├── variables.css
│   ├── base.css
│   ├── cursor.css
│   ├── menu.css
│   ├── hero.css
│   ├── gallery.css
│   ├── about.css
│   ├── sections-nav.css
│   ├── modal.css
│   ├── footer.css
│   ├── animations.css
│   └── responsive.css
├── scripts/                # JavaScript modular
│   ├── data.js
│   ├── modal.js
│   ├── cursor.js
│   ├── menu.js
│   ├── gallery.js
│   ├── filters.js
│   ├── navigation.js
│   ├── animations.js
│   ├── about.js
│   └── main.js
├── images/                 # Imágenes del portfolio
│   ├── about/
│   ├── collections/
│   ├── concerts/
│   └── fashion-events/
├── styles.css              # Estilos para páginas de galería
├── gallery-styles.css      # Estilos específicos de galería
├── gallery-script.js       # Script para páginas de galería
├── .nojekyll              # Evita procesamiento Jekyll
└── README.md              # Este archivo
```

## ✨ Características

- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Navegación Fluida**: Menú lateral con animaciones suaves
- **Galerías Interactivas**: Mural horizontal con scroll suave
- **Carga Optimizada**: Lazy loading de imágenes
- **Sin Dependencias**: JavaScript vanilla, sin frameworks
- **Modular**: Código organizado en módulos separados

## 🎨 Personalización

### Colores
Edita las variables CSS en `css/variables.css`:
```css
:root {
    --primary-color: #2c2c2c;
    --accent-color: #000000;
    --light-bg: #ffffff;
    /* ... más colores */
}
```

### Imágenes
1. Coloca tus imágenes en las carpetas correspondientes:
   - `images/fashion-events/` - Eventos de moda
   - `images/collections/` - Colecciones
   - `images/concerts/` - Conciertos
   - `images/about/profile.jpg` - Foto de perfil

2. Actualiza `scripts/data.js` con las rutas de tus imágenes

### Contenido
- **Textos**: Edita directamente en los archivos HTML
- **About Me**: Modifica el texto en `index.html`
- **Enlaces sociales**: Actualiza las URLs en `index.html`

## 📱 Compatibilidad

- Chrome/Edge (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Navegadores móviles modernos

## 📝 Notas Importantes

- **GitHub Pages es case-sensitive**: Los nombres de archivo deben coincidir exactamente
- **Rutas relativas**: Todas las rutas son relativas, perfectas para GitHub Pages
- **Lazy Loading**: Las imágenes se cargan de forma diferida para mejor rendimiento
- **Fallback de imágenes**: Si una imagen no se encuentra, se muestra un placeholder automáticamente

## 🔧 Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con animaciones avanzadas
- JavaScript ES6+ (sin dependencias)
- Google Fonts (Space Grotesk, JetBrains Mono)

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

---

**Desarrollado con ❤️ para mostrar trabajos fotográficos profesionales**

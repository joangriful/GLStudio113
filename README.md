# GLStudio 113 - Portfolio Fotográfico Profesional

<div align="center">

**Portfolio creativo moderno desarrollado con React + Vite**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222222?style=flat-square&logo=github)](https://pages.github.com/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Desarrollo](#-desarrollo)
- [Build y Despliegue](#-build-y-despliegue)
- [Personalización](#-personalización)
- [Estructura de Archivos](#-estructura-de-archivos)
- [Scripts Disponibles](#-scripts-disponibles)
- [Notas Importantes](#-notas-importantes)

---

## 🎯 Descripción

Portfolio fotográfico profesional desarrollado con **React** y **Vite**, diseñado para mostrar trabajos de fotografía en diferentes categorías: eventos de moda, colecciones, conciertos y retratos. El proyecto cuenta con un diseño moderno, responsive y optimizado para rendimiento.

**Características principales:**
- ▶ Interfaz moderna y minimalista
- ▶ Navegación fluida con React Router
- ▶ Galerías interactivas con modal de visualización
- ▶ Optimización automática de imágenes (AVIF, WebP, JPG)
- ▶ Diseño completamente responsive
- ▶ Despliegue automático con GitHub Actions

---

## ✨ Características

### 🎨 Diseño y UX
- ▶ Diseño responsive (móvil, tablet, desktop)
- ▶ Animaciones suaves y transiciones fluidas
- ▶ Cursor personalizado interactivo
- ▶ Tema claro/oscuro (preparado para futuras implementaciones)
- ▶ Navegación intuitiva con menú lateral

### 🖼️ Gestión de Imágenes
- ▶ Soporte para múltiples formatos (AVIF, WebP, JPG)
- ▶ Detección automática del mejor formato soportado
- ▶ Lazy loading para optimizar carga
- ▶ Fallback automático entre formatos
- ▶ Modal de visualización a pantalla completa

### ⚡ Rendimiento
- ▶ Build optimizado con Vite
- ▶ Code splitting automático
- ▶ Assets optimizados y minificados
- ▶ Carga diferida de imágenes
- ▶ Sin dependencias innecesarias

### 🚀 Despliegue
- ▶ Configurado para GitHub Pages
- ▶ Despliegue automático con GitHub Actions
- ▶ Base path configurable
- ▶ Rutas relativas para compatibilidad

---

## 🛠️ Tecnologías

### Core
- **[React 18.2.0](https://reactjs.org/)** - Biblioteca de UI
- **[Vite 5.0.8](https://vitejs.dev/)** - Build tool y dev server
- **[React Router DOM 6.20.0](https://reactrouter.com/)** - Enrutamiento

### Estilos
- **CSS3** - Estilos modulares y variables CSS
- **Google Fonts** - Space Grotesk, JetBrains Mono

### Herramientas
- **OGL 1.0.11** - Biblioteca de gráficos WebGL (opcional)

### Desarrollo
- **Node.js 18+** - Runtime
- **npm** - Gestor de paquetes

---

## 📁 Estructura del Proyecto

```
GLStudio113/
│
├── 📂 public/                    # Archivos públicos (se copian tal cual)
│   └── 📂 images/                # Imágenes optimizadas (AVIF, WebP, JPG)
│       ├── about/
│       ├── collections/
│       ├── concerts/
│       └── fashion-events/
│
├── 📂 src/                        # Código fuente React
│   ├── 📂 components/            # Componentes reutilizables
│   │   ├── About.jsx            # Sección sobre el fotógrafo
│   │   ├── Cursor.jsx           # Cursor personalizado
│   │   ├── Gallery.jsx          # Galería principal
│   │   ├── GalleryBox.jsx       # Caja de galería individual
│   │   ├── GalleryItem.jsx      # Item de galería
│   │   ├── Hero.jsx             # Hero section
│   │   ├── Layout.jsx            # Layout principal
│   │   ├── Modal.jsx            # Modal de visualización
│   │   ├── Navigation.jsx       # Navegación
│   │   ├── OptimizedImage.jsx    # Componente de imagen optimizada
│   │   └── Thread.jsx           # Hilo decorativo
│   │
│   ├── 📂 pages/                 # Páginas/Views
│   │   ├── Home.jsx              # Página principal
│   │   ├── Collections.jsx       # Página de colecciones
│   │   ├── Concerts.jsx          # Página de conciertos
│   │   └── FashionEvents.jsx     # Página de eventos de moda
│   │
│   ├── 📂 hooks/                  # Custom Hooks
│   │   ├── useImageFormats.js    # Hook para formatos de imagen
│   │   ├── useModal.js           # Hook para modal
│   │   └── useTheme.js           # Hook para tema
│   │
│   ├── 📂 data/                   # Datos estáticos
│   │   └── images.js             # Datos de imágenes organizados
│   │
│   ├── App.jsx                    # Componente raíz
│   ├── main.jsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
│
├── 📂 scripts/                    # Scripts legacy (HTML estático)
│   ├── about.js
│   ├── animations.js
│   ├── cursor.js
│   ├── data.js
│   ├── filters.js
│   ├── gallery.js
│   ├── image-formats.js
│   ├── main.js
│   ├── menu.js
│   ├── modal.js
│   ├── navigation.js
│   ├── theme-init.js
│   └── theme.js
│
├── 📂 css/                        # Estilos legacy (HTML estático)
│   ├── about.css
│   ├── animations.css
│   ├── base.css
│   ├── cursor.css
│   ├── footer.css
│   ├── gallery.css
│   ├── hero.css
│   ├── menu.css
│   ├── modal.css
│   ├── responsive.css
│   ├── sections-nav.css
│   ├── sections.css
│   └── variables.css
│
├── 📂 images/                     # Imágenes originales (legacy)
│   ├── about/
│   ├── collections/
│   ├── concerts/
│   └── fashion-events/
│
├── 📄 index.html                  # HTML principal (React)
├── 📄 collections.html            # HTML estático (legacy)
├── 📄 concerts.html               # HTML estático (legacy)
├── 📄 fashion-events.html          # HTML estático (legacy)
│
├── ⚙️ vite.config.js              # Configuración de Vite
├── ⚙️ package.json                # Dependencias y scripts
├── 📄 .nojekyll                   # Evita procesamiento Jekyll
├── 📄 .env.production             # Variables de entorno (crear)
└── 📄 README.md                   # Este archivo
```

---

## 🚀 Instalación

### Requisitos Previos
- Node.js 18 o superior
- npm 9 o superior (o yarn/pnpm)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/GLStudio113.git
   cd GLStudio113
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   ```bash
   # Crear archivo .env.production
   echo "VITE_REPO_NAME=GLStudio113" > .env.production
   ```
   > Nota: Si tu repositorio tiene otro nombre, cambia `GLStudio113` por el nombre correcto.

---

## 💻 Uso

### Modo Desarrollo

Inicia el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

### Preview de Producción

Para previsualizar el build de producción localmente:

```bash
npm run build
npm run preview
```

El sitio estará disponible en `http://localhost:4173`

---

## 🔧 Desarrollo

### Estructura de Componentes

Los componentes están organizados de forma modular:

- **Layout**: Componente contenedor principal
- **Navigation**: Menú de navegación lateral
- **Hero**: Sección hero de la página principal
- **Gallery**: Sistema de galería reutilizable
- **Modal**: Modal para visualización de imágenes
- **OptimizedImage**: Componente que maneja formatos de imagen automáticamente

### Agregar Nuevas Imágenes

1. Coloca las imágenes en `public/images/` en la carpeta correspondiente:
   - `public/images/collections/` - Para colecciones
   - `public/images/concerts/` - Para conciertos
   - `public/images/fashion-events/` - Para eventos de moda
   - `public/images/about/` - Para la sección sobre

2. Actualiza `src/data/images.js` con las nuevas rutas:
   ```javascript
   export const imageData = {
     'fashion-events': [
       { src: 'images/fashion-events/nueva-carpeta/imagen.jpg', title: 'Título', category: 'Eventos de Moda' }
     ],
     // ...
   }
   ```

3. Para mejor rendimiento, genera versiones optimizadas:
   - AVIF (formato más moderno)
   - WebP (compatibilidad amplia)
   - JPG (fallback)

### Personalizar Colores

Edita las variables CSS en los archivos de componentes o crea un archivo de tema:

```css
:root {
  --primary-color: #2c2c2c;
  --accent-color: #000000;
  --light-bg: #ffffff;
  --text-color: #333333;
}
```

---

## 🌐 Build y Despliegue

### Build de Producción

```bash
npm run build
```

Esto generará la carpeta `dist/` con todos los archivos optimizados listos para desplegar.

### Despliegue en GitHub Pages

El proyecto está configurado para desplegarse automáticamente con **GitHub Actions**.

#### Configuración Automática (Recomendado)

1. **Crear el workflow** (si no existe):
   - Ve a `.github/workflows/deploy.yml`
   - El archivo ya debería estar configurado

2. **Configurar permisos**:
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

3. **Configurar GitHub Pages**:
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages"
   - Folder: "/ (root)"

4. **Hacer push a main**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

El workflow se ejecutará automáticamente y desplegará el sitio en:
`https://tu-usuario.github.io/GLStudio113/`

> 📖 Para más detalles, consulta `GUIA_GITHUB_ACTIONS.md`

#### Configuración Manual

Si prefieres desplegar manualmente:

1. Build del proyecto:
   ```bash
   npm run build
   ```

2. Subir la carpeta `dist/` a la rama `gh-pages` o configurar GitHub Pages para usar la carpeta `dist/` de la rama `main`.

---

## 🎨 Personalización

### Cambiar el Nombre del Repositorio

Si tu repositorio tiene un nombre diferente:

1. Crea o edita `.env.production`:
   ```env
   VITE_REPO_NAME=tu-nombre-repo
   ```

2. Actualiza `vite.config.js` si es necesario (ya está configurado para usar la variable de entorno).

### Modificar Contenido

- **Textos**: Edita los componentes en `src/components/` y `src/pages/`
- **Imágenes**: Actualiza `src/data/images.js`
- **Estilos**: Modifica los archivos CSS en cada componente
- **Enlaces sociales**: Edita `src/components/About.jsx`

### Agregar Nuevas Secciones

1. Crea un nuevo componente en `src/pages/`
2. Agrega la ruta en `src/App.jsx`
3. Actualiza la navegación en `src/components/Navigation.jsx`
4. Agrega los datos de imágenes en `src/data/images.js`

---

## 📂 Estructura de Archivos Detallada

### Componentes React (`src/components/`)

| Archivo | Descripción |
|---------|-------------|
| `About.jsx` | Sección "Sobre mí" con carrusel de imágenes |
| `Cursor.jsx` | Cursor personalizado interactivo |
| `Gallery.jsx` | Galería principal con filtros |
| `GalleryBox.jsx` | Caja contenedora de galería individual |
| `GalleryItem.jsx` | Item individual de la galería |
| `Hero.jsx` | Sección hero con título y animaciones |
| `Layout.jsx` | Layout principal con estructura |
| `Modal.jsx` | Modal para visualización a pantalla completa |
| `Navigation.jsx` | Menú de navegación lateral |
| `OptimizedImage.jsx` | Componente de imagen con optimización automática |
| `Thread.jsx` | Elemento decorativo de hilo |

### Páginas (`src/pages/`)

| Archivo | Descripción |
|---------|-------------|
| `Home.jsx` | Página principal con galería general |
| `Collections.jsx` | Página dedicada a colecciones |
| `Concerts.jsx` | Página dedicada a conciertos |
| `FashionEvents.jsx` | Página dedicada a eventos de moda |

### Hooks (`src/hooks/`)

| Archivo | Descripción |
|---------|-------------|
| `useImageFormats.js` | Hook para detectar y usar formatos de imagen |
| `useModal.js` | Hook para manejar estado del modal |
| `useTheme.js` | Hook para manejar tema (preparado para futuro) |

### Datos (`src/data/`)

| Archivo | Descripción |
|---------|-------------|
| `images.js` | Datos estructurados de todas las imágenes organizadas por categoría |

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## ⚠️ Notas Importantes

### GitHub Pages

- ▶ **Case-sensitive**: Los nombres de archivo deben coincidir exactamente (Linux)
- ▶ **Rutas relativas**: Todas las rutas son relativas al `base` path configurado
- ▶ **Base path**: Configurado automáticamente según el nombre del repositorio
- ▶ **Tiempo de actualización**: Los cambios pueden tardar 1-5 minutos en aparecer

### Imágenes

- ▶ **Formatos soportados**: AVIF (mejor), WebP (bueno), JPG (fallback)
- ▶ **Lazy loading**: Las imágenes se cargan de forma diferida
- ▶ **Fallback automático**: Si un formato falla, se intenta el siguiente
- ▶ **Optimización**: Genera versiones AVIF y WebP para mejor rendimiento

### Desarrollo

- ▶ **Hot Module Replacement**: Los cambios se reflejan automáticamente
- ▶ **Fast Refresh**: React mantiene el estado durante el desarrollo
- ▶ **Source Maps**: Disponibles en desarrollo (deshabilitados en producción)

### Build

- ▶ **Minificación**: Código y CSS minificados automáticamente
- ▶ **Tree Shaking**: Elimina código no utilizado
- ▶ **Code Splitting**: Carga diferida de rutas
- ▶ **Asset Optimization**: Imágenes y assets optimizados

---

## 📞 Soporte

Para problemas o preguntas:

1. Revisa la documentación en los archivos `.md`
2. Consulta `GUIA_GITHUB_ACTIONS.md` para problemas de despliegue
3. Revisa la consola del navegador (F12) para errores

---

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

---

## 👤 Autor

**Joan Griful Lara** - Fotógrafo Profesional

- Portfolio: [GLStudio 113](https://joangriful.github.io/GLStudio113/)
- Instagram: [@glstudio113](https://www.instagram.com/glstudio113/)

---

<div align="center">

**Desarrollado con React + Vite**

[⬆ Volver arriba](#glstudio-113---portfolio-fotográfico-profesional)

</div>

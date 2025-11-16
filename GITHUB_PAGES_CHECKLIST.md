# ✅ Checklist para GitHub Pages

## ⚠️ Problemas Potenciales Identificados

### 1. **Archivo `script.js` antiguo**
- ✅ **RESUELTO**: Archivo eliminado correctamente

### 2. **Mayúsculas/Minúsculas en nombres de archivos**
- ⚠️ **Problema**: GitHub Pages es case-sensitive (Linux)
- ⚠️ **Archivos con mayúsculas**: `EisMode1.JPG`, `Freyja(1).JPG`, `P1030205.JPG`
- ✅ **Solución**: Verificar que las rutas en el código coincidan exactamente con los nombres de archivo

### 3. **Caracteres especiales en nombres de archivos**
- ⚠️ **Problema**: Archivos con paréntesis: `Freyja(1).JPG`, `troubleMag(1).jpg`
- ✅ **Solución**: El código ya maneja esto, pero verificar que funcionen en GitHub Pages

### 4. **Rutas relativas**
- ✅ **Estado**: Todas las rutas son relativas (correcto para GitHub Pages)
- ✅ **Ejemplo**: `href="collections.html"`, `src="images/..."`, `href="css/..."`

### 5. **Archivos faltantes**
- ⚠️ **Verificar**: 
  - `images/about/profile.jpg` (puede no existir, pero hay fallback)
  - Todos los archivos CSS en `css/`
  - Todos los archivos JS en `scripts/`

### 6. **Configuración de GitHub Pages**
- ✅ **Necesario**: Configurar la carpeta `portfolio/` como raíz del sitio
- ✅ **O**: Mover todos los archivos a la raíz del repositorio

## 📋 Pasos para Desplegar

### Opción 1: Carpeta `portfolio/` como raíz
1. En GitHub: Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` (o `master`)
4. Folder: `/portfolio` (si está en una subcarpeta)
5. **IMPORTANTE**: Si los archivos están en `portfolio/`, necesitarás ajustar las rutas o moverlos

### Opción 2: Mover archivos a la raíz (RECOMENDADO)
1. Mover todos los archivos de `portfolio/` a la raíz del repositorio
2. Configurar GitHub Pages con la raíz como fuente
3. Las rutas relativas funcionarán directamente

## 🔧 Ajustes Necesarios

### Si mantienes la carpeta `portfolio/`:
- Cambiar todas las rutas de `href="..."` a `href="portfolio/..."`
- Cambiar todas las rutas de `src="..."` a `src="portfolio/..."`
- **NO RECOMENDADO** - Mejor mover los archivos

### Si mueves a la raíz:
- ✅ No necesitas cambiar nada, las rutas relativas funcionarán

## ✅ Verificaciones Finales

- [x] Eliminar o renombrar `script.js` antiguo ✅ COMPLETADO
- [ ] Verificar que todas las imágenes existan
- [ ] Probar todas las páginas localmente antes de subir
- [ ] Verificar que `index.html` esté en la raíz (o en `portfolio/` si usas esa opción)
- [ ] Verificar que no haya rutas absolutas (como `/css/...`)
- [ ] Comprobar que los enlaces entre páginas funcionen
- [ ] Verificar que las imágenes se carguen correctamente

## 🚀 Comandos Útiles

```bash
# Verificar estructura de archivos
find portfolio -type f -name "*.html" -o -name "*.css" -o -name "*.js"

# Verificar rutas en archivos HTML
grep -r "href=\|src=" portfolio/*.html

# Verificar que no haya rutas absolutas
grep -r "^/" portfolio/
```

## 📝 Notas Importantes

1. **GitHub Pages es case-sensitive**: `EisMode1.JPG` ≠ `eismode1.jpg`
2. **Las rutas deben ser relativas**: No usar `/css/...` sino `css/...`
3. **El archivo principal debe ser `index.html`**: GitHub Pages lo buscará automáticamente
4. **Los cambios pueden tardar unos minutos**: Espera 1-5 minutos después de hacer push

## 🔗 URL Esperada

Si tu repositorio es `usuario/repo`:
- Con archivos en raíz: `https://usuario.github.io/repo/`
- Con archivos en `portfolio/`: `https://usuario.github.io/repo/portfolio/`


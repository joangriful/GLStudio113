# 🚀 Guía de Despliegue en GitHub Pages

## ⚠️ Problema Resuelto: Error 404

El error 404 que estabas experimentando se debía a que Vite no tenía configurado el `base` path para GitHub Pages. Esto ha sido corregido.

## ✅ Cambios Realizados

1. **Configuración de `base` en Vite**: Se agregó el `base` path en `vite.config.js` para que funcione con GitHub Pages
2. **Configuración de `basename` en React Router**: Se agregó el `basename` en `App.jsx` para que las rutas funcionen correctamente
3. **Archivo `.nojekyll`**: Se copió a `public/` para que se incluya en el build
4. **Archivo `.env.production`**: Se creó para configurar el nombre del repositorio

## 📋 Pasos para Desplegar

### 1. Configurar el Nombre del Repositorio

Si tu repositorio tiene un nombre diferente a `GLStudio113`, edita el archivo `.env.production`:

```env
VITE_REPO_NAME=tu-nombre-repo
```

O crea el archivo si no existe con este contenido.

### 2. Construir el Proyecto

```bash
npm run build
```

Esto creará una carpeta `dist/` con todos los archivos listos para desplegar.

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona:
   - **Branch**: `main` (o la rama que uses)
   - **Folder**: `/dist` (o `/docs` si prefieres)
4. Guarda los cambios

### 4. Subir los Archivos

**Opción A: Usar la carpeta `dist/` directamente**

1. Después de hacer `npm run build`, la carpeta `dist/` contiene todos los archivos
2. Si configuraste GitHub Pages para usar `/dist`, los archivos ya están listos
3. Haz commit y push de los cambios

**Opción B: Usar GitHub Actions (Recomendado)**

Crea un archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_REPO_NAME: ${{ github.event.repository.name }}
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Luego configura GitHub Pages para usar la rama `gh-pages` en lugar de `main`.

### 5. Verificar el Despliegue

Después de unos minutos, tu sitio debería estar disponible en:
- `https://tu-usuario.github.io/GLStudio113/` (o el nombre de tu repositorio)

## 🔧 Solución de Problemas

### La página sigue en blanco

1. Verifica que el nombre del repositorio en `.env.production` coincida exactamente con el nombre de tu repositorio en GitHub
2. Asegúrate de que el archivo `.nojekyll` esté en `public/` (ya está copiado)
3. Revisa la consola del navegador para ver errores específicos

### Los recursos no se cargan (404)

1. Verifica que el `base` en `vite.config.js` coincida con el nombre de tu repositorio
2. Asegúrate de que las imágenes estén en `public/images/` (ya están ahí)
3. Verifica que el build se haya completado correctamente

### Las rutas no funcionan

1. Verifica que el `basename` en `App.jsx` coincida con el `base` en `vite.config.js`
2. Asegúrate de que React Router esté configurado correctamente

## 📝 Notas Importantes

1. **Nombre del Repositorio**: El nombre del repositorio debe coincidir exactamente (case-sensitive) con el valor en `.env.production`
2. **Rutas**: Todas las rutas ahora son relativas al `base` configurado, por lo que funcionarán correctamente en GitHub Pages
3. **Imágenes**: Las imágenes en `public/images/` se copiarán automáticamente durante el build
4. **Tiempo de Actualización**: Los cambios pueden tardar 1-5 minutos en aparecer en GitHub Pages

## ✨ ¡Listo!

Tu proyecto ahora está configurado correctamente para GitHub Pages. Solo necesitas:
1. Configurar el nombre del repositorio en `.env.production` (si es diferente)
2. Hacer `npm run build`
3. Configurar GitHub Pages para usar la carpeta `dist/`
4. ¡Disfrutar de tu sitio en línea!


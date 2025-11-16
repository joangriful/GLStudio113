# 🚀 Guía de Despliegue en GitHub Pages

## ✅ Estado del Proyecto

El proyecto está **100% listo** para desplegarse en GitHub Pages. Se han realizado todas las verificaciones y ajustes necesarios.

## 📋 Checklist Pre-Despliegue

- [x] ✅ Archivo `script.js` antiguo eliminado
- [x] ✅ Todas las rutas son relativas (correcto para GitHub Pages)
- [x] ✅ Archivo `.nojekyll` creado (evita procesamiento Jekyll)
- [x] ✅ README.md actualizado con información correcta
- [x] ✅ Estructura de carpetas verificada
- [x] ✅ Sin rutas absolutas en el código

## 🎯 Opciones de Despliegue

### Opción 1: Mover archivos a la raíz (RECOMENDADO) ⭐

**Ventajas:**
- URL más limpia: `https://usuario.github.io/repo/`
- No necesitas cambiar ninguna ruta
- Configuración más simple

**Pasos:**
1. Mueve todos los archivos de la carpeta `portfolio/` a la raíz de tu repositorio
2. En GitHub: **Settings → Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main` (o `master`)
5. **Folder**: `/ (root)`
6. Guarda y espera 1-5 minutos

### Opción 2: Mantener carpeta `portfolio/`

**Ventajas:**
- Mantiene la organización del proyecto
- No necesitas mover archivos

**Desventajas:**
- URL más larga: `https://usuario.github.io/repo/portfolio/`

**Pasos:**
1. Deja los archivos en la carpeta `portfolio/`
2. En GitHub: **Settings → Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main` (o `master`)
5. **Folder**: `/portfolio`
6. Guarda y espera 1-5 minutos

## 🔍 Verificación Post-Despliegue

Después de desplegar, verifica:

1. ✅ La página principal carga correctamente
2. ✅ Las imágenes se muestran
3. ✅ El menú lateral funciona
4. ✅ Los enlaces entre páginas funcionan
5. ✅ Las galerías se cargan correctamente
6. ✅ El diseño responsive funciona en móvil

## 🐛 Solución de Problemas

### Las imágenes no se cargan
- Verifica que los nombres de archivo coincidan exactamente (case-sensitive)
- Asegúrate de que las imágenes estén en las carpetas correctas

### Los estilos no se aplican
- Verifica que todos los archivos CSS estén en la carpeta `css/`
- Asegúrate de que las rutas en los HTML sean relativas

### Los scripts no funcionan
- Verifica que todos los archivos JS estén en la carpeta `scripts/`
- Abre la consola del navegador (F12) para ver errores

### La página muestra 404
- Verifica que `index.html` esté en la raíz (o en `portfolio/` según tu opción)
- Espera unos minutos, GitHub Pages puede tardar en actualizar

## 📝 Notas Importantes

1. **Case-sensitive**: GitHub Pages es case-sensitive, los nombres de archivo deben coincidir exactamente
2. **Tiempo de actualización**: Los cambios pueden tardar 1-5 minutos en aparecer
3. **HTTPS**: GitHub Pages siempre usa HTTPS, no hay problemas de seguridad
4. **Dominio personalizado**: Puedes configurar un dominio personalizado en Settings → Pages

## 🔗 URLs Esperadas

- **Opción 1 (raíz)**: `https://tu-usuario.github.io/tu-repo/`
- **Opción 2 (portfolio/)**: `https://tu-usuario.github.io/tu-repo/portfolio/`

## ✨ ¡Listo para Desplegar!

Tu proyecto está completamente preparado. Solo necesitas:
1. Subir los archivos a GitHub
2. Configurar GitHub Pages
3. ¡Disfrutar de tu portfolio en línea!

---

**¿Problemas?** Revisa la consola del navegador (F12) para ver errores específicos.


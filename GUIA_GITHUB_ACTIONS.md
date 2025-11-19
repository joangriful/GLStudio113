# 🚀 Guía Paso a Paso: Configurar GitHub Actions para Despliegue Automático

Esta guía te mostrará cómo configurar GitHub Actions para que tu sitio se despliegue automáticamente en GitHub Pages cada vez que hagas un push a la rama `main`.

## 📋 Requisitos Previos

- ✅ Tu proyecto ya está en un repositorio de GitHub
- ✅ Tienes permisos de administrador en el repositorio
- ✅ El proyecto está configurado con Vite y React (ya está hecho)

---

## 🔧 Paso 1: Crear el Archivo de Workflow

### 1.1. En tu repositorio de GitHub, haz clic en la pestaña **"Code"** (si no estás ahí)

### 1.2. Haz clic en el botón **"Add file"** → **"Create new file"**

### 1.3. En el campo de nombre del archivo, escribe exactamente:

```
.github/workflows/deploy.yml
```

**⚠️ Importante**: 
- El punto al inicio (`.github`) es importante
- Debe ser exactamente `workflows` (con 's' al final)
- El archivo debe llamarse `deploy.yml` (o `deploy.yaml`)

### 1.4. Copia y pega este contenido en el editor:

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

**💡 Nota**: Este es el workflow exacto mencionado en `DEPLOY_GITHUB_PAGES.md`. Usa la acción `peaceiris/actions-gh-pages` que es muy popular y confiable.

### 1.5. Desplázate hacia abajo y haz clic en **"Commit new file"**

- Puedes dejar el mensaje por defecto o escribir algo como: "Add GitHub Actions workflow for automatic deployment"
- Asegúrate de que esté seleccionado **"Commit directly to the main branch"**
- Haz clic en el botón verde **"Commit new file"**

---

## ⚙️ Paso 2: Configurar Permisos del Repositorio

### 2.1. Ve a **Settings** (Configuración) de tu repositorio

- Haz clic en la pestaña **"Settings"** en la parte superior del repositorio

### 2.2. En el menú lateral izquierdo, busca y haz clic en **"Actions"** → **"General"**

### 2.3. Desplázate hasta la sección **"Workflow permissions"**

### 2.4. Selecciona la opción:

**"Read and write permissions"**

**💡 Explicación**: Esto permite que GitHub Actions cree y actualice la rama `gh-pages` automáticamente.

### 2.5. (Opcional) Marca la casilla:

**"Allow GitHub Actions to create and approve pull requests"**

### 2.6. Haz clic en **"Save"** (Guardar) al final de la página

---

## 🌐 Paso 3: Configurar GitHub Pages

### 3.1. Ve a la configuración de tu repositorio

1. En la parte superior de tu repositorio, haz clic en la pestaña **"Settings"** (Configuración)
   - Si no ves "Settings", asegúrate de tener permisos de administrador en el repositorio

### 3.2. Encuentra la sección "Pages"

1. En el menú lateral izquierdo (bajo "General"), busca y haz clic en **"Pages"**
   - Está en la sección "Code and automation"
   - Puede estar un poco abajo, desplázate si es necesario

### 3.3. Configura la sección "Source" (Origen)

Una vez en la página de Pages, verás una sección llamada **"Build and deployment"** o **"Source"**. Aquí es donde debes configurar:

**Paso 3.3.1 - Seleccionar el Source:**
- Verás un dropdown o botones que dicen:
  - "Deploy from a branch" ← **Selecciona esta opción**
  - "Deploy from a branch" (puede aparecer como opción principal)
  - Otras opciones como "GitHub Actions" (no uses esta todavía)

**Paso 3.3.2 - Configurar la Branch (Rama):**
- Después de seleccionar "Deploy from a branch", aparecerán más opciones:
  - **Branch**: Haz clic en el dropdown y selecciona **"gh-pages"**
    - ⚠️ Si no ves "gh-pages" todavía, no te preocupes, se creará después del primer despliegue
    - Por ahora, puedes dejar "main" temporalmente o seleccionar "gh-pages" si ya existe
  - **Folder**: Deja **"/ (root)"** seleccionado (es la opción por defecto)

**📝 Estructura visual de lo que verás:**

```
┌─────────────────────────────────────────┐
│  GitHub Pages                           │
├─────────────────────────────────────────┤
│                                         │
│  Build and deployment                   │
│  ┌───────────────────────────────────┐ │
│  │ Source: [Deploy from a branch ▼]   │ │ ← Selecciona esto
│  │                                     │ │
│  │ Branch: [gh-pages ▼]               │ │ ← Selecciona "gh-pages"
│  │ Folder: [/ (root) ▼]              │ │ ← Déjalo así
│  └───────────────────────────────────┘ │
│                                         │
│  [Save] ← Haz clic aquí                │
└─────────────────────────────────────────┘
```

**⚠️ Notas importantes**: 
- La rama `gh-pages` se creará automáticamente después de que el workflow se ejecute por primera vez
- Si no ves "gh-pages" en el dropdown todavía, está bien, aparecerá después del primer despliegue exitoso
- Si no aparece "gh-pages" y quieres continuar, puedes dejar "main" temporalmente y cambiarlo después

### 3.4. Guardar la configuración

1. Desplázate hacia abajo si es necesario
2. Haz clic en el botón **"Save"** (Guardar)
3. Verás un mensaje de confirmación

---

## 🎯 Paso 4: Activar el Despliegue

### 4.1. Ve a la pestaña **"Actions"** en la parte superior de tu repositorio

### 4.2. Deberías ver tu workflow "Deploy to GitHub Pages" en la lista

- Si no aparece, espera unos segundos y recarga la página

### 4.3. Haz clic en el workflow para ver su estado

- Debería estar ejecutándose o haberse completado
- Puedes hacer clic en la ejecución para ver los logs en tiempo real

### 4.4. Espera a que el workflow se complete

- Esto puede tardar 2-5 minutos la primera vez
- Verás un checkmark verde ✅ cuando termine exitosamente

**⚠️ Si ves un error de sintaxis YAML:**

Si el workflow falla con el error "Invalid workflow file" o "You have an error in your yaml syntax", significa que hay un problema en el archivo `deploy.yml`. 

**Solución rápida:**
1. Ve a `.github/workflows/deploy.yml` en tu repositorio
2. Haz clic en el ícono del lápiz (✏️) para editar
3. **Borra TODO el contenido** y pega de nuevo el código YAML de la sección 1.4
4. Asegúrate de que NO haya espacios antes de `name:` en la primera línea
5. Guarda los cambios

Para más detalles, consulta el archivo `SOLUCION_ERROR_YAML.md` que contiene la solución completa.

---

## ✅ Paso 5: Verificar el Despliegue

### 5.1. Espera a que el workflow termine

- Ve a la pestaña **"Actions"** y verifica que el workflow haya terminado exitosamente (checkmark verde ✅)
- Esto puede tardar 2-5 minutos la primera vez

### 5.2. Vuelve a **Settings** → **"Pages"**

### 5.3. Deberías ver un mensaje que dice:

**"Your site is published at https://tu-usuario.github.io/GLStudio113/"**

(Con tu nombre de usuario y repositorio)

### 5.4. Haz clic en el enlace para ver tu sitio

- Si ves una página en blanco, espera 1-2 minutos más y recarga (Ctrl+Shift+R o Cmd+Shift+R)
- Si ves errores, revisa la consola del navegador (F12)
- Verifica que la rama `gh-pages` existe (debería aparecer en la lista de ramas del repositorio)

### 5.5. Verificar que la rama `gh-pages` existe

1. Ve a la pestaña **"Code"** de tu repositorio
2. Haz clic en el dropdown de ramas (donde dice "main" o el nombre de tu rama)
3. Deberías ver la rama **"gh-pages"** en la lista
4. Si no aparece, espera unos minutos y recarga la página

---

## 🔄 Cómo Funciona Ahora

Cada vez que hagas un push a la rama `main`:

1. ✅ GitHub Actions detecta el cambio automáticamente
2. ✅ Ejecuta el workflow de despliegue
3. ✅ Instala las dependencias (`npm ci`)
4. ✅ Construye el proyecto (`npm run build`)
5. ✅ Despliega los archivos en GitHub Pages
6. ✅ Tu sitio se actualiza automáticamente

**Tiempo estimado**: 2-5 minutos después de cada push

---

## 🐛 Solución de Problemas

### El workflow falla con error de permisos

**Solución**: Vuelve al Paso 2 y asegúrate de que los permisos estén configurados correctamente.

### El workflow se ejecuta pero el sitio no se actualiza

**Solución**: 
1. Ve a Settings → Pages
2. Verifica que "Source" esté configurado como "Deploy from a branch" y la rama sea "gh-pages"
3. Espera 2-3 minutos más después de que el workflow termine
4. Verifica que la rama `gh-pages` existe (debería aparecer en la lista de ramas)

### Veo errores en los logs del workflow

**Solución**: 
1. Haz clic en el workflow fallido
2. Revisa los logs para ver el error específico
3. Los errores más comunes son:
   - **"npm ci failed"**: Verifica que `package-lock.json` esté en el repositorio
   - **"Build failed"**: Revisa que no haya errores en tu código
   - **"Permission denied"**: Revisa el Paso 2

### El sitio muestra 404

**Solución**: 
1. Verifica que el nombre del repositorio en `.env.production` coincida exactamente
2. Asegúrate de que el archivo `.nojekyll` esté en `public/`
3. Espera 2-3 minutos después del despliegue

---

## 📝 Notas Importantes

1. **Primera vez**: El primer despliegue puede tardar más (5-10 minutos)
2. **Actualizaciones**: Los despliegues posteriores son más rápidos (2-5 minutos)
3. **Rama principal**: Solo los pushes a `main` activan el despliegue (puedes cambiar esto en el workflow)
4. **Historial**: Puedes ver el historial de todos los despliegues en la pestaña "Actions"

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sitio se desplegará automáticamente cada vez que hagas cambios. Ya no necesitarás hacer `npm run build` manualmente ni subir la carpeta `dist/` a GitHub.

**Ventajas de usar GitHub Actions:**
- ✅ Despliegue automático
- ✅ No necesitas mantener la carpeta `dist/` en tu repositorio
- ✅ Historial de todos los despliegues
- ✅ Notificaciones cuando algo falla
- ✅ Más profesional y confiable

---

## 📚 Recursos Adicionales

- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Documentación de GitHub Pages](https://docs.github.com/en/pages)
- Si tienes problemas, revisa los logs en la pestaña "Actions" de tu repositorio


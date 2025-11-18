# Conversión de Imágenes a Formatos Modernos

Este proyecto ahora soporta formatos modernos de imagen (WebP y AVIF) para mejorar significativamente el rendimiento de carga.

## 🚀 Características

- **Detección automática** de soporte de formatos en el navegador
- **Fallback progresivo**: AVIF → WebP → Original (JPG/PNG)
- **Reducción de tamaño**: Hasta 70-80% menos que JPG/PNG
- **Sin pérdida de funcionalidad**: Si los formatos modernos no están disponibles, usa los originales

## 📦 Instalación

### Requisitos

```bash
pip install Pillow pillow-avif-plugin
```

**Nota**: `pillow-avif-plugin` es opcional pero recomendado para soporte AVIF completo.

## 🔧 Uso del Script de Conversión

### Conversión Básica

```bash
python convert_images.py
```

Esto convertirá todas las imágenes en la carpeta `images/` a WebP y AVIF.

### Opciones Avanzadas

```bash
# Ajustar calidad WebP (0-100, default: 85)
python convert_images.py --quality 90

# Ajustar calidad AVIF (0-100, default: 50)
python convert_images.py --avif-quality 60

# Ambos
python convert_images.py --quality 85 --avif-quality 50

# Especificar directorio diferente
python convert_images.py --directory images/fashion-events

# Eliminar originales después de convertir (NO RECOMENDADO)
python convert_images.py --delete-originals
```

## 📊 Resultados Esperados

- **WebP**: Reducción típica de 25-35% vs JPG
- **AVIF**: Reducción típica de 50-70% vs JPG
- **Calidad visual**: Mantiene excelente calidad visual incluso con reducciones significativas

## 🎯 Cómo Funciona

1. El script busca todas las imágenes JPG/PNG en el directorio especificado
2. Crea versiones WebP y AVIF de cada imagen
3. Los archivos originales se mantienen (a menos que uses `--delete-originals`)
4. El código JavaScript detecta automáticamente qué formatos soporta el navegador
5. Carga el mejor formato disponible: AVIF → WebP → Original

## 🔍 Verificación

Después de convertir, puedes verificar que los archivos se crearon correctamente:

```bash
# Ver archivos WebP creados
find images -name "*.webp" | head -10

# Ver archivos AVIF creados
find images -name "*.avif" | head -10
```

## ⚠️ Notas Importantes

1. **No elimines los originales** a menos que estés seguro de que todos los navegadores soportan WebP/AVIF
2. **GitHub Pages**: Asegúrate de subir tanto los originales como los convertidos
3. **Tamaño del repositorio**: Los archivos convertidos son más pequeños, pero ahora tienes 3 versiones de cada imagen
4. **Calidad**: Ajusta la calidad según tus necesidades (mayor calidad = archivos más grandes)

## 🐛 Solución de Problemas

### Error: "AVIF no disponible"
- Instala `pillow-avif-plugin`: `pip install pillow-avif-plugin`
- Si persiste, el script funcionará solo con WebP

### Las imágenes no se cargan
- Verifica que los archivos convertidos estén en el mismo directorio que los originales
- Asegúrate de que el script `image-formats.js` esté incluido en tus HTML
- Revisa la consola del navegador para errores

### Tamaño de archivo muy grande
- Reduce la calidad: `--quality 75 --avif-quality 45`
- AVIF con calidad 50 suele ser suficiente para la mayoría de casos

## 📈 Mejoras de Rendimiento

Con esta implementación, puedes esperar:

- **Carga inicial más rápida**: 50-70% menos datos a descargar
- **Mejor experiencia en móviles**: Menos consumo de datos
- **Mejor SEO**: Google valora la velocidad de carga
- **Menor uso de ancho de banda**: Especialmente importante para usuarios con conexiones lentas


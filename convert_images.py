#!/usr/bin/env python3
"""
Script para convertir imágenes a formatos modernos (WebP y AVIF)
Optimiza el tamaño de las imágenes para mejorar el rendimiento de carga.

Requisitos:
    pip install Pillow pillow-avif-plugin

Uso:
    python convert_images.py [--quality WEBP_QUALITY] [--avif-quality AVIF_QUALITY] [--delete-originals]
    
Ejemplo:
    python convert_images.py --quality 85 --avif-quality 50
"""

import os
import sys
import argparse
from pathlib import Path
from PIL import Image

# Intentar importar soporte AVIF
try:
    # En versiones nuevas de pillow-avif-plugin, no se necesita register_avif_opener
    # AVIF se detecta automáticamente si Pillow tiene el plugin instalado
    import pillow_avif
    AVIF_SUPPORT = True
except ImportError:
    AVIF_SUPPORT = False
    print("AVIF no disponible. Instala: pip install pillow-avif-plugin")
    print("   Continuando solo con WebP...\n")

def convert_to_webp(input_path, output_path, quality=85):
    """Convierte una imagen a WebP"""
    try:
        with Image.open(input_path) as img:
            # Convertir a RGB si es necesario (WebP no soporta RGBA directamente en algunos casos)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Mantener transparencia
                img.save(output_path, 'WEBP', quality=quality, method=6)
            else:
                img = img.convert('RGB')
                img.save(output_path, 'WEBP', quality=quality, method=6)
        return True
    except Exception as e:
        print(f"[ERROR] Error convirtiendo {input_path} a WebP: {e}")
        return False

def convert_to_avif(input_path, output_path, quality=50):
    """Convierte una imagen a AVIF"""
    if not AVIF_SUPPORT:
        return False
    
    try:
        with Image.open(input_path) as img:
            # AVIF soporta transparencia nativamente
            img.save(output_path, 'AVIF', quality=quality)
        return True
    except Exception as e:
        print(f"[ERROR] Error convirtiendo {input_path} a AVIF: {e}")
        return False

def get_image_files(directory):
    """Obtiene todos los archivos de imagen en un directorio recursivamente"""
    image_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
    image_files = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in image_extensions):
                image_files.append(os.path.join(root, file))
    
    return image_files

def get_file_size_mb(filepath):
    """Obtiene el tamaño del archivo en MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def main():
    parser = argparse.ArgumentParser(
        description='Convierte imágenes a formatos modernos (WebP/AVIF)'
    )
    parser.add_argument(
        '--quality',
        type=int,
        default=85,
        help='Calidad WebP (0-100, default: 85)'
    )
    parser.add_argument(
        '--avif-quality',
        type=int,
        default=50,
        help='Calidad AVIF (0-100, default: 50)'
    )
    parser.add_argument(
        '--delete-originals',
        action='store_true',
        help='Eliminar archivos originales después de convertir (NO RECOMENDADO)'
    )
    parser.add_argument(
        '--directory',
        type=str,
        default='images',
        help='Directorio donde están las imágenes (default: images)'
    )
    
    args = parser.parse_args()
    
    # Validar calidad
    if not (0 <= args.quality <= 100):
        print("[ERROR] La calidad WebP debe estar entre 0 y 100")
        sys.exit(1)
    
    if not (0 <= args.avif_quality <= 100):
        print("[ERROR] La calidad AVIF debe estar entre 0 y 100")
        sys.exit(1)
    
    # Verificar que el directorio existe
    if not os.path.isdir(args.directory):
        print(f"[ERROR] El directorio '{args.directory}' no existe")
        sys.exit(1)
    
    print(f"Buscando imagenes en: {args.directory}")
    image_files = get_image_files(args.directory)
    
    if not image_files:
        print("[ERROR] No se encontraron imagenes")
        sys.exit(1)
    
    print(f"Encontradas {len(image_files)} imagenes\n")
    
    # Estadísticas
    total_original_size = 0
    total_webp_size = 0
    total_avif_size = 0
    converted_webp = 0
    converted_avif = 0
    skipped_webp = 0
    skipped_avif = 0
    
    for i, image_path in enumerate(image_files, 1):
        print(f"[{i}/{len(image_files)}] Procesando: {image_path}")
        
        # Obtener tamaño original
        original_size = get_file_size_mb(image_path)
        total_original_size += original_size
        
        # Generar nombres de salida
        base_name = os.path.splitext(image_path)[0]
        webp_path = f"{base_name}.webp"
        avif_path = f"{base_name}.avif"
        
        # Convertir a WebP
        if os.path.exists(webp_path):
            print(f"  [SKIP] WebP ya existe: {webp_path}")
            skipped_webp += 1
            total_webp_size += get_file_size_mb(webp_path)
        else:
            if convert_to_webp(image_path, webp_path, args.quality):
                webp_size = get_file_size_mb(webp_path)
                total_webp_size += webp_size
                reduction = ((original_size - webp_size) / original_size) * 100
                print(f"  [OK] WebP creado: {webp_path} ({webp_size:.2f} MB, -{reduction:.1f}%)")
                converted_webp += 1
            else:
                skipped_webp += 1
        
        # Convertir a AVIF
        if AVIF_SUPPORT:
            if os.path.exists(avif_path):
                print(f"  [SKIP] AVIF ya existe: {avif_path}")
                skipped_avif += 1
                total_avif_size += get_file_size_mb(avif_path)
            else:
                if convert_to_avif(image_path, avif_path, args.avif_quality):
                    avif_size = get_file_size_mb(avif_path)
                    total_avif_size += avif_size
                    reduction = ((original_size - avif_size) / original_size) * 100
                    print(f"  [OK] AVIF creado: {avif_path} ({avif_size:.2f} MB, -{reduction:.1f}%)")
                    converted_avif += 1
                else:
                    skipped_avif += 1
        else:
            print(f"  [SKIP] AVIF omitido (no disponible)")
        
        print()
    
    # Resumen
    print("=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"Imágenes procesadas: {len(image_files)}")
    print(f"Tamaño total original: {total_original_size:.2f} MB")
    print()
    print(f"WebP:")
    print(f"  - Convertidas: {converted_webp}")
    print(f"  - Omitidas (ya existían): {skipped_webp}")
    print(f"  - Tamaño total: {total_webp_size:.2f} MB")
    if total_original_size > 0:
        webp_reduction = ((total_original_size - total_webp_size) / total_original_size) * 100
        print(f"  - Reducción: {webp_reduction:.1f}%")
    print()
    
    if AVIF_SUPPORT:
        print(f"AVIF:")
        print(f"  - Convertidas: {converted_avif}")
        print(f"  - Omitidas (ya existían): {skipped_avif}")
        print(f"  - Tamaño total: {total_avif_size:.2f} MB")
        if total_original_size > 0:
            avif_reduction = ((total_original_size - total_avif_size) / total_original_size) * 100
            print(f"  - Reducción: {avif_reduction:.1f}%")
    else:
        print("AVIF: No disponible")
    
    print()
    print("[OK] Conversion completada!")
    print()
    print("NOTA: Los archivos originales se mantienen.")
    print("   El codigo JavaScript usara automaticamente WebP/AVIF cuando esten disponibles.")
    print("   Si quieres eliminar los originales, usa --delete-originals (NO RECOMENDADO)")

if __name__ == '__main__':
    main()


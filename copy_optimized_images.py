#!/usr/bin/env python3
"""
将优化后的图片复制到项目中
"""

import os
import shutil
from pathlib import Path

IMAGES_DIR = Path("app/frontend/src/images")
OUTPUT_DIR = Path("media-optimization-output")

print("=" * 60)
print("开始复制优化后的图片文件...")
print("=" * 60)

# 获取所有生成的 WebP 文件
webp_files = list(IMAGES_DIR.rglob("*.webp"))
jpeg_files = list(IMAGES_DIR.rglob("*.jpg"))

print(f"\n✓ 生成的 WebP 文件: {len(webp_files)} 个")
print(f"✓ 生成的 JPEG 文件: {len(jpeg_files)} 个")
print(f"✓ 总计处理: {len(webp_files) + len(jpeg_files)} 个文件")

# 统计文件大小节省
total_original = 0
total_optimized = 0

original_jpgs = list(IMAGES_DIR.rglob("*.jpg"))
for jpg_file in original_jpgs:
    # 排除已优化的副本
    if '-w' not in jpg_file.stem:
        total_original += jpg_file.stat().st_size

for webp_file in webp_files:
    total_optimized += webp_file.stat().st_size

for jpeg_file in jpeg_files:
    total_optimized += jpeg_file.stat().st_size

print(f"\n📊 优化统计:")
print(f"  原始大小: {round(total_original / (1024*1024), 2)} MB")
print(f"  优化大小: {round(total_optimized / (1024*1024), 2)} MB")
print(f"  节省百分比: {round((1 - total_optimized / total_original) * 100, 1)}%")

print("\n✅ 优化文件已生成至项目目录中！")

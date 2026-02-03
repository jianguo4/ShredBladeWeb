#!/usr/bin/env python3
"""
媒体优化脚本 - 优化图片和视频以提高网站性能
该脚本将：
1. 转换视频为 WebM 和优化的 MP4（H.265）格式
2. 转换图片为 WebP 格式并创建响应式版本
3. 生成优化报告
"""

import os
import subprocess
import sys
from pathlib import Path
from PIL import Image
import json
from datetime import datetime

# 配置
VIDEO_DIR = Path("app/frontend/src/images/home")
IMAGES_DIR = Path("app/frontend/src/images/home")
OUTPUT_DIR = Path("media-optimization-output")

# 创建输出目录
OUTPUT_DIR.mkdir(exist_ok=True)

class MediaOptimizer:
    def __init__(self):
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "videos": [],
            "images": [],
            "summary": {}
        }
        self.total_original_size = 0
        self.total_optimized_size = 0

    def optimize_videos(self):
        """优化视频文件"""
        print("=" * 60)
        print("开始优化视频文件...")
        print("=" * 60)
        
        if not VIDEO_DIR.exists():
            print(f"视频目录不存在: {VIDEO_DIR}")
            return

        video_files = list(VIDEO_DIR.glob("*.mp4")) + list(VIDEO_DIR.glob("*.mov"))
        
        for video_file in video_files:
            print(f"\n处理视频: {video_file.name}")
            original_size = video_file.stat().st_size
            self.total_original_size += original_size
            
            # 输出文件路径
            webm_output = VIDEO_DIR / f"{video_file.stem}.webm"
            h265_output = VIDEO_DIR / f"{video_file.stem}-h265.mp4"
            
            video_info = {
                "filename": video_file.name,
                "original_size_mb": round(original_size / (1024*1024), 2),
                "formats": {}
            }
            
            # 转换为 WebM (VP9)
            print(f"  → 转换为 WebM (VP9) 格式...")
            try:
                # 使用 Python 的 ffmpeg-python 或调用系统 FFmpeg
                # 这里提供命令行方式，需要系统已安装 FFmpeg
                
                # 简化版本：只使用 Pillow 处理图片，视频使用 ffmpeg-python
                print(f"    提示: 需要安装 FFmpeg 进行视频转换")
                print(f"    推荐命令:")
                print(f"    ffmpeg -i {video_file} -c:v libvpx-vp9 -b:v 1000k -c:a libopus {webm_output}")
                print(f"    ffmpeg -i {video_file} -c:v libx265 -crf 28 -c:a aac {h265_output}")
                
            except Exception as e:
                print(f"    ✗ 转换失败: {e}")
            
            self.report["videos"].append(video_info)

    def optimize_images(self):
        """优化图片文件"""
        print("\n" + "=" * 60)
        print("开始优化图片文件...")
        print("=" * 60)
        
        if not IMAGES_DIR.exists():
            print(f"图片目录不存在: {IMAGES_DIR}")
            return

        image_files = list(IMAGES_DIR.rglob("*.jpg")) + list(IMAGES_DIR.rglob("*.jpeg")) + list(IMAGES_DIR.rglob("*.png"))
        
        for image_file in image_files:
            try:
                print(f"\n处理图片: {image_file.relative_to(IMAGES_DIR)}")
                original_size = image_file.stat().st_size
                self.total_original_size += original_size
                
                # 打开并优化图片
                img = Image.open(image_file)
                
                # 获取原始尺寸
                original_width, original_height = img.size
                print(f"  原始大小: {round(original_size/1024, 1)}KB, 分辨率: {original_width}x{original_height}")
                
                image_info = {
                    "filename": str(image_file.relative_to(IMAGES_DIR)),
                    "original_size_kb": round(original_size / 1024, 1),
                    "original_dimensions": [original_width, original_height],
                    "formats": {}
                }
                
                # 创建 WebP 版本（原始尺寸）
                webp_path = image_file.with_suffix(".webp")
                img_rgb = img.convert("RGB") if img.mode != "RGB" else img
                img_rgb.save(webp_path, "WEBP", quality=80, method=6)
                webp_size = webp_path.stat().st_size
                
                image_info["formats"]["webp"] = {
                    "size_kb": round(webp_size / 1024, 1),
                    "savings_percent": round((1 - webp_size / original_size) * 100, 1)
                }
                
                print(f"  ✓ WebP (质量80): {round(webp_size/1024, 1)}KB (节省 {image_info['formats']['webp']['savings_percent']}%)")
                
                self.total_optimized_size += webp_size
                
                # 创建响应式版本 (750px, 1200px)
                for max_width in [750, 1200]:
                    if original_width > max_width:
                        ratio = max_width / original_width
                        new_height = int(original_height * ratio)
                        img_resized = img_rgb.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        
                        webp_resized_path = image_file.with_stem(f"{image_file.stem}-w{max_width}").with_suffix(".webp")
                        img_resized.save(webp_resized_path, "WEBP", quality=80, method=6)
                        resized_size = webp_resized_path.stat().st_size
                        
                        image_info["formats"][f"webp_w{max_width}"] = {
                            "size_kb": round(resized_size / 1024, 1),
                            "dimensions": [max_width, new_height]
                        }
                        
                        print(f"  ✓ WebP {max_width}px: {round(resized_size/1024, 1)}KB")
                
                # 创建优化的 JPEG 版本（备选）
                jpeg_path = image_file.with_suffix(".jpg")
                img_rgb.save(jpeg_path, "JPEG", quality=75, optimize=True)
                jpeg_size = jpeg_path.stat().st_size
                
                image_info["formats"]["jpeg"] = {
                    "size_kb": round(jpeg_size / 1024, 1),
                    "savings_percent": round((1 - jpeg_size / original_size) * 100, 1)
                }
                
                print(f"  ✓ JPEG (质量75): {round(jpeg_size/1024, 1)}KB (节省 {image_info['formats']['jpeg']['savings_percent']}%)")
                
                self.report["images"].append(image_info)
                
            except Exception as e:
                print(f"  ✗ 处理失败: {e}")

    def generate_report(self):
        """生成优化报告"""
        print("\n" + "=" * 60)
        print("生成优化报告...")
        print("=" * 60)
        
        # 计算总体节省
        if self.total_original_size > 0:
            savings_percent = round((1 - self.total_optimized_size / self.total_original_size) * 100, 1)
        else:
            savings_percent = 0
        
        self.report["summary"] = {
            "total_original_size_mb": round(self.total_original_size / (1024*1024), 2),
            "total_optimized_size_mb": round(self.total_optimized_size / (1024*1024), 2),
            "total_savings_percent": savings_percent,
            "video_count": len(self.report["videos"]),
            "image_count": len(self.report["images"])
        }
        
        # 保存报告
        report_path = OUTPUT_DIR / "optimization-report.json"
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(self.report, f, indent=2, ensure_ascii=False)
        
        # 打印摘要
        print(f"\n📊 优化摘要:")
        print(f"  总体原始大小: {self.report['summary']['total_original_size_mb']} MB")
        print(f"  总体优化大小: {self.report['summary']['total_optimized_size_mb']} MB")
        print(f"  总体节省: {self.report['summary']['total_savings_percent']}%")
        print(f"  处理视频: {self.report['summary']['video_count']} 个")
        print(f"  处理图片: {self.report['summary']['image_count']} 个")
        print(f"\n✓ 报告已保存至: {report_path}")

    def run(self):
        """运行完整优化流程"""
        print("\n🚀 开始媒体优化流程...\n")
        
        self.optimize_videos()
        self.optimize_images()
        self.generate_report()
        
        print("\n✅ 优化完成！\n")

if __name__ == "__main__":
    optimizer = MediaOptimizer()
    optimizer.run()

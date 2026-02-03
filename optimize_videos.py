#!/usr/bin/env python3
"""
视频转换脚本 - 将 MP4 转换为 WebM 和优化的 MP4 (H.265)
需要安装 FFmpeg

安装 FFmpeg：
  - Windows: choco install ffmpeg (需要 Chocolatey)
           或从 https://ffmpeg.org/download.html 下载
  - macOS: brew install ffmpeg
  - Linux: sudo apt-get install ffmpeg
"""

import os
import subprocess
import sys
from pathlib import Path
import json
from datetime import datetime
import shutil

class VideoOptimizer:
    def __init__(self):
        self.video_dir = Path("app/frontend/public/videos")
        self.output_dir = Path("media-optimization-output")
        self.output_dir.mkdir(exist_ok=True)
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "videos": []
        }

    def check_ffmpeg(self):
        """检查 FFmpeg 是否已安装"""
        try:
            subprocess.run(['ffmpeg', '-version'], 
                         capture_output=True, 
                         text=True, 
                         check=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False

    def get_video_info(self, video_file):
        """获取视频信息"""
        try:
            result = subprocess.run(
                ['ffprobe', '-v', 'error', '-show_entries',
                 'format=duration,size', '-of', 
                 'default=noprint_wrappers=1:nokey=1:noprint_wrappers=1',
                 str(video_file)],
                capture_output=True,
                text=True,
                check=True
            )
            lines = result.stdout.strip().split('\n')
            duration = float(lines[0]) if len(lines) > 0 else 0
            size = float(lines[1]) if len(lines) > 1 else 0
            return duration, size
        except:
            return 0, video_file.stat().st_size

    def convert_to_webm(self, input_file, output_file):
        """转换为 WebM 格式（VP9）"""
        print(f"\n  转换为 WebM (VP9)...")
        print(f"  命令: ffmpeg -i '{input_file}' -c:v libvpx-vp9 -b:v 1000k -c:a libopus '{output_file}'")
        
        try:
            cmd = [
                'ffmpeg', '-i', str(input_file),
                '-c:v', 'libvpx-vp9',
                '-b:v', '1000k',
                '-c:a', 'libopus',
                '-y',  # 覆盖输出文件
                str(output_file)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                output_size = output_file.stat().st_size
                return True, output_size
            else:
                print(f"    ✗ 转换失败: {result.stderr}")
                return False, 0
        except Exception as e:
            print(f"    ✗ 错误: {e}")
            return False, 0

    def convert_to_h265_mp4(self, input_file, output_file):
        """转换为 H.265 MP4 格式"""
        print(f"\n  转换为 MP4 (H.265)...")
        print(f"  命令: ffmpeg -i '{input_file}' -c:v libx265 -crf 28 -c:a aac '{output_file}'")
        
        try:
            cmd = [
                'ffmpeg', '-i', str(input_file),
                '-c:v', 'libx265',
                '-crf', '28',
                '-c:a', 'aac',
                '-y',
                str(output_file)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                output_size = output_file.stat().st_size
                return True, output_size
            else:
                print(f"    ✗ 转换失败: {result.stderr}")
                return False, 0
        except Exception as e:
            print(f"    ✗ 错误: {e}")
            return False, 0

    def optimize_videos(self):
        """优化所有视频文件"""
        print("=" * 70)
        print("🎬 开始视频优化...")
        print("=" * 70)
        
        if not self.video_dir.exists():
            print(f"✗ 视频目录不存在: {self.video_dir}")
            return False

        # 检查 FFmpeg
        if not self.check_ffmpeg():
            print("\n❌ 错误: 未找到 FFmpeg")
            print("\n请安装 FFmpeg:")
            print("  - Windows: https://ffmpeg.org/download.html")
            print("  - macOS: brew install ffmpeg")
            print("  - Linux: sudo apt-get install ffmpeg")
            return False

        video_files = list(self.video_dir.glob("*.mp4"))
        
        if not video_files:
            print(f"未找到视频文件")
            return True

        for video_file in video_files:
            print(f"\n📹 处理: {video_file.name}")
            
            original_size = video_file.stat().st_size
            video_info = {
                "filename": video_file.name,
                "original_size_mb": round(original_size / (1024*1024), 2),
                "formats": {}
            }

            # 转换为 WebM
            webm_file = video_file.with_suffix(".webm")
            success, size = self.convert_to_webm(video_file, webm_file)
            if success:
                video_info["formats"]["webm"] = {
                    "size_mb": round(size / (1024*1024), 2),
                    "savings_percent": round((1 - size / original_size) * 100, 1)
                }
                print(f"  ✓ WebM: {round(size/1024/1024, 2)}MB (节省 {video_info['formats']['webm']['savings_percent']}%)")
            else:
                webm_file.unlink(missing_ok=True)

            # 转换为 H.265 MP4
            h265_file = video_file.with_stem(f"{video_file.stem}-h265")
            success, size = self.convert_to_h265_mp4(video_file, h265_file)
            if success:
                video_info["formats"]["h265"] = {
                    "size_mb": round(size / (1024*1024), 2),
                    "savings_percent": round((1 - size / original_size) * 100, 1)
                }
                print(f"  ✓ MP4 (H.265): {round(size/1024/1024, 2)}MB (节省 {video_info['formats']['h265']['savings_percent']}%)")
            else:
                h265_file.unlink(missing_ok=True)

            self.report["videos"].append(video_info)

        return True

    def generate_report(self):
        """生成报告"""
        report_path = self.output_dir / "video-optimization-report.json"
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(self.report, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ 报告已保存至: {report_path}")
        
        # 显示总结
        if self.report["videos"]:
            print("\n📊 优化摘要:")
            total_original = sum(v["original_size_mb"] for v in self.report["videos"])
            print(f"  处理视频: {len(self.report['videos'])} 个")
            print(f"  总体原始大小: {total_original} MB")

    def run(self):
        """运行优化流程"""
        if self.optimize_videos():
            self.generate_report()
            print("\n✅ 完成！")
            return True
        else:
            print("\n❌ 优化过程中出现错误")
            return False

if __name__ == "__main__":
    optimizer = VideoOptimizer()
    success = optimizer.run()
    sys.exit(0 if success else 1)

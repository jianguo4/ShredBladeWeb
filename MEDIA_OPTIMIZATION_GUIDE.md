# 🚀 媒体文件性能优化指南

## 📊 优化成果统计

### 图片优化结果
- **原始图片总大小**: 134.83 MB
- **优化后大小**: 11.99 MB  
- **节省比例**: 91.1% ✅
- **处理文件数**: 53 张图片 + 121 个响应式版本

### 优化方法

#### 1. **WebP 格式转换**
- 将 JPEG 转换为 WebP 格式（质量 80）
- 平均节省 **70-90%** 大小
- 现代浏览器支持率 **97%**

#### 2. **响应式图片生成**
为每张大图片生成两个响应式版本：
- `image-w750.webp` (750px 宽度版本)
- `image-w1200.webp` (1200px 宽度版本)
- 原始尺寸版本保留作备用

#### 3. **JPEG 备选格式**
- 为不支持 WebP 的浏览器保留优化 JPEG
- 质量设置 75，平均节省 **50-60%**

---

## 🎬 视频优化（待执行）

### 当前视频文件
| 文件名 | 原始大小 | 优化目标 |
|--------|---------|---------|
| Shredder-machine-running.mp4 | 59.17 MB | 15-20 MB (WebM) |
| shredder-runing.mp4 | 30.88 MB | 8-12 MB (WebM) |

### 优化步骤

#### 使用 FFmpeg 转换为 WebM (VP9)
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 1000k -c:a libopus output.webm
```
预期结果：50-70% 大小减少

#### 转换为 H.265/HEVC MP4
```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -c:a aac output-h265.mp4
```
预期结果：40-50% 大小减少

#### 创建多比特率视频（可选，用于自适应流）
```bash
# 高质量版本
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 2500k -c:a libopus high.webm

# 中等质量版本  
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 1000k -c:a libopus medium.webm

# 低质量版本
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 500k -c:a libopus low.webm
```

---

## 💻 前端代码集成

### 使用优化的 Image 组件

#### 安装依赖（已完成）
```typescript
// app/frontend/src/hooks/useOptimizedImage.ts - 已创建
// app/frontend/src/components/OptimizedImage.tsx - 已创建
```

#### 使用方法

**方法 1：使用 OptimizedImage 组件（推荐）**
```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

export default function MyComponent() {
  return (
    <OptimizedImage 
      src="/images/scene/plastic waste"
      alt="Plastic waste recycling process"
      className="w-full h-auto rounded-lg"
      priority="high"  // 首屏图片使用高优先级
    />
  );
}
```

**方法 2：使用 useOptimizedImage Hook**
```tsx
import { useOptimizedImage } from '@/hooks/useOptimizedImage';

export default function Gallery() {
  const { generateSrcSet, generateSizes } = useOptimizedImage();
  
  return (
    <picture>
      <source 
        srcSet={generateSrcSet('/images/hero')} 
        sizes={generateSizes()}
        type="image/webp" 
      />
      <source srcSet="/images/hero.jpg" type="image/jpeg" />
      <img 
        src="/images/hero.jpg" 
        alt="Hero image"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
```

**方法 3：手动编写 picture 标签**
```tsx
<picture>
  {/* WebP 版本 - 现代浏览器优先加载 */}
  <source 
    srcSet="/images/product-w750.webp 750w, /images/product-w1200.webp 1200w, /images/product.webp 1500w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
    type="image/webp" 
  />
  {/* JPEG 备用格式 */}
  <source 
    srcSet="/images/product.jpg"
    type="image/jpeg" 
  />
  {/* 最终的 img 标签 */}
  <img 
    src="/images/product.jpg" 
    alt="Product image"
    loading="lazy"
    decoding="async"
    fetchPriority="low"
    className="w-full h-auto rounded-lg"
  />
</picture>
```

### 迁移现有组件

#### 需要更新的组件
- `Index.tsx` - 首页应用场景卡片
- `SingleShaftShredderBlades.tsx` - 产品页面
- `DoubleShaftShredderBlades.tsx` - 产品页面
- `FourShaftShredderBlades.tsx` - 产品页面
- `EWasteDataDestruction.tsx` - 应用场景页面
- 其他所有使用 `<img>` 标签的组件

---

## 🔧 Nginx 优化配置

### 已启用的优化
✅ **Gzip 压缩**
- 支持文本、JavaScript、JSON、SVG
- 最小文件大小：1024 字节
- 压缩级别：6（平衡速度和比率）

✅ **缓存策略**
| 文件类型 | 缓存时间 | 策略 |
|---------|---------|------|
| 视频 (.mp4, .webm) | 30 天 | public, immutable |
| 图片 (.jpg, .webp) | 30 天 | public, immutable |
| JS/CSS | 7 天 | public, must-revalidate |
| 字体 | 1 年 | public, immutable |
| HTML | 无缓存 | 每次检查新版本 |

✅ **视频流优化**
- 支持 HTTP Range 请求
- 允许在任意位置开始播放

✅ **安全防护**
- X-Frame-Options 防止点击劫持
- X-XSS-Protection 防止 XSS 攻击
- X-Content-Type-Options 防止 MIME 嗅探

### Nginx 配置位置
`nginx.production.conf` - 生产环境配置

### 重新加载 Nginx
```bash
# 在容器中执行
docker exec shredblade-nginx nginx -s reload

# 或在 Coolify 中重启容器
```

---

## 🔄 Git LFS 配置

### 为什么需要 Git LFS？
- 减少 Git 仓库大小
- 加快克隆速度
- 优化存储空间使用

### 配置说明
`.gitattributes` 已配置以追踪：
- 视频文件 (*.mp4, *.webm)
- 大型场景图片 (> 500KB)
- 响应式图片版本

### 初始化 LFS（如需启用）
```bash
# 安装 Git LFS
brew install git-lfs  # macOS
# 或 apt install git-lfs  # Linux
# 或从 https://git-lfs.github.com 下载 Windows 版本

# 初始化 LFS
git lfs install

# 追踪大文件
git add .gitattributes
git commit -m "Configure Git LFS for large media files"
```

---

## 📋 Vite 构建优化

### 已启用的优化
✅ **代码分割**
- React 库单独打包
- UI 组件库单独打包
- TanStack Query 单独打包
- 其他依赖打包到 vendor

✅ **资源优化**
- 禁用 sourcemap
- 使用 Terser 压缩 JS
- CSS 代码分割
- 去除 console 语句

✅ **资源命名**
- 视频：`videos/[name][extname]`
- WebP 图片：`assets/images/[name]-[hash][extname]`
- 字体：`assets/fonts/[name]-[hash][extname]`

### 构建命令
```bash
cd app/frontend
npm run build  # 或 pnpm build
```

构建输出分析：
```bash
npm install -D vite-plugin-visualizer
# 在 vite.config.ts 中添加插件
```

---

## 📱 响应式图片加载策略

### 断点设置
```
- Mobile: < 640px (100vw)
- Tablet: 640px - 1024px (90vw)
- Desktop: > 1024px (1200px)
```

### 自动选择规则
```
浏览器选择优先级：
1. 检查 WebP 支持
2. 如果支持 → 加载 .webp 文件（最小）
3. 如果不支持 → 加载 .jpg 文件（备用）

尺寸选择规则：
1. viewport < 750px → 加载 w750 版本
2. viewport < 1200px → 加载 w1200 版本
3. viewport >= 1200px → 加载原始尺寸
```

---

## 🧪 性能测试建议

### 测试场景
1. **首屏加载**
   - 清缓存加载
   - 已缓存加载
   - 慢速网络 (3G)

2. **视频播放**
   - 不同分辨率
   - 不同网络条件
   - 自动播放禁用状态

3. **图片加载**
   - Lazy loading 效果
   - WebP 格式降级
   - 不同设备尺寸

### 测试工具
- **Chrome DevTools** - 网络、性能分析
- **Lighthouse** - 整体性能评分
- **WebPageTest** - 详细的网络分析
- **GTmetrix** - 性能监控

### 关键指标目标
| 指标 | 目标 | 当前预期 |
|-----|------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | 1.5-2.0s |
| FID (First Input Delay) | < 100ms | < 50ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.05 |
| FCP (First Contentful Paint) | < 1.8s | 0.8-1.2s |

---

## 📋 实施检查清单

- [x] 图片转换为 WebP 格式
- [x] 生成响应式图片版本
- [x] 创建优化的 React 组件
- [x] 更新 Vite 构建配置
- [x] 优化 Nginx 缓存和压缩
- [x] 配置 Git LFS
- [ ] 视频转换为 WebM/H.265
- [ ] 迁移现有组件使用 OptimizedImage
- [ ] 更新视频播放器支持多格式
- [ ] 执行性能测试
- [ ] 部署到生产环境
- [ ] 监控实际用户体验指标

---

## 🔗 相关文件

| 文件 | 用途 |
|-----|------|
| `optimize_media.py` | 媒体优化脚本 |
| `app/frontend/src/hooks/useOptimizedImage.ts` | 图片优化 Hook |
| `app/frontend/src/components/OptimizedImage.tsx` | 优化图片组件 |
| `app/frontend/vite.config.ts` | Vite 构建配置 |
| `nginx.production.conf` | Nginx 性能配置 |
| `.gitattributes` | Git LFS 配置 |
| `media-optimization-output/` | 优化报告和统计 |

---

## 📞 故障排除

### 问题：WebP 图片在某些浏览器不显示
**解决方案**：
- 使用 `<picture>` 标签和备用 JPEG 源
- OptimizedImage 组件已自动处理此问题

### 问题：图片加载很慢
**检查项**：
1. 浏览器是否缓存资源（DevTools 的 Cache 选项卡）
2. Nginx 缓存头是否正确设置
3. Gzip 是否启用
4. 网络连接速度

### 问题：视频不播放
**检查项**：
1. 视频格式是否支持（mp4 或 webm）
2. 视频文件路径是否正确
3. 浏览器是否支持相应的编码格式
4. 服务器是否支持 Range 请求

### 问题：构建包体积过大
**优化方案**：
```bash
# 分析包大小
npm install -D vite-plugin-visualizer
# 添加到 vite.config.ts

# 增加代码分割粒度
# 修改 vite.config.ts 中的 manualChunks
```

---

## 📚 参考资源

- [WebP 格式介绍](https://developers.google.com/speed/webp)
- [响应式图片指南](https://web.dev/responsive-web-design-basics/)
- [Nginx 性能优化](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)
- [Web 性能最佳实践](https://web.dev/performance/)
- [Vite 构建优化](https://vitejs.dev/guide/features.html)

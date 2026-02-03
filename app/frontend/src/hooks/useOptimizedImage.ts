/**
 * Hook for loading optimized images with WebP fallback support
 * Automatically selects the best format based on browser support and device size
 */

export function useOptimizedImage(baseImagePath: string) {
  /**
   * 生成优化图片的 URL 列表
   * @param basePath 图片的基础路径（不含扩展名）
   * @returns 包含 WebP 和 JPEG 两种格式的对象
   */
  const getImageUrls = (basePath: string) => {
    return {
      webp: `${basePath}.webp`,
      webp_w750: `${basePath}-w750.webp`,
      webp_w1200: `${basePath}-w1200.webp`,
      jpeg: `${basePath}.jpg`,
    };
  };

  /**
   * 生成 srcset 字符串用于响应式图片
   */
  const generateSrcSet = (
    basePath: string,
    format: 'webp' | 'jpeg' = 'webp'
  ): string => {
    const urls = getImageUrls(basePath);
    
    if (format === 'webp') {
      return `${urls.webp_w750} 750w, ${urls.webp_w1200} 1200w, ${urls.webp} 1500w`;
    } else {
      return `${urls.jpeg} 1x`;
    }
  };

  /**
   * 生成 sizes 属性用于响应式图片
   */
  const generateSizes = (): string => {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px';
  };

  /**
   * 生成 picture 元素的源代码（用于复制粘贴）
   */
  const generatePictureHTML = (
    imagePath: string,
    altText: string,
    className: string = ''
  ): string => {
    const urls = getImageUrls(imagePath);
    const srcset = generateSrcSet(imagePath, 'webp');
    const sizes = generateSizes();
    
    return `
<picture>
  <source srcset="${srcset}" sizes="${sizes}" type="image/webp" />
  <source srcset="${urls.jpeg}" type="image/jpeg" />
  <img 
    src="${urls.jpeg}" 
    alt="${altText}"
    loading="lazy"
    decoding="async"
    fetchPriority="low"
    ${className ? `class="${className}"` : ''}
  />
</picture>`;
  };

  return {
    getImageUrls,
    generateSrcSet,
    generateSizes,
    generatePictureHTML,
  };
}

/**
 * 浏览器 WebP 支持检测工具
 */
export function supportsWebP(): boolean {
  const canvas = typeof document !== 'undefined' 
    ? document.createElement('canvas') 
    : null;
  
  if (!canvas) return false;
  
  canvas.width = 1;
  canvas.height = 1;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, 1, 1);
  
  return canvas.toDataURL('image/webp').includes('webp');
}

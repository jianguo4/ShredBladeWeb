import React, { ImgHTMLAttributes } from 'react';
import { useOptimizedImage, supportsWebP } from '@/hooks/useOptimizedImage';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** 图片路径（不含扩展名）*/
  src: string;
  /** 替代文本 */
  alt: string;
  /** 是否显示加载占位符 */
  showPlaceholder?: boolean;
  /** 优先级：高优先级的图片会首先加载 */
  priority?: 'high' | 'low' | 'auto';
}

/**
 * 优化的图片组件
 * 自动支持 WebP 和 JPEG 多格式，实现响应式加载
 * 
 * 使用示例：
 * <OptimizedImage 
 *   src="/images/scene/plastic waste"
 *   alt="Plastic waste recycling"
 *   className="w-full h-auto rounded-lg"
 * />
 */
export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, showPlaceholder = true, priority = 'auto', className = '', ...props }, ref) => {
    const { getImageUrls, generateSrcSet, generateSizes } = useOptimizedImage(src);
    const urls = getImageUrls(src);
    const supportsWP = supportsWebP();

    const loading = priority === 'high' ? 'eager' : 'lazy';
    const fetchPriority = priority === 'high' ? 'high' : 'low';
    const decoding = priority === 'high' ? 'sync' : 'async';

    return (
      <>
        {/* 使用 picture 元素实现多格式支持和响应式加载 */}
        <picture>
          {/* WebP 格式 - 现代浏览器优先加载 */}
          {supportsWP && (
            <source
              srcSet={generateSrcSet(src, 'webp')}
              sizes={generateSizes()}
              type="image/webp"
            />
          )}
          {/* JPEG 备用格式 */}
          <source
            srcSet={urls.jpeg}
            type="image/jpeg"
          />
          {/* 最终的 img 标签 */}
          <img
            ref={ref}
            src={urls.jpeg}
            alt={alt}
            loading={loading as 'lazy' | 'eager'}
            decoding={decoding as 'sync' | 'async' | 'auto'}
            fetchPriority={fetchPriority as 'high' | 'low' | 'auto'}
            className={`${showPlaceholder ? 'bg-gray-200 animate-pulse' : ''} ${className}`}
            onLoad={(e) => {
              if (showPlaceholder) {
                e.currentTarget.classList.remove('animate-pulse', 'bg-gray-200');
              }
              props.onLoad?.(e);
            }}
            {...props}
          />
        </picture>
      </>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

/**
 * 导出以支持 lazy loading 的背景图片
 * 使用示例：
 * <div style={useBackgroundImage('/images/hero')}>Content</div>
 */
export function useBackgroundImage(imagePath: string): React.CSSProperties {
  const urls = useOptimizedImage(imagePath).getImageUrls(imagePath);
  
  return {
    backgroundImage: `url('${urls.webp}'), url('${urls.jpeg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
}

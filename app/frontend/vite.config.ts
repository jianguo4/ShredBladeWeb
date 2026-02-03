import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    viteSourceLocator({
      prefix: 'mgx',
    }),
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    port: 5174,
    host: true,
    watch: { usePolling: true, interval: 800 /* 300~1500 */ },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // 确保视频等资源被正确复制
    assetsInlineLimit: 0, // 不内联视频文件
    chunkSizeWarningLimit: 1000, // 提高警告阈值到 1000 kB
    sourcemap: false, // 生产环境禁用 sourcemap
    reportCompressedSize: true, // 报告压缩后的大小
    rollupOptions: {
      output: {
        // 资源文件命名
        assetFileNames: (assetInfo) => {
          // 保持视频文件的目录结构
          if (assetInfo.name.endsWith('.mp4') || assetInfo.name.endsWith('.webm')) {
            return 'videos/[name][extname]';
          }
          // WebP 图片保持到 assets 目录但标记为 webp
          if (assetInfo.name.endsWith('.webp')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // 字体文件单独放置
          if (assetInfo.name.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // 优化代码分割策略
        manualChunks: (id) => {
          // 将 node_modules 中的依赖分离到 vendor chunk
          if (id.includes('node_modules')) {
            // 将大型库单独分离
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('@tanstack')) {
              return 'query-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    // 启用压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console
        drop_debugger: true,
      },
    },
    // CSS 代码分割
    cssCodeSplit: true,
    // 预加载关键资源
    dynamicImportVarsOptions: {
      warnOnError: true,
      exclude: [],
    },
  },
}));

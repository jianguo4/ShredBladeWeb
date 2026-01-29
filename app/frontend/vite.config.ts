import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
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
    rollupOptions: {
      output: {
        // 资源文件命名
        assetFileNames: (assetInfo) => {
          // 保持视频文件的目录结构
          if (assetInfo.name.endsWith('.mp4') || assetInfo.name.endsWith('.webm')) {
            return 'videos/[name][extname]';
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
  },
}));

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    viteSourceLocator({
      prefix: 'mgx',
    }),
    react(),
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
        // 关闭手动分块，避免多包加载顺序或缓存导致的运行时缺失
        manualChunks: undefined,
      },
    },
  },
}));

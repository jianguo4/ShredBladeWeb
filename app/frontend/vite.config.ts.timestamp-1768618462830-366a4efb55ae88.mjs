// vite.config.ts
import { defineConfig } from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/.pnpm/vite@5.4.21_@types+node@22.19.3/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.21/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { viteSourceLocator } from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/.pnpm/@metagptx+vite-plugin-source-locator@0.0.11_rollup@2.79.2_vite@5.4.21/node_modules/@metagptx/vite-plugin-source-locator/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Business\\Web\\ShredBladeWeb\\app\\frontend";
var vite_config_default = defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    viteSourceLocator({
      prefix: "mgx"
    }),
    react()
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 800
      /* 300~1500 */
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // 确保视频等资源被正确复制
    assetsInlineLimit: 0,
    // 不内联视频文件
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".mp4") || assetInfo.name.endsWith(".webm")) {
            return "videos/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxCdXNpbmVzc1xcXFxXZWJcXFxcU2hyZWRCbGFkZVdlYlxcXFxhcHBcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEJ1c2luZXNzXFxcXFdlYlxcXFxTaHJlZEJsYWRlV2ViXFxcXGFwcFxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQnVzaW5lc3MvV2ViL1NocmVkQmxhZGVXZWIvYXBwL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgdml0ZVNvdXJjZUxvY2F0b3IgfSBmcm9tICdAbWV0YWdwdHgvdml0ZS1wbHVnaW4tc291cmNlLWxvY2F0b3InO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgYmFzZTogJy4vJyxcbiAgcGx1Z2luczogW1xuICAgIHZpdGVTb3VyY2VMb2NhdG9yKHtcbiAgICAgIHByZWZpeDogJ21neCcsXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHsgdXNlUG9sbGluZzogdHJ1ZSwgaW50ZXJ2YWw6IDgwMCAvKiAzMDB+MTUwMCAqLyB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBcdTc4NkVcdTRGRERcdTg5QzZcdTk4OTFcdTdCNDlcdThENDRcdTZFOTBcdTg4QUJcdTZCNjNcdTc4NkVcdTU5MERcdTUyMzZcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMCwgLy8gXHU0RTBEXHU1MTg1XHU4MDU0XHU4OUM2XHU5ODkxXHU2NTg3XHU0RUY2XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgLy8gXHU0RkREXHU2MzAxXHU4OUM2XHU5ODkxXHU2NTg3XHU0RUY2XHU3Njg0XHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0XG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcubXA0JykgfHwgYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy53ZWJtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAndmlkZW9zL1tuYW1lXVtleHRuYW1lXSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLG9CQUFvQjtBQUN6VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMseUJBQXlCO0FBSGxDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsTUFDaEIsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUFFLFlBQVk7QUFBQSxNQUFNLFVBQVU7QUFBQTtBQUFBLElBQW1CO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsbUJBQW1CO0FBQUE7QUFBQSxJQUNuQixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0IsQ0FBQyxjQUFjO0FBRTdCLGNBQUksVUFBVSxLQUFLLFNBQVMsTUFBTSxLQUFLLFVBQVUsS0FBSyxTQUFTLE9BQU8sR0FBRztBQUN2RSxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=

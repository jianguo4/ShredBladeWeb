// vite.config.ts
import { defineConfig } from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { viteSourceLocator } from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/@metagptx/vite-plugin-source-locator/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/Business/Web/ShredBladeWeb/app/frontend/node_modules/vite-plugin-html/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Business\\Web\\ShredBladeWeb\\app\\frontend";
var vite_config_default = defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    viteSourceLocator({
      prefix: "mgx"
    }),
    react(),
    createHtmlPlugin({
      minify: true
    })
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
    chunkSizeWarningLimit: 1e3,
    // 提高警告阈值到 1000 kB
    rollupOptions: {
      output: {
        // 资源文件命名
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".mp4") || assetInfo.name.endsWith(".webm")) {
            return "videos/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        // 优化代码分割策略
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            if (id.includes("@tanstack")) {
              return "query-vendor";
            }
            return "vendor";
          }
        }
      }
    },
    // 启用压缩
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        // 生产环境移除 console
        drop_debugger: true
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxCdXNpbmVzc1xcXFxXZWJcXFxcU2hyZWRCbGFkZVdlYlxcXFxhcHBcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEJ1c2luZXNzXFxcXFdlYlxcXFxTaHJlZEJsYWRlV2ViXFxcXGFwcFxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQnVzaW5lc3MvV2ViL1NocmVkQmxhZGVXZWIvYXBwL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgdml0ZVNvdXJjZUxvY2F0b3IgfSBmcm9tICdAbWV0YWdwdHgvdml0ZS1wbHVnaW4tc291cmNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIGJhc2U6ICcuLycsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdml0ZVNvdXJjZUxvY2F0b3Ioe1xyXG4gICAgICBwcmVmaXg6ICdtZ3gnLFxyXG4gICAgfSksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgIG1pbmlmeTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICB3YXRjaDogeyB1c2VQb2xsaW5nOiB0cnVlLCBpbnRlcnZhbDogODAwIC8qIDMwMH4xNTAwICovIH0sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICAvLyBcdTc4NkVcdTRGRERcdTg5QzZcdTk4OTFcdTdCNDlcdThENDRcdTZFOTBcdTg4QUJcdTZCNjNcdTc4NkVcdTU5MERcdTUyMzZcclxuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLCAvLyBcdTRFMERcdTUxODVcdTgwNTRcdTg5QzZcdTk4OTFcdTY1ODdcdTRFRjZcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy8gXHU2M0QwXHU5QUQ4XHU4QjY2XHU1NDRBXHU5NjA4XHU1MDNDXHU1MjMwIDEwMDAga0JcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgLy8gXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU1NDdEXHU1NDBEXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgIC8vIFx1NEZERFx1NjMwMVx1ODlDNlx1OTg5MVx1NjU4N1x1NEVGNlx1NzY4NFx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcubXA0JykgfHwgYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy53ZWJtJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd2aWRlb3MvW25hbWVdW2V4dG5hbWVdJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gXHU0RjE4XHU1MzE2XHU0RUUzXHU3ODAxXHU1MjA2XHU1MjcyXHU3QjU2XHU3NTY1XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIC8vIFx1NUMwNiBub2RlX21vZHVsZXMgXHU0RTJEXHU3Njg0XHU0RjlEXHU4RDU2XHU1MjA2XHU3OUJCXHU1MjMwIHZlbmRvciBjaHVua1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAvLyBcdTVDMDZcdTU5MjdcdTU3OEJcdTVFOTNcdTUzNTVcdTcyRUNcdTUyMDZcdTc5QkJcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdCcpIHx8IGlkLmluY2x1ZGVzKCdyZWFjdC1kb20nKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAncmVhY3QtdmVuZG9yJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2x1Y2lkZS1yZWFjdCcpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdpY29ucy12ZW5kb3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHRhbnN0YWNrJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ3F1ZXJ5LXZlbmRvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU1NDJGXHU3NTI4XHU1MzhCXHU3RjI5XHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSwgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU3OUZCXHU5NjY0IGNvbnNvbGVcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBUyxvQkFBb0I7QUFDelYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLHdCQUF3QjtBQUpqQyxJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLGtCQUFrQjtBQUFBLE1BQ2hCLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLGlCQUFpQjtBQUFBLE1BQ2YsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUFFLFlBQVk7QUFBQSxNQUFNLFVBQVU7QUFBQTtBQUFBLElBQW1CO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsbUJBQW1CO0FBQUE7QUFBQSxJQUNuQix1QkFBdUI7QUFBQTtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQTtBQUFBLFFBRU4sZ0JBQWdCLENBQUMsY0FBYztBQUU3QixjQUFJLFVBQVUsS0FBSyxTQUFTLE1BQU0sS0FBSyxVQUFVLEtBQUssU0FBUyxPQUFPLEdBQUc7QUFDdkUsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUE7QUFBQSxRQUVBLGNBQWMsQ0FBQyxPQUFPO0FBRXBCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUUvQixnQkFBSSxHQUFHLFNBQVMsT0FBTyxLQUFLLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDcEQscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQzVCLHFCQUFPO0FBQUEsWUFDVDtBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K

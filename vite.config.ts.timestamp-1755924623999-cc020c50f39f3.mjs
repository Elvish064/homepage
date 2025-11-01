// vite.config.ts
import { defineConfig } from "file:///E:/%E5%BC%80%E5%8F%91/site/home/node_modules/.pnpm/vite@5.4.19_@types+node@22.17.2/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/%E5%BC%80%E5%8F%91/site/home/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_89012b41e30f2c1c1f4e3717ab867783/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import Inspector from "file:///E:/%E5%BC%80%E5%8F%91/site/home/node_modules/.pnpm/unplugin-vue-dev-locator@1._3162a1f609756c76bcd36a5992c4369f/node_modules/unplugin-vue-dev-locator/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\\u5F00\u53D1\\site\\home";
var vite_config_default = defineConfig({
  build: {
    sourcemap: "hidden"
  },
  plugins: [
    vue(),
    Inspector()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
      // ✅ 定义 @ = src
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTVGMDBcdTUzRDFcXFxcc2l0ZVxcXFxob21lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxcdTVGMDBcdTUzRDFcXFxcc2l0ZVxcXFxob21lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8lRTUlQkMlODAlRTUlOEYlOTEvc2l0ZS9ob21lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBJbnNwZWN0b3IgZnJvbSAndW5wbHVnaW4tdnVlLWRldi1sb2NhdG9yL3ZpdGUnXG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6ICdoaWRkZW4nLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgSW5zcGVjdG9yKCksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSwgLy8gXHUyNzA1IFx1NUI5QVx1NEU0OSBAID0gc3JjXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVQLFNBQVMsb0JBQW9CO0FBQ3BSLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxlQUFlO0FBSHRCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

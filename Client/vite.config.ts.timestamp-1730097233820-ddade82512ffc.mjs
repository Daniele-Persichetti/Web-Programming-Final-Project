// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Danie/Web-Programming-Final-Project/Client/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Danie/Web-Programming-Final-Project/Client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/Danie/Web-Programming-Final-Project/Client/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///C:/Users/Danie/Web-Programming-Final-Project/Client/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import VueRouter from "file:///C:/Users/Danie/Web-Programming-Final-Project/Client/node_modules/unplugin-vue-router/dist/vite.js";
import VitePluginVueDevTools from "file:///C:/Users/Danie/Web-Programming-Final-Project/Client/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Danie/Web-Programming-Final-Project/client/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePluginVueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEYW5pZVxcXFxXZWItUHJvZ3JhbW1pbmctRmluYWwtUHJvamVjdFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXERhbmllXFxcXFdlYi1Qcm9ncmFtbWluZy1GaW5hbC1Qcm9qZWN0XFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRGFuaWUvV2ViLVByb2dyYW1taW5nLUZpbmFsLVByb2plY3QvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcbmltcG9ydCBWaXRlUGx1Z2luVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZVJvdXRlcih7XG4gICAgICAvKiBvcHRpb25zICovXG4gICAgfSksXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBWaXRlUGx1Z2luVnVlRGV2VG9vbHMoKVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVixTQUFTLGVBQWUsV0FBVztBQUV4WCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLDJCQUEyQjtBQVBxTCxJQUFNLDJDQUEyQztBQVV4USxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUE7QUFBQSxJQUVWLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLHNCQUFzQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

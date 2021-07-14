import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        // content of manifest
      },
      workbox: {
        // workbox options for generateSW
      },
    }),
  ],
  server: { proxy: { "/api": { target: "http://127.0.0.1:3001/", ws: true } } },
});

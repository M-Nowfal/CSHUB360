import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      srcDir: "src",
      filename: "service-worker.js",
      includeAssets: ["icons/icon-192x192.png", "icons/icon-512x512.png"],
      manifest: {
        name: "CSHUB360",
        short_name: "CS360",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
});

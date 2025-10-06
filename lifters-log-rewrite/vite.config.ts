import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Lifter's Log",
        short_name: "LiftersLog",
        theme_color: "#000000",
        icons: [
          {
            "src": "icon.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "icon.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ]
      }
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 5173
  }
})

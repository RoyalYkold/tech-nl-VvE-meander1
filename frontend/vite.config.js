import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/tech-nl-VvE-meander1/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'VvE Meander1',
        short_name: 'Meander1',
        description: 'Publieke website en bewonersportaal van VvE Meander1',
        theme_color: '#2452d4',
        background_color: '#f4f6fb',
        display: 'standalone',
        start_url: '/tech-nl-VvE-meander1/',
        icons: [
          { src: '/tech-nl-VvE-meander1/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/tech-nl-VvE-meander1/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})

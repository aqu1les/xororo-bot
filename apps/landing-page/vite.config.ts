import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        name: 'Xororo BOT',
        short_name: 'Xororo BOT',
        description: 'O mais tóxico que você vai encontrar.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icons/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});

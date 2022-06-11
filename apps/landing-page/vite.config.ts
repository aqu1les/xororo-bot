import * as path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  define: {
    __BUILD_HASH__: Date.now()
  },
  plugins: [
    solidPlugin(),
    VitePWA({
      includeAssets: ['i18n'],
      injectManifest: {
        globPatterns: ['i18n/**/*.json']
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
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
  ],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/app/core'),
      '@config': path.resolve(__dirname, './src/config')
    }
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false
  }
});

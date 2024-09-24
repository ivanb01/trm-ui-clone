import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  define: {
    'process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE': '1000000',
    'process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS': '1000000'
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        icons: [
          {
            sizes: '64x64',
            src: 'pwa-64x64.png',
            type: 'image/png'
          },
          {
            sizes: '192x192',
            src: 'pwa-192x192.png',
            type: 'image/png'
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'pwa-512x512.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'maskable-icon-512x512.png',
            type: 'image/png'
          }
        ],
        name: 'Vite PWA Project',
        short_name: 'Vite PWA Project',
        theme_color: '#ffffff'
      },
      registerType: 'autoUpdate'
    })
  ],
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@pages': path.resolve(__dirname, './src/pages')
    }
  },
  server: {
    port: 3333
  }
});

// Vite is the tool that runs our development server and bundles the app.
// This config is intentionally minimal — it just turns on React support.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['polar-logo.svg', 'polar-hero-bg.webp', 'polar-station-clean.webp', 'pwa-192x192.png', 'pwa-512x512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'POLAR-AI',
        short_name: 'POLAR-AI',
        description: 'Integrated Polar Expedition Logistics and Asset Management System',
        theme_color: '#F8FBFD',
        background_color: '#F8FBFD',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/polar-logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        sourcemap: false,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Pre-cache all app assets so the full console works without internet
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,woff,woff2,json}'],
        // Serve the app shell from cache for all navigation requests (SPA offline)
        navigateFallback: '/index.html',
        // Only use cache fallback for same-origin navigation, not external URLs
        navigateFallbackDenylist: [/^\/api\//, /^\/supabase\//],
        // Pre-cache the offline fallback page too
        additionalManifestEntries: [
          { url: '/offline.html', revision: '1' },
        ],
        runtimeCaching: [
          // Google Fonts — cache first, 1 year
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 15, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Supabase API — network first with 5s timeout, fallback to cache
          // Allows the app to read last-known data when offline
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Tile maps (OpenStreetMap) — stale while revalidate, cached for 30d
          {
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'map-tiles-cache',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  oxc: command === 'build' ? { drop: ['console', 'debugger'] } : undefined,
  server: {
    port: 5173,
    open: true, // automatically opens your browser when you run `npm run dev`
  },
}))

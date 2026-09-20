/**
 * THE STARTING POINT OF THE WHOLE APP
 * ===================================
 * index.html loads this one file, and this file loads everything else.
 *
 * Reading order for the project:
 *   index.html  ->  src/main.jsx (you are here)  ->  src/App.jsx  ->  pages
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DataProvider } from './store/DataContext'
import { AuthProvider } from './store/AuthContext'
import { ThemeProvider } from './store/ThemeContext'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Register the Service Worker for offline capability
// onNeedRefresh: a new SW version is waiting — reload to apply it
// onOfflineReady: all assets have been pre-cached, app works offline
registerSW({
  immediate: true,
  onNeedRefresh() {
    // New version deployed — auto-reload once to pick up fresh chunks
    const lastPrompt = sessionStorage.getItem('polar.sw_refresh')
    const now = Date.now()
    if (!lastPrompt || now - parseInt(lastPrompt, 10) > 30000) {
      sessionStorage.setItem('polar.sw_refresh', String(now))
      window.location.reload()
    }
  },
  onOfflineReady() {
    // All assets cached — app is fully available offline
    // (no UI notification needed; OfflineBanner handles the UX)
  },
})

// Handle dynamic chunk import errors gracefully (e.g. after a new production deployment)
window.addEventListener('vite:preloadError', (event) => {
  event?.preventDefault?.()
  const lastReload = sessionStorage.getItem('polar.chunk_reload')
  const now = Date.now()
  if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
    sessionStorage.setItem('polar.chunk_reload', String(now))
    window.location.reload()
  }
})

/* THREE PROVIDERS, AND THE ORDER MATTERS.
   <ThemeProvider> is outermost so the theme is available everywhere,
   including the sign-in screen.
   <DataProvider> holds the expedition data. <AuthProvider> holds who is
   signed in. Data is on the OUTSIDE so that the sign-in screen can read it —
   that is how src/pages/Login.jsx shows the real expedition and personnel
   counts before anybody has signed in.

   <DataProvider> wrapping <App> is the one line that makes the "connected
   modules" behaviour possible: every page inside it calls useData() and
   reads the same shared records. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
)

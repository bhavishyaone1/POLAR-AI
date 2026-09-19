/**
 * THEME CONTEXT — POLAR ARCTIC WHITE THEME
 * =========================================
 * Enforces the clean Arctic White & Light Ice visual language across the entire application.
 * All cards and surfaces remain pristine white (#FFFFFF) on soft ice-blue (#F4F8FA).
 */

import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'polar-theme'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  /* Always enforce the pristine light Arctic theme */
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', 'light')

    try {
      localStorage.setItem(STORAGE_KEY, 'light')
    } catch {
      // Silently ignore storage errors
    }
  }, [theme])

  const toggleTheme = () => {
    // Keep locked to light
    setTheme('light')
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        setTheme,
        toggleTheme,
        isDark: false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

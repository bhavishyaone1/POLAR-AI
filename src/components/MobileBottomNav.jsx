/**
 * MOBILE BOTTOM NAVIGATION BAR
 * =============================
 * Native-grade mobile bottom bar for touch devices (< 1024px).
 * Provides fast 1-thumb navigation to the core continuity flow:
 * - Overview
 * - Mission Risk
 * - Simulator
 * - AI Copilot
 * - More (Menu drawer toggle for Cargo, Inventory, Assets, Expedition)
 */

import React from 'react'
import {
  AlertTriangle,
  Bot,
  LayoutDashboard,
  Menu,
  Sliders,
} from 'lucide-react'

export default function MobileBottomNav({ currentView, onNavigate, onOpenMenu }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'risks', label: 'Risk', icon: AlertTriangle },
    { id: 'simulator', label: 'Simulator', icon: Sliders },
    { id: 'copilot', label: 'Copilot', icon: Bot },
  ]

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-30 border-t border-[var(--line)] bg-[var(--surface-card)]/95 backdrop-blur-md lg:hidden pb-[env(safe-area-inset-bottom)] shadow-md"
    >
      <div className="flex h-15 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id || (item.id === 'dashboard' && currentView === 'landing')

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-1 flex-col items-center justify-center py-1.5 transition ${
                isActive
                  ? 'text-[var(--ice)] font-semibold'
                  : 'text-[var(--ink-mid)] hover:text-[var(--ink-hi)]'
              }`}
            >
              <div className={`p-1 rounded-lg transition ${isActive ? 'bg-[var(--surface-ice)]' : ''}`}>
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.75} />
              </div>
              <span className="text-[10px] tracking-tight font-medium mt-0.5">
                {item.label}
              </span>
            </button>
          )
        })}

        {/* Full Menu Drawer Toggle */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-1 flex-col items-center justify-center py-1.5 text-[var(--ink-mid)] hover:text-[var(--ink-hi)] transition"
        >
          <div className="p-1 rounded-lg">
            <Menu size={18} strokeWidth={1.75} />
          </div>
          <span className="text-[10px] tracking-tight font-medium mt-0.5">
            More
          </span>
        </button>
      </div>
    </nav>
  )
}

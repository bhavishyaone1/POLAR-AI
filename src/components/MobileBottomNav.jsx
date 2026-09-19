/**
 * MOBILE BOTTOM NAVIGATION BAR — 5 CORE OPERATIONAL PILLARS
 * ==========================================================
 * Native-grade mobile bottom bar for touch devices (< 1024px).
 * Provides instantaneous 1-thumb navigation directly to the 5 Core Operational Pillars:
 * 1. Overview (Mission Dashboard)
 * 2. Expedition Planning (Field Operations & Traverses)
 * 3. Cargo Tracking (Maritime & Aviation Freight)
 * 4. Inventory Management (Fuel, Life Support, Spares)
 * 5. Personnel Movement (Station Rosters & Field GPS)
 * 6. Emergency Response (Incident Triage & Armed SOS)
 * + More drawer for Deep Tools (Simulator, Risk Matrix, Copilot, Audit Log)
 */

import React from 'react'
import {
  Compass,
  LayoutDashboard,
  Menu,
  Package,
  Boxes,
  ShieldAlert,
  Users,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function MobileBottomNav({ currentView, onNavigate, onOpenMenu }) {
  const { emergencies } = useData()
  const activeEmergencies = (emergencies || []).filter((e) => e.status !== 'RESOLVED').length

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'expeditions', label: 'Expeditions', icon: Compass },
    { id: 'cargo', label: 'Cargo', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'personnel', label: 'Personnel', icon: Users },
    {
      id: 'emergency',
      label: 'SOS',
      icon: ShieldAlert,
      badge: activeEmergencies > 0 ? activeEmergencies : null,
      isEmergency: true,
    },
  ]

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-30 border-t border-[#DDEAF0] bg-white/95 backdrop-blur-md lg:hidden pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(18,38,58,0.06)]"
    >
      <div className="flex h-14 items-center justify-around px-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            currentView === item.id || (item.id === 'dashboard' && currentView === 'landing')

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-1 flex-col items-center justify-center py-1 transition ${
                isActive
                  ? item.isEmergency
                    ? 'text-rose-600 font-bold'
                    : 'text-[#1597D4] font-bold'
                  : 'text-[#64748B] hover:text-[#12263A]'
              }`}
            >
              <div
                className={`relative p-1 rounded-lg transition ${
                  isActive
                    ? item.isEmergency
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-[#EBF5FA] text-[#1597D4]'
                    : ''
                }`}
              >
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.75} />
                {item.badge && (
                  <span className="absolute -top-0.5 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600 text-[8px] font-bold text-white items-center justify-center">
                    </span>
                  </span>
                )}
              </div>
              <span className="text-[9.5px] tracking-tight font-medium mt-0.5 truncate max-w-[50px]">
                {item.label}
              </span>
            </button>
          )
        })}

        {/* Full Navigation Menu Drawer Toggle */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-1 flex-col items-center justify-center py-1 text-[#64748B] hover:text-[#12263A] transition"
        >
          <div className="p-1 rounded-lg">
            <Menu size={17} strokeWidth={1.75} />
          </div>
          <span className="text-[9.5px] tracking-tight font-medium mt-0.5">
            More
          </span>
        </button>
      </div>
    </nav>
  )
}

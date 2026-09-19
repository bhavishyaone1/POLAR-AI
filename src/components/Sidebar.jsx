/**
 * SIDEBAR — POLAR-AI MISSION CONTINUITY INTELLIGENCE
 * ====================================================
 * Pixel-perfect alignment with the design reference:
 * - Geometric ice mountain logo + "POLAR-AI" & "Mission Continuity Intelligence"
 * - 8 items: Dashboard, Expedition, Cargo (3), Inventory (2), Assets, Mission Risk (4), Simulator, AI Copilot
 * - Active state: Soft sky-blue fill with vibrant sky-blue icon and text
 * - System Online status card + mountain illustration + footer tagline
 */

import React from 'react'
import {
  AlertTriangle,
  Bot,
  Boxes,
  Compass,
  Cpu,
  LayoutDashboard,
  Package,
  Siren,
  Sliders,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../store/AuthContext'
import { useData } from '../store/DataContext'

export default function Sidebar({ view, onNavigate, open, onClose }) {
  const { signOut } = useAuth()
  const { stats } = useData()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'expeditions', label: 'Expedition', icon: Compass },
    { id: 'cargo', label: 'Cargo', icon: Package, badge: 3 },
    { id: 'inventory', label: 'Inventory', icon: Boxes, badge: 2 },
    { id: 'assets', label: 'Assets', icon: Cpu },
    { id: 'risks', label: 'Mission Risk', icon: AlertTriangle, badge: 4 },
    { id: 'simulator', label: 'Simulator', icon: Sliders },
    { id: 'copilot', label: 'AI Copilot', icon: Sparkles },
    { id: 'personnel', label: 'Personnel', icon: Users, badge: stats?.personnelTotal || 50, subtle: true },
    { id: 'emergency', label: 'Emergency', icon: Siren, isAlert: true, alertCount: stats?.openEmergenciesCount || 1, subtle: true },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[85vw] flex-col border-r border-[#DCE8F0]
          bg-white transition-transform duration-250 ease-in-out
          lg:sticky lg:bottom-auto lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:w-[240px]
          ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* ---------- Logo & Brand ---------- */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#DCE8F0]">
          <div className="flex items-center gap-3 min-w-0">
            {/* Geometric Mountain Logo */}
            <div className="shrink-0 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="20,4 32,32 8,32" fill="#0284C7" />
                <polygon points="20,4 26,32 8,32" fill="#38BDF8" opacity="0.85" />
                <polygon points="28,14 38,32 18,32" fill="#0EA5E9" opacity="0.65" />
                <polygon points="12,18 22,32 2,32" fill="#7DD3FC" opacity="0.75" />
              </svg>
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight text-[#0C1E30]">
                POLAR-AI
              </div>
              <div className="text-[11px] text-[#6E8294] font-normal leading-tight">
                Mission Continuity
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#6E8294] hover:text-[#0C1E30] lg:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* ---------- 8 Navigation Items ---------- */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = view === item.id || (item.id === 'dashboard' && view === 'landing')

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id)
                  if (onClose) onClose()
                }}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] transition font-medium
                  ${
                    isActive
                      ? 'bg-[#E0F2FE] text-[#0284C7] font-semibold'
                      : 'text-[#42586E] hover:bg-[#F0F7FB] hover:text-[#0C1E30]'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.2 : 1.75}
                  className={isActive ? 'text-[#0284C7]' : 'text-[#6E8294]'}
                />
                <span className="flex-1 text-left truncate">{item.label}</span>

                {item.isAlert && item.alertCount > 0 ? (
                  <span className="h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-mono font-medium flex items-center justify-center bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                    {item.alertCount}
                  </span>
                ) : item.badge ? (
                  <span
                    className={`
                      h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-mono font-medium flex items-center justify-center
                      ${
                        isActive
                          ? 'bg-white text-[#0284C7] shadow-2xs'
                          : 'bg-[#E0F2FE] text-[#0284C7]'
                      }
                    `}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            )
          })}
        </nav>

        {/* ---------- Footer Status Card & Mountain Silhouette ---------- */}
        <div className="p-3.5 space-y-2.5 border-t border-[#DCE8F0] relative overflow-hidden bg-white">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#0C1E30]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online</span>
            </div>
            <div className="text-[10.5px] text-[#6E8294] pl-4 font-mono">
              SATCOM Sync: 2m ago
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <Compass size={14} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#0C1E30] truncate">Maitri Station</div>
              <div className="text-[10.5px] text-[#6E8294] truncate">Primary Antarctic Base</div>
            </div>
          </div>

          {/* Mountain Silhouette Graphic Watermark */}
          <div className="relative pt-1">
            <svg
              viewBox="0 0 200 45"
              className="w-full h-10 text-sky-100/80 fill-current opacity-80"
              preserveAspectRatio="none"
            >
              <polygon points="0,45 25,20 45,32 75,10 100,28 135,8 165,30 200,16 200,45" />
              <polygon points="0,45 40,25 65,35 110,18 145,30 180,22 200,45" fill="#BAE6FD" opacity="0.4" />
            </svg>
          </div>
        </div>
      </aside>
    </>
  )
}

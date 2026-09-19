/**
 * GLOBAL COMMAND PALETTE (CTRL+K / CMD+K)
 * =======================================
 * Rapid fuzzy search across all polar stations, cargo, inventory,
 * machinery assets, personnel, risks, and open incidents.
 */

import React, { useState, useEffect } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Compass,
  Cpu,
  Flame,
  GitFork,
  MapPin,
  Package,
  Search,
  ShieldAlert,
  Sliders,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function CommandPalette({ isOpen, onClose, goTo }) {
  const { expeditions, personnel, cargo, inventory, assets, risks, emergencies, locations } = useData()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery('')
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const q = query.trim().toLowerCase()

  const results = []

  if (q) {
    // Quick Actions
    if ('simulator'.includes(q) || 'what if'.includes(q)) {
      results.push({
        id: 'action-sim',
        title: 'Open What-If Mission Simulator',
        category: 'Quick Action',
        icon: Sliders,
        view: 'simulator',
      })
    }
    if ('dependency'.includes(q) || 'impact'.includes(q) || 'graph'.includes(q)) {
      results.push({
        id: 'action-impact',
        title: 'Open Dependency Graph & Chain Reaction',
        category: 'Quick Action',
        icon: GitFork,
        view: 'impact',
      })
    }
    if ('ppt'.includes(q) || 'presentation'.includes(q) || 'deck'.includes(q)) {
      results.push({
        id: 'action-ppt',
        title: 'Open PPT Presentation Comparison Mode',
        category: 'Quick Action',
        icon: Sparkles,
        view: 'reports',
      })
    }

    // Risks
    ;(risks || []).forEach((r) => {
      if (r.title.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) {
        results.push({
          id: r.id,
          title: `${r.id}: ${r.title}`,
          category: 'Risk',
          icon: AlertTriangle,
          view: 'risks',
        })
      }
    })

    // Assets
    ;(assets || []).forEach((a) => {
      if (a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)) {
        results.push({
          id: a.id,
          title: `${a.id}: ${a.name}`,
          category: 'Asset / Machinery',
          icon: Cpu,
          view: 'assets',
        })
      }
    })

    // Cargo
    ;(cargo || []).forEach((c) => {
      if (c.item_name?.toLowerCase().includes(q) || c.id?.toLowerCase().includes(q)) {
        results.push({
          id: c.id,
          title: `${c.id}: ${c.item_name}`,
          category: 'Cargo',
          icon: Package,
          view: 'cargo',
        })
      }
    })

    // Inventory
    ;(inventory || []).forEach((i) => {
      if (i.item_name?.toLowerCase().includes(q) || i.id?.toLowerCase().includes(q)) {
        results.push({
          id: i.id,
          title: `${i.id}: ${i.item_name}`,
          category: 'Inventory',
          icon: Boxes,
          view: 'inventory',
        })
      }
    })

    // Personnel
    ;(personnel || []).forEach((p) => {
      if (p.name?.toLowerCase().includes(q) || p.role?.toLowerCase().includes(q)) {
        results.push({
          id: p.id,
          title: `${p.name} (${p.role})`,
          category: 'Personnel',
          icon: Users,
          view: 'personnel',
        })
      }
    })

    // Emergencies
    ;(emergencies || []).forEach((e) => {
      if (e.description?.toLowerCase().includes(q) || e.id?.toLowerCase().includes(q)) {
        results.push({
          id: e.id,
          title: `${e.id}: ${e.type} at ${e.location}`,
          category: 'Emergency',
          icon: ShieldAlert,
          view: 'emergency',
        })
      }
    })
  }

  const handleSelect = (view) => {
    onClose()
    goTo(view)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 px-3 sm:px-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#DDEAF0] bg-white shadow-2xl">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#DDEAF0] px-4 py-3.5 bg-white">
          <Search size={18} className="text-[#1597D4] shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Type a command, asset, cargo, or risk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-[#12263A] placeholder-[#8495A3] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#8495A3] hover:text-[#12263A] hover:bg-[#F0F8FB] transition ml-2"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[65vh] sm:max-h-96 overflow-y-auto p-2 divide-y divide-[#EEF7FA]">
          {!q ? (
            <div className="p-6 text-center text-xs text-[#526779] space-y-2">
              <p className="font-mono uppercase text-[#8495A3] text-[10.5px] font-semibold">Suggested Modules</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <button
                  onClick={() => handleSelect('simulator')}
                  className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] px-3 py-1.5 text-xs font-semibold text-[#12263A] hover:border-[#1597D4] hover:bg-[#EEF9FC] transition shadow-2xs"
                >
                  ⚡ What-If Simulator
                </button>
                <button
                  onClick={() => handleSelect('risks')}
                  className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] px-3 py-1.5 text-xs font-semibold text-[#12263A] hover:border-[#1597D4] hover:bg-[#EEF9FC] transition shadow-2xs"
                >
                  🔗 Dependency Graph
                </button>
                <button
                  onClick={() => handleSelect('assets')}
                  className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] px-3 py-1.5 text-xs font-semibold text-[#12263A] hover:border-[#1597D4] hover:bg-[#EEF9FC] transition shadow-2xs"
                >
                  ⚙️ Asset Fleet
                </button>
                <button
                  onClick={() => handleSelect('reports')}
                  className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] px-3 py-1.5 text-xs font-semibold text-[#12263A] hover:border-[#1597D4] hover:bg-[#EEF9FC] transition shadow-2xs"
                >
                  📊 PPT Presentation
                </button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8495A3]">
              No matching polar entities found for "{query}".
            </div>
          ) : (
            results.slice(0, 10).map((r) => {
              const Icon = r.icon
              return (
                <div
                  key={r.id}
                  onClick={() => handleSelect(r.view)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8FB] cursor-pointer transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#DDF3FA] p-2 text-[#1597D4] group-hover:bg-[#1597D4] group-hover:text-white transition">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#12263A] group-hover:text-[#1597D4] transition">
                        {r.title}
                      </p>
                      <span className="text-[10px] font-mono text-[#8495A3] uppercase">
                        {r.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[#8495A3] group-hover:text-[#1597D4] transition" />
                </div>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-[#DDEAF0] bg-[#F7FBFD] px-4 py-2.5 text-[10px] font-mono text-[#8495A3]">
          <span>Navigate with mouse or Esc to close</span>
          <span>POLAR-AI Search</span>
        </div>
      </div>
    </div>
  )
}

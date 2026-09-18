/**
 * THE NAVIGATION REGISTRY — POLAR-AI
 * ===================================
 * Defines the navigation structure, groupings, titles, blurbs,
 * and Lucide icons for all modules of the platform.
 */

import {
  AlertTriangle,
  BookOpen,
  Bot,
  Boxes,
  CloudSnow,
  Compass,
  Cpu,
  FileText,
  GitFork,
  LayoutDashboard,
  Map,
  Package,
  ShieldCheck,
  Siren,
  Sliders,
  Sparkles,
  Users,
} from 'lucide-react'

export const NAV_ITEMS = [
  /* ---------- Governance & Pitch ---------- */
  {
    id: 'landing',
    label: 'Platform Pitch / PPT',
    title: 'POLAR-AI Mission Briefing',
    blurb: 'System comparison, predictive architecture and core USP.',
    icon: Sparkles,
    group: 'Governance',
  },

  /* ---------- Operations ---------- */
  {
    id: 'dashboard',
    label: 'Command Center',
    title: 'Polar Operations Command Center',
    blurb: 'Predictive mission continuity, real-time risk telemetry, and resupply forecasting.',
    icon: LayoutDashboard,
    group: 'Operations',
  },
  {
    id: 'expeditions',
    label: 'Expeditions & Missions',
    title: 'Expedition & Mission Management',
    blurb: 'Plan, track and update polar expeditions and nested sub-mission dependencies.',
    icon: Compass,
    group: 'Operations',
  },
  {
    id: 'personnel',
    label: 'Personnel & Teams',
    title: 'Personnel Tracking & Team Allocation',
    blurb: 'Team rosters, duty status, shifts, medical groups, and spatial coordinates.',
    icon: Users,
    group: 'Operations',
  },
  {
    id: 'assets',
    label: 'Asset Fleet & Power',
    title: 'Asset Fleet & Microgrid Resilience',
    blurb: 'Generators, snowcats, satcom, heating loops, operating hours, and failure risks.',
    icon: Cpu,
    group: 'Operations',
  },

  /* ---------- Intelligence & USP ---------- */
  {
    id: 'impact',
    label: 'Impact & Dependencies',
    title: 'Dependency Graph & Chain Reaction',
    blurb: 'Interactive graph tracing cascading failures: Cargo → Fuel → Power → Science.',
    icon: GitFork,
    group: 'Intelligence & USP',
  },
  {
    id: 'simulator',
    label: 'What-If Simulator',
    title: 'What-If Mission Continuity Simulator',
    blurb: 'Non-mutating sandbox: test cargo delays, generator trips, and blizzard impacts.',
    icon: Sliders,
    group: 'Intelligence & USP',
  },
  {
    id: 'risks',
    label: 'Risk Engine & Matrix',
    title: 'Operational Risk Engine',
    blurb: 'Probability × Impact severity matrix across logistics, assets, and climate.',
    icon: AlertTriangle,
    group: 'Intelligence & USP',
  },
  {
    id: 'copilot',
    label: 'Polar AI Copilot',
    title: 'AURORA — Polar Intelligence Copilot',
    blurb: 'Grounded operations assistant with explainable recommendations & human approval.',
    icon: Bot,
    group: 'Intelligence & USP',
  },

  /* ---------- Logistics ---------- */
  {
    id: 'cargo',
    label: 'Cargo & Logistics',
    title: 'Cargo Tracking & Staging Ports',
    blurb: 'Consignments in transit between ports, vessels, and polar blue-ice runways.',
    icon: Package,
    group: 'Logistics',
  },
  {
    id: 'inventory',
    label: 'Inventory & Runway',
    title: 'Inventory & Consumption Runway',
    blurb: 'Station stock levels, burn rates, days remaining, and Last Safe Resupply Date.',
    icon: Boxes,
    group: 'Logistics',
  },

  /* ---------- Situation ---------- */
  {
    id: 'map',
    label: 'Live Tactical Map',
    title: 'Tactical Situation Map',
    blurb: 'Stations, field camps, vessels, personnel, cargo routes, and incident markers.',
    icon: Map,
    group: 'Situation',
  },
  {
    id: 'weather',
    label: 'Polar Weather',
    title: 'Extreme Climate Integration',
    blurb: 'Live Antarctic & Arctic observations, blizzard alerts, and chill indices.',
    icon: CloudSnow,
    group: 'Situation',
  },

  /* ---------- Response ---------- */
  {
    id: 'emergency',
    label: 'Emergency Response',
    title: 'Autonomous Emergency Response Center',
    blurb: '100% offline triage, nearest personnel/vehicle dispatch, and tactical rescue.',
    icon: Siren,
    group: 'Response',
  },

  /* ---------- Governance ---------- */
  {
    id: 'reports',
    label: 'Mission Reports & Deck',
    title: 'Operational Reports & Pitch Deck',
    blurb: 'Exportable PPT comparison, Daily Mission Reports, and Continuity Audits.',
    icon: FileText,
    group: 'Governance',
  },
  {
    id: 'audit',
    label: 'Immutable Audit Log',
    title: 'Cryptographic Audit Trail',
    blurb: 'Chronological record of officer approvals, emergency dispatches, and parameter edits.',
    icon: ShieldCheck,
    group: 'Governance',
  },
  {
    id: 'sources',
    label: 'Data Provenance',
    title: 'Research References & Data Provenance',
    blurb: 'Official source attribution, NCPOR station records and meteorological datasets.',
    icon: BookOpen,
    group: 'Governance',
    hidden: true,
  },
]

/* Sidebar section rendering order */
export const NAV_GROUPS = ['Governance', 'Operations', 'Intelligence & USP', 'Logistics', 'Situation', 'Response']

/**
 * Finds one nav item by id with dashboard fallback.
 */
export function findNavItem(id) {
  return NAV_ITEMS.find((item) => item.id === id) || NAV_ITEMS[1]
}

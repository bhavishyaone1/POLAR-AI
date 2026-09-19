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
  /* ---------- 8 Primary Navigation Items ---------- */
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Mission Operations Dashboard',
    blurb: 'Continuous mission continuity intelligence, resource runway, and active risk telemetry.',
    icon: LayoutDashboard,
    group: 'Operations',
  },
  {
    id: 'expeditions',
    label: 'Expedition',
    title: 'Expedition & Mission Tracking',
    blurb: 'Active polar expeditions, team schedules, and traverse status.',
    icon: Compass,
    group: 'Operations',
  },
  {
    id: 'cargo',
    label: 'Cargo',
    title: 'Cargo & Logistics Corridors',
    blurb: 'Consignments in transit, vessel staging, and blue-ice runway arrivals.',
    icon: Package,
    group: 'Operations',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    title: 'Inventory & Consumption Runway',
    blurb: 'Fuel, rations, medical reserves, and safe resupply windows.',
    icon: Boxes,
    group: 'Operations',
  },
  {
    id: 'assets',
    label: 'Assets',
    title: 'Asset Fleet & Critical Infrastructure',
    blurb: 'Station generators, snowcats, satcom terminals, and heating loops.',
    icon: Cpu,
    group: 'Operations',
  },
  {
    id: 'risks',
    label: 'Mission Risk',
    title: 'Operational Risk Engine',
    blurb: 'Vulnerability detection and causal dependency flow.',
    icon: AlertTriangle,
    group: 'Continuity Intelligence',
  },
  {
    id: 'simulator',
    label: 'Simulator',
    title: 'What-If Continuity Simulator',
    blurb: 'Test hypothetical cargo delays and hardware outages before they occur.',
    icon: Sliders,
    group: 'Continuity Intelligence',
  },
  {
    id: 'copilot',
    label: 'AI Copilot',
    title: 'ASK POLAR — Mission Continuity AI',
    blurb: 'Grounded mission intelligence assistant with verified operational numbers.',
    icon: Bot,
    group: 'Continuity Intelligence',
  },

  /* ---------- Secondary / Auxiliary Views (Accessible via direct routes / buttons) ---------- */
  {
    id: 'impact',
    label: 'Impact Analysis',
    title: 'Chain Reaction & Dependency Cascade',
    blurb: 'Trace cascading failures: Cargo → Fuel → Power → Mission.',
    icon: GitFork,
    group: 'Continuity Intelligence',
    hidden: true,
  },
  {
    id: 'personnel',
    label: 'Personnel',
    title: 'Personnel & Team Tracking',
    blurb: 'Team rosters and duty assignments.',
    icon: Users,
    group: 'Operations',
    hidden: true,
  },
  {
    id: 'landing',
    label: 'Platform Overview',
    title: 'POLAR-AI Mission Briefing',
    blurb: 'Platform overview and core concept.',
    icon: Sparkles,
    group: 'Governance',
    hidden: true,
  },
  {
    id: 'map',
    label: 'Tactical Map',
    title: 'Station Tactical Map',
    blurb: 'Geographic tracking of stations and traverses.',
    icon: Map,
    group: 'Operations',
    hidden: true,
  },
  {
    id: 'weather',
    label: 'Polar Weather',
    title: 'Polar Weather Telemetry',
    blurb: 'Observations and weather alerts.',
    icon: CloudSnow,
    group: 'Operations',
    hidden: true,
  },
  {
    id: 'emergency',
    label: 'Emergency Response',
    title: 'Emergency Response Center',
    blurb: 'Incident triage and response dispatch.',
    icon: Siren,
    group: 'Operations',
    hidden: true,
  },
  {
    id: 'reports',
    label: 'Reports',
    title: 'Operational Reports',
    blurb: 'Mission reports and summaries.',
    icon: FileText,
    group: 'Governance',
    hidden: true,
  },
  {
    id: 'audit',
    label: 'Audit Trail',
    title: 'Cryptographic Audit Trail',
    blurb: 'Immutable record of officer approvals and mitigations.',
    icon: ShieldCheck,
    group: 'Governance',
    hidden: true,
  },
  {
    id: 'sources',
    label: 'Data Sources',
    title: 'Data Sources & Provenance',
    blurb: 'Station records and research datasets.',
    icon: BookOpen,
    group: 'Governance',
    hidden: true,
  },
]

/* Sidebar section rendering order */
export const NAV_GROUPS = ['Operations', 'Continuity Intelligence']

/**
 * Finds one nav item by id with dashboard fallback.
 */
export function findNavItem(id) {
  return NAV_ITEMS.find((item) => item.id === id) || NAV_ITEMS[1]
}

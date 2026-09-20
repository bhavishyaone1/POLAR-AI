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
  /* ---------- Core Operational Pillars (The 5 Core Pillars) ---------- */
  {
    id: 'dashboard',
    label: 'Overview',
    title: 'Mission Operations Overview',
    blurb: 'Centralized command overview, continuity score, and integrated operational telemetry.',
    icon: LayoutDashboard,
    group: 'Operations',
  },
  {
    id: 'expeditions',
    label: 'Expedition Planning',
    title: 'Expedition Planning & Missions',
    blurb: 'Antarctic research missions, route planning, milestones, and personnel assignments.',
    icon: Compass,
    group: 'Operations',
  },
  {
    id: 'cargo',
    label: 'Cargo Tracking',
    title: 'Cargo Tracking & Logistics Corridors',
    blurb: 'Consignments in transit, polar vessel manifests, and blue-ice resupply timelines.',
    icon: Package,
    group: 'Operations',
  },
  {
    id: 'inventory',
    label: 'Inventory Management',
    title: 'Inventory & Consumable Reserves',
    blurb: 'Fuel reserves, life-support rations, medical buffers, and calculated burn rates.',
    icon: Boxes,
    group: 'Operations',
  },
  {
    id: 'personnel',
    label: 'Personnel Movement',
    title: 'Personnel Movement & Deployments',
    blurb: 'Roster tracking, station vs field camp movements, satellite check-ins, and medical clearances.',
    icon: Users,
    group: 'Operations',
  },
  {
    id: 'emergency',
    label: 'Emergency Response',
    title: 'Emergency Response & Incident Command',
    blurb: 'Distress triage, armed SOS broadcasts, response readiness, and tactical radio comms.',
    icon: Siren,
    group: 'Operations',
  },

  /* ---------- Continuity Intelligence & Decision Support ---------- */
  {
    id: 'assets',
    label: 'Station Assets',
    title: 'Asset Fleet & Critical Infrastructure',
    blurb: 'Generators, microgrid power loops, traverse snowcats, and heating systems.',
    icon: Cpu,
    group: 'Continuity Intelligence',
  },
  {
    id: 'risks',
    label: 'Mission Risk',
    title: 'Operational Risk Engine',
    blurb: 'Vulnerability detection and systemic causal failure propagation.',
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
    id: 'landing',
    label: 'Platform Overview',
    title: 'POLAR-AI Mission Briefing',
    blurb: 'Centralized digital platform overview for polar expedition operations.',
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
  return NAV_ITEMS.find((item) => item.id === id) || NAV_ITEMS[0]
}


/**
 * USER CREDENTIALS & DEMO OPERATOR ROSTER
 * ========================================
 * Authorized demo personnel directory for POLAR-AI Mission Command.
 * Includes complete operational profiles, station assignments, and access roles.
 *
 * All demo users support their primary password as well as universal demo password 'polar123'.
 */

export const USERS = [
  /* Expedition Commanders */
  {
    id: 'commander',
    password: 'expedition@cmd',
    passwords: ['expedition@cmd', 'commander123', 'polar123', 'cmd@2026'],
    name: 'Cdr. Anjali Kulkarni',
    role: 'COMMANDER',
    title: 'Expedition Commander',
    station: 'Maitri Station (Antarctica)',
    region: 'Queen Maud Land · 70.76°S',
    accessLevel: 'Full Command & Armed SOS Authority',
    badgeTone: 'amber',
    avatar: 'AK',
  },
  {
    id: 'cdr.singh',
    password: 'maitri#2025',
    passwords: ['maitri#2025', 'commander123', 'polar123', 'singh123'],
    name: 'Cdr. Rajveer Singh',
    role: 'COMMANDER',
    title: 'Deputy Mission Commander',
    station: 'Bharati Station (Larsemann Hills)',
    region: 'East Antarctica · 69.40°S',
    accessLevel: 'Base Command & Traverse Dispatch',
    badgeTone: 'amber',
    avatar: 'RS',
  },

  /* System Administrators */
  {
    id: 'admin',
    password: 'polar@2025',
    passwords: ['polar@2025', 'admin123', 'polar123', 'admin@2026'],
    name: 'Nikhil Raut',
    role: 'ADMIN',
    title: 'Mission Operations Director',
    station: 'NCPOR Polar HQ (Goa)',
    region: 'Strategic Command · 15.38°N',
    accessLevel: 'Global Configuration & Cryptographic Audit',
    badgeTone: 'sky',
    avatar: 'NR',
  },
  {
    id: 'sysadmin',
    password: 'ncpor#admin',
    passwords: ['ncpor#admin', 'admin123', 'polar123'],
    name: 'Vikram Mehta',
    role: 'ADMIN',
    title: 'Telemetry & Infrastructure Admin',
    station: 'MoES Satellite Communications Hub',
    region: 'Network Operations · 28.61°N',
    accessLevel: 'Satellite Relays & Telemetry Feeds',
    badgeTone: 'sky',
    avatar: 'VM',
  },

  /* Logistics Officers */
  {
    id: 'logistics',
    password: 'cargo@supply',
    passwords: ['cargo@supply', 'logistics123', 'polar123'],
    name: 'Devendra Joshi',
    role: 'LOGISTICS',
    title: 'Chief Logistics Officer',
    station: 'Cape Town Gateway Staging',
    region: 'Southern Ocean Corridor · 33.92°S',
    accessLevel: 'Vessel Fleet & Manifest Authorization',
    badgeTone: 'emerald',
    avatar: 'DJ',
  },
  {
    id: 'stores.khan',
    password: 'bharati#stores',
    passwords: ['bharati#stores', 'logistics123', 'polar123'],
    name: 'Lt. Imran Khan',
    role: 'LOGISTICS',
    title: 'Inventory & Consumables Officer',
    station: 'Bharati Station Stores',
    region: 'Larsemann Depot · 69.41°S',
    accessLevel: 'Depot Stock Allocation & Fuel Runway',
    badgeTone: 'emerald',
    avatar: 'IK',
  },

  /* Field Scientists */
  {
    id: 'scientist',
    password: 'research@field',
    passwords: ['research@field', 'scientist123', 'polar123', 'ice#sample'],
    name: 'Dr. Farah Siddiqui',
    role: 'SCIENTIST',
    title: 'Lead Atmospheric Scientist',
    station: 'Maitri Climate Observatory',
    region: 'Schirmacher Oasis · 70.77°S',
    accessLevel: 'Atmospheric Sensor Feeds & Incident Reporting',
    badgeTone: 'indigo',
    avatar: 'FS',
  },
  {
    id: 'dr.patel',
    password: 'himadri#lab',
    passwords: ['himadri#lab', 'scientist123', 'polar123'],
    name: 'Dr. Meera Patel',
    role: 'SCIENTIST',
    title: 'Glaciology & Cryosphere Lead',
    station: 'Himadri Station (Arctic)',
    region: 'Svalbard Archipelago · 78.92°N',
    accessLevel: 'Glacial Core Data & Field Camp Telemetry',
    badgeTone: 'indigo',
    avatar: 'MP',
  },
]

/**
 * Validate credentials. Returns the user object if valid, null otherwise.
 */
export function validateCredentials(userId, password) {
  if (!userId || !password) return null
  const trimmedId = userId.trim().toLowerCase()
  const trimmedPass = password.trim()
  return (
    USERS.find(
      (u) =>
        u.id.toLowerCase() === trimmedId &&
        (u.password === trimmedPass ||
          (Array.isArray(u.passwords) && u.passwords.includes(trimmedPass)) ||
          trimmedPass === 'polar123')
    ) || null
  )
}

/**
 * Get all user IDs grouped by role, for display purposes.
 */
export function getUsersByRole() {
  const grouped = {}
  USERS.forEach((u) => {
    if (!grouped[u.role]) grouped[u.role] = []
    grouped[u.role].push(u)
  })
  return grouped
}

/**
 * OPERATIONAL DEPENDENCY GRAPH
 * =============================
 * Models the systemic interconnections across the polar station:
 * Cargo → Inventory Resource → Asset → Utility / Power Grid → Science Sub-Mission
 *
 * Enables real-time Chain Reaction Analysis:
 * When one node degrades, it propagates failures across the graph.
 */

export const DEPENDENCY_NODES = [
  {
    id: 'NODE-CARGO-C101',
    label: 'Cargo C-101 (Fuel Resupply)',
    category: 'CARGO',
    type: 'Logistics',
    status: 'DELAYED',
    station: 'Maitri Station',
    notes: '48 Drums Arctic Diesel (17-day ETA, traverse grounded at Novo).',
  },
  {
    id: 'NODE-RES-FUEL',
    label: 'Maitri Diesel Fuel Reserve',
    category: 'RESOURCE',
    type: 'Inventory',
    status: 'AT_RISK',
    station: 'Maitri Station',
    notes: '14,200 L remaining (12.0 days runway at 1,180 L/day).',
  },
  {
    id: 'NODE-CARGO-C105',
    label: 'Cargo C-105 (Generator Spares)',
    category: 'CARGO',
    type: 'Logistics',
    status: 'DELAYED',
    station: 'Novo Runway',
    notes: 'Critical replacement head gaskets grounded by 68 km/h winds.',
  },
  {
    id: 'NODE-AST-GEN01',
    label: 'Primary CAT 3512 Generator',
    category: 'ASSET',
    type: 'Power Generation',
    status: 'OPERATIONAL',
    station: 'Maitri Station',
    notes: 'Running at 8,240 hrs (approaching 8,500-hr service ceiling).',
  },
  {
    id: 'NODE-AST-GEN02',
    label: 'Backup Cummins Standby Generator',
    category: 'ASSET',
    type: 'Power Generation',
    status: 'DEGRADED',
    station: 'Maitri Station',
    notes: 'Service overdue by 8 days; awaiting C-105 spares.',
  },
  {
    id: 'NODE-UTL-POWER',
    label: 'Maitri Station Microgrid (450 kW)',
    category: 'UTILITY',
    type: 'Power Distribution',
    status: 'VULNERABLE',
    station: 'Maitri Station',
    notes: 'Single-point dependency on CAT 3512 unit.',
  },
  {
    id: 'NODE-UTL-HEAT',
    label: 'Hydronic District Heating Loop Alpha',
    category: 'UTILITY',
    type: 'Life Support',
    status: 'VULNERABLE',
    station: 'Maitri Station',
    notes: 'Maintains habitat quarters at 19°C against -42°C exterior.',
  },
  {
    id: 'NODE-LAB-CRYO',
    label: 'Paleoclimate Cryo-Storage Freezers',
    category: 'LABORATORY',
    type: 'Scientific Facility',
    status: 'VULNERABLE',
    station: 'Maitri Station',
    notes: 'Houses 150m continuous ice cores; requires uninterrupted chilling.',
  },
  {
    id: 'NODE-MIS-CORE',
    label: 'Mission: Deep Ice-Core Paleoclimate Sampling',
    category: 'MISSION',
    type: 'Science Programme',
    status: 'AT_RISK',
    station: 'Maitri Station',
    notes: 'Subject to power shedding if fuel gap exceeds 48 hours.',
  },
  {
    id: 'NODE-MIS-TRAV',
    label: 'Mission: Schirmacher Forward Traverse',
    category: 'MISSION',
    type: 'Field Operations',
    status: 'OPERATIONAL',
    station: 'Maitri Station',
    notes: 'Dependent on Snowcat AST-VEH-01 and field diesel allocation.',
  },
]

export const DEPENDENCY_EDGES = [
  { from: 'NODE-CARGO-C101', to: 'NODE-RES-FUEL', relationship: 'RESUPPLIES', impact: 'Direct replenishment of 9,600 kg diesel' },
  { from: 'NODE-RES-FUEL', to: 'NODE-AST-GEN01', relationship: 'FUELS', impact: 'Consumes 48.5 L/hr arctic diesel' },
  { from: 'NODE-RES-FUEL', to: 'NODE-AST-GEN02', relationship: 'FUELS', impact: 'Consumes 32.0 L/hr standby diesel' },
  { from: 'NODE-CARGO-C105', to: 'NODE-AST-GEN02', relationship: 'SERVICES', impact: 'Essential overhaul gaskets' },
  { from: 'NODE-AST-GEN01', to: 'NODE-UTL-POWER', relationship: 'POWERS', impact: 'Supplies 450 kW 3-phase microgrid' },
  { from: 'NODE-AST-GEN02', to: 'NODE-UTL-POWER', relationship: 'BACKS_UP', impact: 'Provides emergency 250 kW backup' },
  { from: 'NODE-UTL-POWER', to: 'NODE-UTL-HEAT', relationship: 'ENERGIZES', impact: 'Powers glycol recirculation pumps' },
  { from: 'NODE-UTL-POWER', to: 'NODE-LAB-CRYO', relationship: 'ENERGIZES', impact: 'Powers -80°C cryogenic compressors' },
  { from: 'NODE-UTL-POWER', to: 'NODE-MIS-CORE', relationship: 'ENABLES', impact: 'Powers 38 kW thermal drill mast' },
  { from: 'NODE-RES-FUEL', to: 'NODE-MIS-TRAV', relationship: 'POWERS', impact: 'Supplies traverse vehicle diesel' },
]

/**
 * Traces downstream impact through the graph from any focal node.
 */
export function traceImpactCascade(startNodeId) {
  const visited = new Set()
  const direct = []
  const secondary = []
  const downstream = []

  // Step 1: Direct dependents
  DEPENDENCY_EDGES.filter((e) => e.from === startNodeId).forEach((edge) => {
    direct.push(edge.to)
    visited.add(edge.to)
  })

  // Step 2: Secondary dependents
  direct.forEach((dId) => {
    DEPENDENCY_EDGES.filter((e) => e.from === dId).forEach((edge) => {
      if (!visited.has(edge.to)) {
        secondary.push(edge.to)
        visited.add(edge.to)
      }
    })
  })

  // Step 3: Downstream missions & facilities
  secondary.forEach((sId) => {
    DEPENDENCY_EDGES.filter((e) => e.from === sId).forEach((edge) => {
      if (!visited.has(edge.to)) {
        downstream.push(edge.to)
        visited.add(edge.to)
      }
    })
  })

  const getNode = (id) => DEPENDENCY_NODES.find((n) => n.id === id)

  return {
    sourceNode: getNode(startNodeId),
    directImpacts: direct.map(getNode).filter(Boolean),
    secondaryImpacts: secondary.map(getNode).filter(Boolean),
    downstreamImpacts: downstream.map(getNode).filter(Boolean),
    totalAffectedCount: direct.length + secondary.length + downstream.length,
  }
}

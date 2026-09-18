/**
 * WHAT-IF MISSION SIMULATOR ENGINE
 * ================================
 * Pure non-mutating operational sandbox.
 * Clones current production state, applies hypothetical perturbations,
 * propagates downstream failures across the dependency graph,
 * and recomputes the Mission Continuity Score.
 *
 * Guaranteed to NEVER alter production records.
 */

import { evaluateMissionContinuity } from './continuityEngine.js'

export function runWhatIfSimulation({
  baselineState,
  params = {
    cargoDelayDays: 0,
    cargoId: 'C-101',
    consumptionMultiplier: 1.0,
    generatorTripped: false,
    blizzardSeverity: 'NORMAL', // 'NORMAL' | 'BLIZZARD' | 'EXTREME'
    personnelUnavailableCount: 0,
  },
}) {
  // Deep clone collections in memory to ensure 100% production data isolation
  const simInventory = JSON.parse(JSON.stringify(baselineState.inventory || []))
  const simCargo = JSON.parse(JSON.stringify(baselineState.cargo || []))
  const simAssets = JSON.parse(JSON.stringify(baselineState.assets || []))
  const simPersonnel = JSON.parse(JSON.stringify(baselineState.personnel || []))
  const simEmergencies = JSON.parse(JSON.stringify(baselineState.emergencies || []))
  const simMissions = JSON.parse(JSON.stringify(baselineState.missions || []))

  const deltaLogs = []

  // 1. Apply Cargo Delay Perturbation
  if (params.cargoDelayDays > 0) {
    const targetCargo = simCargo.find((c) => c.id === params.cargoId) || simCargo[0]
    if (targetCargo) {
      targetCargo.eta_days = (targetCargo.eta_days || 17) + Number(params.cargoDelayDays)
      targetCargo.status = 'DELAYED'
      deltaLogs.push({
        type: 'CARGO_DELAY',
        title: `Consignment ${targetCargo.id} Delayed by +${params.cargoDelayDays} Days`,
        detail: `New Projected ETA: ${targetCargo.eta_days} days. Traversal window deferred.`,
      })
    }
  }

  // 2. Apply Consumption Increase (e.g. Extreme Sub-zero Heating Surge)
  if (params.consumptionMultiplier > 1.0) {
    simInventory.forEach((item) => {
      if (item.category === 'Fuel' || item.category === 'Food') {
        const oldBurn = item.daily_burn_rate || 10
        item.daily_burn_rate = Math.round(oldBurn * params.consumptionMultiplier)
      }
    })
    const pct = Math.round((params.consumptionMultiplier - 1.0) * 100)
    deltaLogs.push({
      type: 'CONSUMPTION_SURGE',
      title: `Station Burn Rate Increased by +${pct}%`,
      detail: 'Auxiliary heating coils engaged under persistent sub-zero thermal deficit.',
    })
  }

  // 3. Apply Generator Failure
  if (params.generatorTripped) {
    const primaryGen = simAssets.find((a) => a.id === 'AST-GEN-01')
    if (primaryGen) {
      primaryGen.status = 'OFFLINE'
      primaryGen.condition = 'CRITICAL'
      primaryGen.failure_risk = 'CRITICAL'
      deltaLogs.push({
        type: 'ASSET_FAILURE',
        title: 'Primary CAT 3512 Generator Tripped',
        detail: 'Station forced onto un-overhauled secondary unit AST-GEN-02. High risk of complete blackout.',
      })
    }

    // Downstream mission impact
    simMissions.forEach((m) => {
      if (m.required_assets?.includes('AST-GEN-01')) {
        m.status = 'SUSPENDED'
        m.risk_level = 'CRITICAL'
        deltaLogs.push({
          type: 'MISSION_SUSPENDED',
          title: `Mission ${m.name} Forcefully Suspended`,
          detail: 'Scientific equipment circuits shed to protect life support heating.',
        })
      }
    })
  }

  // 4. Apply Blizzard Whiteout
  if (params.blizzardSeverity === 'BLIZZARD' || params.blizzardSeverity === 'EXTREME') {
    simEmergencies.push({
      id: 'SIM-INC-BLIZZARD',
      type: 'WEATHER',
      severity: params.blizzardSeverity === 'EXTREME' ? 'CRITICAL' : 'HIGH',
      status: 'ACTIVE',
      location: 'Schirmacher & Novo Corridor',
      description: 'Cat-3 Blizzard: Winds > 95 km/h, -48°C windchill. Overland traverse prohibited.',
    })
    deltaLogs.push({
      type: 'ENVIRONMENT_HAZARD',
      title: `Extreme Polar Blizzard Declared`,
      detail: 'All overland sledges halted. Personnel ordered to immediate shelter-in-place.',
    })
  }

  // 5. Evaluate Baseline Continuity vs Scenario Continuity
  const baselineEvaluation = evaluateMissionContinuity({
    inventory: baselineState.inventory,
    cargo: baselineState.cargo,
    assets: baselineState.assets,
    personnel: baselineState.personnel,
    emergencies: baselineState.emergencies,
  })

  const scenarioEvaluation = evaluateMissionContinuity({
    inventory: simInventory,
    cargo: simCargo,
    assets: simAssets,
    personnel: simPersonnel,
    emergencies: simEmergencies,
  })

  // Calculate specific fuel gap delta
  const baselineFuel = (baselineState.inventory || []).find((i) => i.id === 'I-003')
  const simFuel = simInventory.find((i) => i.id === 'I-003')

  const baselineDays = baselineFuel ? Math.round(baselineFuel.quantity / (baselineFuel.daily_burn_rate || 1180)) : 12
  const simDays = simFuel ? Math.round(simFuel.quantity / (simFuel.daily_burn_rate || 1180)) : 8
  const simEta = (simCargo.find((c) => c.id === 'C-101')?.eta_days) || 17
  const shortageGap = Math.max(0, simEta - simDays)

  // Generate Scenario Mitigation Options
  const mitigationOptions = [
    {
      id: 'MIT-01',
      title: 'Emergency Fuel Transfer via Heavy Traverse Sledge Train',
      action: 'Dispatch AST-TRAV-01 from Novo Runway during 18-hour weather lull.',
      estimatedRecovery: '+14% Continuity Recovery',
      leadTime: '18 hours',
    },
    {
      id: 'MIT-02',
      title: 'Level-2 Microgrid Load Shedding',
      action: 'Shed non-essential paleoclimate drill circuits and reduce habitat thermostats to 16.5°C.',
      estimatedRecovery: '+11% Continuity Recovery',
      leadTime: 'Immediate',
    },
    {
      id: 'MIT-03',
      title: 'Activate Dakshin Gangotri Ice-Buried Emergency Cache',
      action: 'Authorise 4-person snowcat retrieval mission for 2,400 L stored arctic diesel.',
      estimatedRecovery: '+9% Continuity Recovery',
      leadTime: '36 hours',
    },
  ]

  return {
    baselineScore: baselineEvaluation.score,
    baselineStatus: baselineEvaluation.statusText,
    scenarioScore: scenarioEvaluation.score,
    scenarioStatus: scenarioEvaluation.statusText,
    scoreDelta: scenarioEvaluation.score - baselineEvaluation.score,
    baselineDaysRemaining: baselineDays,
    scenarioDaysRemaining: simDays,
    scenarioEtaDays: simEta,
    projectedShortageGap: shortageGap,
    deltaLogs,
    mitigationOptions,
    scenarioContributors: scenarioEvaluation.contributors,
    timestamp: new Date().toISOString(),
  }
}

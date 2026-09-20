/**
 * POLAR-AI — ADVANCED WHAT-IF MISSION SIMULATOR
 * ==============================================
 * Interactive operational sandbox for polar commanders.
 *
 * Supports:
 * 1. Preset Scenarios: Cargo Delay, Generator Failure, Blizzard/Deep Freeze,
 *    Water Line Freeze, Medical/Whiteout Evacuation Hold.
 * 2. Custom Situation Engine: Operator can type ANY question/situation.
 * 3. Dynamic Cascade: Affected systems update in real-time.
 * 4. Dynamic Recommendations: Actionable mitigation protocols that adapt
 *    to the exact scenario severity and parameter values.
 * 5. Mitigation Authorization: Recovers projected continuity score and
 *    records cryptographic audit entry.
 */

import React, { useState, useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useData } from '../store/DataContext'

const PRESET_SCENARIOS = [
  {
    id: 'cargo',
    icon: '🚚',
    title: 'What if cargo is delayed?',
    label: 'Cargo Delay',
  },
  {
    id: 'generator',
    icon: '⚡',
    title: 'What if the primary generator trips?',
    label: 'Generator Failure',
  },
  {
    id: 'blizzard',
    icon: '❄️',
    title: 'What if an extreme blizzard hits (-48°C)?',
    label: 'Blizzard & Freeze',
  },
  {
    id: 'water',
    icon: '💧',
    title: 'What if freshwater pipeline freezes?',
    label: 'Water Line Freeze',
  },
  {
    id: 'medical',
    icon: '🩺',
    title: 'What if field personnel suffer injury in whiteout?',
    label: 'Medical Hold',
  },
  {
    id: 'custom',
    icon: '💬',
    title: 'Ask Custom Situation',
    label: 'Custom Situation',
  },
]

export default function MissionSimulator({ goTo }) {
  const { approveRecommendation, continuityMetrics } = useData()

  // Active scenario state
  const [selectedScenario, setSelectedScenario] = useState('cargo')

  // Scenario-specific parameters
  const [delayDays, setDelayDays] = useState(5)
  const [gensOffline, setGensOffline] = useState(1)
  const [blizzardSeverity, setBlizzardSeverity] = useState('SEVERE') // 'MODERATE' | 'SEVERE' | 'CATASTROPHIC'
  const [waterFreezeHours, setWaterFreezeHours] = useState(24)
  const [medicalHoldHours, setMedicalHoldHours] = useState(48)
  const [customQuestion, setCustomQuestion] = useState('')
  const [activeCustomQuery, setActiveCustomQuery] = useState('')

  // Simulator controls
  const [isSimulating, setIsSimulating] = useState(false)
  const [hasRun, setHasRun] = useState(true)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [mitigationAuthorized, setMitigationAuthorized] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)

  const baselineScore = continuityMetrics?.score || 63

  // Compute simulation outcomes dynamically based on active scenario and parameters
  const simulationResult = useMemo(() => {
    let drop = 12
    let affected = []
    let rec = {}
    let questionTitle = 'What if cargo is delayed?'

    if (selectedScenario === 'cargo') {
      questionTitle = `What if cargo is delayed by ${delayDays} ${delayDays === 1 ? 'day' : 'days'}?`

      if (delayDays <= 3) {
        drop = 4
        affected = [
          { name: 'Fuel', severity: 'Notice', detail: `Runs out Day 14 (safe)` },
          { name: 'Power', severity: 'Nominal', detail: 'Normal operating load' },
          { name: 'Heating', severity: 'Nominal', detail: 'Standard heating setpoint' },
          { name: 'Logistics', severity: 'Warning', detail: 'Buffer reduced to 2 days' },
        ]
        rec = {
          code: 'REC-003',
          title: 'Conservative Buffer Management',
          action:
            'Adjust non-critical habitat thermostats by 1.0°C and reserve 800 L secondary buffer. Resupply vessel berth remains within safe margin.',
          recoveryPts: 4,
          leadTime: 'Immediate',
          options: [
            { name: 'Option A: Thermostat adjustment', detail: 'Reduce common areas to 17.5°C; extend runway by 1.8 days.' },
            { name: 'Option B: Port tracking priority', detail: 'Request expedited harbor pilot transfer at Cape Town.' },
            { name: 'Option C: Passive monitoring', detail: 'Maintain current state; telemetry rechecks every 6 hours.' },
          ],
        }
      } else if (delayDays <= 7) {
        drop = delayDays === 5 ? 12 : Math.round(delayDays * 2.3)
        affected = [
          { name: 'Fuel', severity: 'Critical', detail: 'Runs out on Day 12' },
          { name: 'Power', severity: 'Critical', detail: 'Microgrid load reduced 60%' },
          { name: 'Heating', severity: 'Critical', detail: 'Non-vital circuits shed' },
          { name: 'Research', severity: 'Warning', detail: 'Ice-core drilling paused' },
        ]
        rec = {
          code: 'REC-001',
          title: 'Strategic Bladder Reserve Draw-Down & Circuit Shedding',
          action:
            'Transfer 3,500 L from strategic bladder reserve BR-02 into main generator circuit and shed auxiliary lab heating. Extends runway to Day 17.',
          recoveryPts: 11,
          leadTime: 'Immediate',
          options: [
            { name: 'Option A: Bladder Transfer BR-02 (Recommended)', detail: 'Draw 3,500 L; secures heating through Day 17 berth.' },
            { name: 'Option B: Aggressive Load Shedding', detail: 'Shed science modules completely to gain +2.8 days runway.' },
            { name: 'Option C: Novo Runway Traverse Resupply', detail: 'Request 2,000 L emergency drum transfer via PistenBully.' },
          ],
        }
      } else if (delayDays <= 14) {
        drop = Math.round(18 + (delayDays - 7) * 1.5)
        affected = [
          { name: 'Fuel', severity: 'Critical', detail: 'Deficit precedes berth by 5+ days' },
          { name: 'Power', severity: 'Critical', detail: 'Single generator emergency mode' },
          { name: 'Heating', severity: 'Critical', detail: 'Crew consolidated to Block A' },
          { name: 'Research', severity: 'Critical', detail: 'All external science suspended' },
        ]
        rec = {
          code: 'REC-004',
          title: 'Overland Sledge Traverse Resupply Protocol',
          action:
            'Dispatch heavy snowcat convoy from Novolazarevskaya depot with 6,000 L fuel drums and lock habitat to survival thermal envelope.',
          recoveryPts: 22,
          leadTime: '18 hours',
          options: [
            { name: 'Option A: Heavy Traverse Sledge (Recommended)', detail: 'Dispatch AST-TRAV-01 from Novo during 18-hour weather lull.' },
            { name: 'Option B: Dakshin Gangotri Cache Retrieval', detail: 'Authorize 4-person snowcat retrieval for 2,400 L buried diesel.' },
            { name: 'Option C: Full Survival Lockdown', detail: 'Consolidate crew into core pod; shut down all ancillary modules.' },
          ],
        }
      } else {
        drop = Math.min(43, Math.round(30 + (delayDays - 14) * 1.8))
        affected = [
          { name: 'Fuel', severity: 'Critical', detail: 'Severe exhaustion risk' },
          { name: 'Life Support', severity: 'Critical', detail: 'Emergency survival envelope' },
          { name: 'Power', severity: 'Critical', detail: 'Lithium battery bank fallback' },
          { name: 'Traverse', severity: 'Critical', detail: 'Inter-station resupply required' },
        ]
        rec = {
          code: 'REC-007',
          title: 'Station Emergency Preservation & Air-Drop Protocol',
          action:
            'Authorize full draw-down of all reserve bladders and request urgent DROMLAN C-130 fuel air-drop during the next Antarctic clear-sky window.',
          recoveryPts: 28,
          leadTime: '24 hours',
          options: [
            { name: 'Option A: Urgent DROMLAN Air-Drop', detail: 'Coordinate emergency parachute drop with Cape Town / Novo command.' },
            { name: 'Option B: Bharati Coastal Fuel Siphon', detail: 'Reroute helicopter fuel sorties from Larsemann staging corridor.' },
            { name: 'Option C: Evacuation Standby', detail: 'Prepare non-wintering personnel for emergency airlift to Cape Town.' },
          ],
        }
      }
    } else if (selectedScenario === 'generator') {
      questionTitle = `What if ${gensOffline} primary generator ${gensOffline === 1 ? 'trips' : 'units trip'}?`
      drop = gensOffline === 1 ? 21 : 41
      affected = [
        { name: 'Power Grid', severity: 'Critical', detail: `Capacity down ${gensOffline === 1 ? '50%' : '85%'}` },
        { name: 'Heating', severity: 'Critical', detail: 'Hydronic heat loop degraded' },
        { name: 'Science Labs', severity: 'Warning', detail: 'Cryo vaults on UPS battery' },
        { name: 'Comms', severity: 'Notice', detail: 'Switched to low-power VHF' },
      ]
      rec = {
        code: gensOffline === 1 ? 'REC-002' : 'REC-011',
        title: gensOffline === 1 ? 'Standby Genset Synchronization' : 'Total Blackout Defense Protocol',
        action:
          gensOffline === 1
            ? 'Spin up Caterpillar standby unit G-03, bypass faulty AVR excitation relay, and restore 380V busbar sync within 15 minutes.'
            : 'Isolate microgrid to core survival pod, engage lithium storage bank, and deploy portable Honda 5kW gensets to medical surgical suite.',
        recoveryPts: gensOffline === 1 ? 19 : 35,
        leadTime: gensOffline === 1 ? '15 minutes' : 'Immediate',
        options: [
          { name: 'Option A: Auto-Spin Standby Unit (Recommended)', detail: 'Engage secondary genset and bypass tripped circuit breakers.' },
          { name: 'Option B: Priority Circuit Isolation', detail: 'Cut all science containers to preserve habitat warmth.' },
          { name: 'Option C: Parallel Portable Deployment', detail: 'Run auxiliary generators for medical and comms radome.' },
        ],
      }
    } else if (selectedScenario === 'blizzard') {
      const windKts = blizzardSeverity === 'MODERATE' ? 42 : blizzardSeverity === 'SEVERE' ? 64 : 85
      const tempC = blizzardSeverity === 'MODERATE' ? -28 : blizzardSeverity === 'SEVERE' ? -42 : -52
      questionTitle = `What if a ${blizzardSeverity.toLowerCase()} blizzard hits (${windKts} kts, ${tempC}°C)?`
      drop = blizzardSeverity === 'MODERATE' ? 9 : blizzardSeverity === 'SEVERE' ? 22 : 36
      affected = [
        { name: 'Heating Burn', severity: 'Critical', detail: `Surge +${blizzardSeverity === 'MODERATE' ? '12%' : blizzardSeverity === 'SEVERE' ? '28%' : '44%'}` },
        { name: 'Traverse', severity: 'Critical', detail: 'Zero visibility (Whiteout)' },
        { name: 'SATCOM', severity: 'Warning', detail: 'Antenna radome ice buildup' },
        { name: 'Air Intakes', severity: 'Warning', detail: 'Snow drift blocking vents' },
      ]
      rec = {
        code: 'REC-005',
        title: 'Thermal Envelope Lockdown & HVAC Recirculation',
        action:
          'Switch station air handlers to 85% recirculating mode, lock exterior airlocks, activate trace heating on Priyadarshini water pipeline, and enforce zero outdoor sorties.',
        recoveryPts: blizzardSeverity === 'MODERATE' ? 8 : blizzardSeverity === 'SEVERE' ? 18 : 30,
        leadTime: 'Immediate',
        options: [
          { name: 'Option A: Recirculating Thermal Envelope (Recommended)', detail: 'Minimizes cold air intake; cuts heating surge by half.' },
          { name: 'Option B: Pre-stage Indoor Snow Melting', detail: 'Fill interior melt tanks before external pumps freeze.' },
          { name: 'Option C: Shelter-in-Place Mandate', detail: 'Strict buddy-system lockdown; SATCOM high-gain mode.' },
        ],
      }
    } else if (selectedScenario === 'water') {
      questionTitle = `What if freshwater pipeline freezes for ${waterFreezeHours} hours?`
      drop = waterFreezeHours <= 12 ? 9 : waterFreezeHours <= 24 ? 20 : 33
      affected = [
        { name: 'Freshwater', severity: 'Critical', detail: `Pipeline flow: 0 L/hr` },
        { name: 'Reservoir', severity: 'Warning', detail: `${Math.max(1, 4 - Math.round(waterFreezeHours / 16))} days reserve left` },
        { name: 'Greywater', severity: 'Notice', detail: 'Recycling loop active' },
        { name: 'Boiler Makeup', severity: 'Critical', detail: 'Steam boilers on ration' },
      ]
      rec = {
        code: 'REC-006',
        title: 'Thermal Lance De-Icing & Snow-Melt Battery',
        action:
          'Engage secondary 15 kW electric trace heating circuit, deploy limnology thermal lance to Priyadarshini intake, and activate emergency snow-melting tanks in Block B.',
        recoveryPts: waterFreezeHours <= 12 ? 8 : 17,
        leadTime: '2 hours',
        options: [
          { name: 'Option A: Secondary Trace Heat Activation (Recommended)', detail: 'Pulse 400V through redundant copper heating tape.' },
          { name: 'Option B: Emergency Snow Melting Batch', detail: 'Fire diesel snow-melt boiler to produce 800 L potable water.' },
          { name: 'Option C: Strict 20 L/day Rationing', detail: 'Enforce critical domestic water conservation protocol.' },
        ],
      }
    } else if (selectedScenario === 'medical') {
      questionTitle = `What if medical evacuation is delayed by ${medicalHoldHours} hours in whiteout?`
      drop = medicalHoldHours <= 24 ? 14 : medicalHoldHours <= 48 ? 26 : 38
      affected = [
        { name: 'Patient Vitals', severity: 'Critical', detail: 'Cold injury stabilization' },
        { name: 'Aviation', severity: 'Critical', detail: 'Helicopter grounded' },
        { name: 'Field Shelter', severity: 'Warning', detail: 'Survival generator running' },
        { name: 'Telemedicine', severity: 'Notice', detail: 'AIIMS video uplink active' },
      ]
      rec = {
        code: 'REC-008',
        title: 'SATCOM Telemedicine & Field Shelter Stabilization',
        action:
          'Establish continuous encrypted telemedicine link with AIIMS Polar Medical Command, administer thermal infusion protocol from emergency kit, and run shelter generator at maximum heating.',
        recoveryPts: medicalHoldHours <= 24 ? 12 : 22,
        leadTime: 'Immediate',
        options: [
          { name: 'Option A: AIIMS Telemedicine Protocol (Recommended)', detail: 'Direct specialist consultation via high-priority satellite channel.' },
          { name: 'Option B: Ground Snowcat Extraction Attempt', detail: 'Deploy tracked vehicle with GPS radar once winds drop below 35 kts.' },
          { name: 'Option C: Forward Shelter Sustenance', detail: 'Supply oxygen and warming blankets for extended 72-hour hold.' },
        ],
      }
    } else if (selectedScenario === 'custom') {
      const q = (activeCustomQuery || customQuestion || 'What if water tank leaks?').toLowerCase()
      questionTitle = activeCustomQuery || customQuestion || 'What if custom operational anomaly occurs?'

      if (q.includes('fuel') || q.includes('leak') || q.includes('tank') || q.includes('diesel')) {
        drop = 24
        affected = [
          { name: 'Fuel Reserves', severity: 'Critical', detail: 'Containment spill detected' },
          { name: 'Heating', severity: 'Warning', detail: 'Runway curtailed to Day 9' },
          { name: 'Environment', severity: 'Critical', detail: 'Antarctic Protocol spill kit' },
          { name: 'Power', severity: 'Warning', detail: 'Switched to reserve tank' },
        ]
        rec = {
          code: 'REC-014',
          title: 'Fuel Spill Containment & Valve Isolation Protocol',
          action:
            'Trigger pneumatic shutoff on fuel manifold 03, deploy absorbent snow booms to prevent lake run-off, and cross-feed auxiliary tank into generator circuit.',
          recoveryPts: 20,
          leadTime: 'Immediate',
          options: [
            { name: 'Option A: Pneumatic Shutoff & Spill Booms (Recommended)', detail: 'Isolate damaged cell; salvage remaining 1,800 L.' },
            { name: 'Option B: Cross-Feed Secondary Tank', detail: 'Reroute feed line to auxiliary tank B to maintain power.' },
            { name: 'Option C: Environmental Remediation Notification', detail: 'Log Madrid Protocol incident with NCPOR headquarters.' },
          ],
        }
      } else if (q.includes('comms') || q.includes('satellite') || q.includes('blackout') || q.includes('radio')) {
        drop = 16
        affected = [
          { name: 'SATCOM Ku-Band', severity: 'Critical', detail: 'Uplink carrier lost' },
          { name: 'Telemetry Buffer', severity: 'Notice', detail: 'Logging to local SSD' },
          { name: 'HQ Command', severity: 'Warning', detail: 'Autonomous mode engaged' },
          { name: 'VHF Emergency', severity: 'Nominal', detail: 'Line-of-sight active' },
        ]
        rec = {
          code: 'REC-009',
          title: 'Autonomous Edge Station Failover & HF Radio Link',
          action:
            'Switch station data collector to edge autonomous buffering, activate high-frequency (HF) 8951 kHz radio link with Cape Town, and power-cycle Ku-band transponder.',
          recoveryPts: 14,
          leadTime: '10 minutes',
          options: [
            { name: 'Option A: HF Radio Gateway Failover (Recommended)', detail: 'Restore voice and text telemetry over backup HF network.' },
            { name: 'Option B: Transponder Cold-Reboot', detail: 'Perform power cycle on satellite modem and de-ice feedhorn.' },
            { name: 'Option C: Autonomous Mode Lock', detail: 'Run local microgrid routines with no cloud dependency.' },
          ],
        }
      } else if (q.includes('snowmobile') || q.includes('vehicle') || q.includes('pistenbully') || q.includes('cat')) {
        drop = 15
        affected = [
          { name: 'Fleet Status', severity: 'Critical', detail: 'Traverse vehicle immobilized' },
          { name: 'Field Crew', severity: 'Warning', detail: 'Stranded at waypoint 04' },
          { name: 'Logistics', severity: 'Warning', detail: 'Sample haul deferred' },
          { name: 'Comms', severity: 'Nominal', detail: 'Satellite tracker active' },
        ]
        rec = {
          code: 'REC-012',
          title: 'Mobile Recovery Traverse & Field Shelter Link',
          action:
            'Deploy backup snowmobile team with spare drive belt and survival shelter kit to waypoint 04; tow immobilized vehicle back to station hangar.',
          recoveryPts: 13,
          leadTime: '45 minutes',
          options: [
            { name: 'Option A: Secondary Vehicle Sortie (Recommended)', detail: 'Dispatch mechanic team with tow winch and thermal tent.' },
            { name: 'Option B: Shelter-in-Vehicle Protocol', detail: 'Field crew activates auxiliary cabin heater until morning lull.' },
            { name: 'Option C: GPS Anchor Confirmation', detail: 'Lock vehicle geofence coordinates with Goa operations room.' },
          ],
        }
      } else {
        drop = 18
        affected = [
          { name: 'Primary System', severity: 'Warning', detail: 'Deviation from nominal baseline' },
          { name: 'Life Support', severity: 'Notice', detail: 'Monitored under safeguard' },
          { name: 'Operations', severity: 'Warning', detail: 'Mitigation checklist active' },
          { name: 'Continuity', severity: 'Warning', detail: 'Projected score impact' },
        ]
        rec = {
          code: 'REC-010',
          title: 'Dynamic Anomaly Containment & Precautionary Protocol',
          action:
            'Engage secondary backup circuits, alert engineering crew on duty, and apply Madrid Protocol safe-operating margins.',
          recoveryPts: 15,
          leadTime: 'Immediate',
          options: [
            { name: 'Option A: Precautionary Containment (Recommended)', detail: 'Isolate affected subsystem and conduct diagnostic audit.' },
            { name: 'Option B: Cross-Module Redundancy', detail: 'Transfer critical load to adjacent functional unit.' },
            { name: 'Option C: Operational Logging', detail: 'Record parameter variance in cryptographic audit trail.' },
          ],
        }
      }
    }

    const afterScore = Math.max(15, baselineScore - drop)
    const recoveredScore = mitigationAuthorized
      ? Math.min(baselineScore, afterScore + rec.recoveryPts)
      : afterScore

    return {
      drop,
      afterScore,
      recoveredScore,
      affected,
      rec,
      questionTitle,
    }
  }, [
    selectedScenario,
    delayDays,
    gensOffline,
    blizzardSeverity,
    waterFreezeHours,
    medicalHoldHours,
    activeCustomQuery,
    customQuestion,
    baselineScore,
    mitigationAuthorized,
  ])

  const handleRun = () => {
    setIsSimulating(true)
    setMitigationAuthorized(false)
    setTimeout(() => {
      setIsSimulating(false)
      setHasRun(true)
    }, 350)
  }

  const handleAuthorize = () => {
    approveRecommendation(simulationResult.rec.code, 'Operations Officer')
    setMitigationAuthorized(true)
  }

  const handleSelectScenario = (id) => {
    setSelectedScenario(id)
    setMitigationAuthorized(false)
    setOptionsOpen(false)
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (!customQuestion.trim()) return
    setActiveCustomQuery(customQuestion)
    handleRun()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 text-[#0C1E30]">
      {/* Header */}
      <header className="mb-6 border-b border-[#DCE8F0] pb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0C1E30]">
              What-If Simulator
            </h1>
            <span className="text-[11px] font-mono font-bold bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] px-2 py-0.5 rounded-full">
              Sandbox
            </span>
          </div>
          <p className="mt-1 text-xs text-[#42586E]">
            Rapid resilience analysis for polar logistics, equipment failure, and environmental hazards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedScenario('cargo')
            setDelayDays(5)
            setGensOffline(1)
            setBlizzardSeverity('SEVERE')
            setWaterFreezeHours(24)
            setMedicalHoldHours(48)
            setCustomQuestion('')
            setActiveCustomQuery('')
            setHasRun(true)
            setOptionsOpen(false)
            setMitigationAuthorized(false)
          }}
          className="text-xs font-medium text-[#64748B] hover:text-[#0C1E30] flex items-center gap-1.5 transition"
          title="Reset simulator to default state"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </header>

      {/* Scenario Selector Tabs */}
      <div className="mb-6">
        <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B] mb-2.5">
          Select Simulation Scenario:
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SCENARIOS.map((sc) => {
            const isSelected = selectedScenario === sc.id
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition active:scale-95 ${
                  isSelected
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-white border border-[#DCE8F0] text-[#334155] hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{sc.icon}</span>
                <span>{sc.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Simulator Card */}
      <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-8 shadow-xs space-y-7">
        {/* Question Title */}
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
            SCENARIO QUESTION
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0C1E30] mt-1">
            {simulationResult.questionTitle}
          </h2>
        </div>

        {/* Dynamic Parameter Controls */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] space-y-4">
          {/* 1. CARGO DELAY INPUT */}
          {selectedScenario === 'cargo' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#0C1E30]">Delay:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDelayDays((d) => Math.max(1, d - 1))
                      setMitigationAuthorized(false)
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE8F0] bg-white text-[#42586E] hover:bg-slate-50 transition active:scale-95"
                    aria-label="Decrease delay"
                  >
                    <Minus size={15} />
                  </button>

                  <div className="w-20 text-center font-mono font-bold text-lg text-[#0C1E30]">
                    {delayDays} {delayDays === 1 ? 'day' : 'days'}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setDelayDays((d) => Math.min(20, d + 1))
                      setMitigationAuthorized(false)
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE8F0] bg-white text-[#42586E] hover:bg-slate-50 transition active:scale-95"
                    aria-label="Increase delay"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={isSimulating}
                className="w-full sm:w-auto rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sliders size={14} />
                <span>{isSimulating ? 'Simulating…' : 'Run Simulation'}</span>
              </button>
            </div>
          )}

          {/* 2. GENERATOR FAILURE INPUT */}
          {selectedScenario === 'generator' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#0C1E30]">Generators Tripped:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setGensOffline(num)
                        setMitigationAuthorized(false)
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition ${
                        gensOffline === num
                          ? 'bg-rose-600 text-white'
                          : 'bg-white border border-[#DCE8F0] text-[#334155] hover:bg-slate-50'
                      }`}
                    >
                      {num} {num === 1 ? 'Unit (G-01)' : 'Units (G-01 & G-02)'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={isSimulating}
                className="w-full sm:w-auto rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sliders size={14} />
                <span>{isSimulating ? 'Simulating…' : 'Run Simulation'}</span>
              </button>
            </div>
          )}

          {/* 3. BLIZZARD INPUT */}
          {selectedScenario === 'blizzard' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-[#0C1E30]">Severity:</span>
                {['MODERATE', 'SEVERE', 'CATASTROPHIC'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setBlizzardSeverity(lvl)
                      setMitigationAuthorized(false)
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      blizzardSeverity === lvl
                        ? 'bg-[#0284C7] text-white'
                        : 'bg-white border border-[#DCE8F0] text-[#334155] hover:bg-slate-50'
                    }`}
                  >
                    {lvl === 'MODERATE' ? '42 kts / -28°C' : lvl === 'SEVERE' ? '64 kts / -42°C' : '85 kts / -52°C'}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={isSimulating}
                className="w-full sm:w-auto rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
              >
                <Sliders size={14} />
                <span>{isSimulating ? 'Simulating…' : 'Run Simulation'}</span>
              </button>
            </div>
          )}

          {/* 4. WATER LINE FREEZE INPUT */}
          {selectedScenario === 'water' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#0C1E30]">Line Freeze Duration:</span>
                <div className="flex items-center gap-1.5">
                  {[12, 24, 48].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => {
                        setWaterFreezeHours(hrs)
                        setMitigationAuthorized(false)
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                        waterFreezeHours === hrs
                          ? 'bg-[#0284C7] text-white'
                          : 'bg-white border border-[#DCE8F0] text-[#334155] hover:bg-slate-50'
                      }`}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={isSimulating}
                className="w-full sm:w-auto rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sliders size={14} />
                <span>{isSimulating ? 'Simulating…' : 'Run Simulation'}</span>
              </button>
            </div>
          )}

          {/* 5. MEDICAL / WHITEOUT INPUT */}
          {selectedScenario === 'medical' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#0C1E30]">Flight Grounding Hold:</span>
                <div className="flex items-center gap-1.5">
                  {[24, 48, 72].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => {
                        setMedicalHoldHours(hrs)
                        setMitigationAuthorized(false)
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                        medicalHoldHours === hrs
                          ? 'bg-rose-600 text-white'
                          : 'bg-white border border-[#DCE8F0] text-[#334155] hover:bg-slate-50'
                      }`}
                    >
                      {hrs}h Hold
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={isSimulating}
                className="w-full sm:w-auto rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sliders size={14} />
                <span>{isSimulating ? 'Simulating…' : 'Run Simulation'}</span>
              </button>
            </div>
          )}

          {/* 6. CUSTOM SITUATION ASK INPUT */}
          {selectedScenario === 'custom' && (
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ask any situation: e.g., What if fuel tank leaks 2000L? / What if satellite blacks out?"
                    className="w-full rounded-xl border border-[#DCE8F0] bg-white px-4 py-2.5 text-xs text-[#0C1E30] placeholder-[#64748B] focus:border-[#0284C7] focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSimulating || !customQuestion.trim()}
                  className="rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0"
                >
                  <Sparkles size={13} />
                  <span>{isSimulating ? 'Analyzing…' : 'Simulate'}</span>
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#64748B]">
                <span className="font-medium">Quick tries:</span>
                {[
                  'What if fuel tank leaks 2000L?',
                  'What if satellite comms blackout for 18h?',
                  'What if tracked snowcat breaks down at waypoint 4?',
                ].map((sugg) => (
                  <button
                    key={sugg}
                    type="button"
                    onClick={() => {
                      setCustomQuestion(sugg)
                      setActiveCustomQuery(sugg)
                      handleRun()
                    }}
                    className="bg-white border border-[#DCE8F0] hover:border-[#0284C7] hover:text-[#0284C7] px-2 py-0.5 rounded-md transition"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </form>
          )}
        </div>

        {/* Results */}
        {hasRun && (
          <div className="space-y-6 pt-2 border-t border-[#F1F5F9] animate-fade-in">
            {/* Mission Health Transition */}
            <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B]">
                  Mission Health Projection
                </div>
                {mitigationAuthorized && (
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Mitigation Active (+{simulationResult.rec.recoveryPts} pts recovered)
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-bold font-mono text-[#0C1E30]">
                  {baselineScore}
                </span>
                <span className="text-2xl text-[#64748B]">→</span>
                <span
                  className={`text-4xl sm:text-5xl font-bold font-mono ${
                    mitigationAuthorized ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {simulationResult.recoveredScore}
                </span>

                <span
                  className={`ml-2 font-mono text-xs font-semibold px-2 py-0.5 rounded border ${
                    mitigationAuthorized
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-rose-600 bg-rose-50 border-rose-200'
                  }`}
                >
                  {mitigationAuthorized
                    ? `Protected at ${simulationResult.recoveredScore}%`
                    : `↓ ${simulationResult.drop} points`}
                </span>
              </div>
            </div>

            {/* Affected Systems (Dynamic) */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30] mb-3">
                Affected Systems ({simulationResult.affected.length})
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {simulationResult.affected.map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl border border-[#DCE8F0] bg-white text-center space-y-1 shadow-2xs"
                  >
                    <span
                      className={`h-2 w-2 rounded-full inline-block ${
                        item.severity === 'Critical'
                          ? 'bg-rose-600'
                          : item.severity === 'Warning'
                          ? 'bg-amber-500'
                          : 'bg-sky-500'
                      }`}
                    />
                    <div className="font-semibold text-sm text-[#0C1E30]">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#64748B] font-mono leading-tight">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Possible Actions / Dynamic Recommendation */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
                  Recommended Mitigation Protocol
                </div>
                <span className="text-xs font-mono text-[#0284C7] font-bold">
                  {simulationResult.rec.code}
                </span>
              </div>

              {!optionsOpen ? (
                <div className="rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-[#0284C7] bg-white px-2 py-0.5 rounded border border-[#BAE6FD]">
                        {simulationResult.rec.code}
                      </span>
                      <span className="text-sm font-bold text-[#0C1E30]">
                        {simulationResult.rec.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#42586E] line-clamp-1">
                      {simulationResult.rec.action}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOptionsOpen(true)}
                    className="shrink-0 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2.5 text-xs font-semibold transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Review options</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 sm:p-5 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded">
                          {simulationResult.rec.code}
                        </span>
                        <h3 className="font-bold text-sm text-[#0C1E30]">
                          {simulationResult.rec.title}
                        </h3>
                      </div>
                      <div className="text-[11px] text-[#64748B] font-mono mt-0.5">
                        Lead time: <strong>{simulationResult.rec.leadTime}</strong> · Estimated recovery:{' '}
                        <strong className="text-emerald-700">+{simulationResult.rec.recoveryPts} points</strong>
                      </div>
                    </div>

                    {mitigationAuthorized && (
                      <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                        <CheckCircle2 size={13} />
                        Authorized
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#334155] leading-relaxed bg-white p-3 rounded-lg border border-[#DCE8F0]">
                    {simulationResult.rec.action}
                  </p>

                  {/* Multiple Mitigation Options */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">
                      Select Mitigation Strategy:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {simulationResult.rec.options.map((opt, idx) => {
                        const isChosen = selectedOptionIndex === idx
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedOptionIndex(idx)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                              isChosen
                                ? 'bg-white border-[#0284C7] ring-1 ring-[#0284C7]'
                                : 'bg-white/80 border-[#DCE8F0] hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between font-semibold text-[#0C1E30]">
                              <span>{opt.name}</span>
                              {isChosen && <span className="text-[10px] font-mono text-[#0284C7]">Selected</span>}
                            </div>
                            <div className="text-[#64748B] mt-0.5 text-[11px]">
                              {opt.detail}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE8F0]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={mitigationAuthorized}
                        onClick={handleAuthorize}
                        className="rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-60 flex items-center gap-1.5"
                      >
                        {mitigationAuthorized ? (
                          <>
                            <CheckCircle2 size={13} />
                            <span>Mitigation Active</span>
                          </>
                        ) : (
                          <>
                            <Zap size={13} />
                            <span>Authorize Mitigation</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOptionsOpen(false)}
                        className="rounded-lg border border-[#DCE8F0] bg-white px-3.5 py-2.5 text-xs font-medium text-[#64748B] hover:text-[#0C1E30] transition"
                      >
                        Close
                      </button>
                    </div>

                    {mitigationAuthorized && (
                      <button
                        type="button"
                        onClick={() => goTo('audit')}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        <span>View Cryptographic Audit Ledger</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

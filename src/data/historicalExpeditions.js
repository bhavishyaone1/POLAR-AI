/**
 * HISTORICAL EXPEDITION ARCHIVE — POLAR-AI MISSION MEMORY
 * =========================================================
 * This dataset forms the foundation of POLAR-AI's adaptive learning capability.
 * Six past Antarctic / Arctic expeditions (2018–2024) are documented with:
 *   - Mission metadata
 *   - Incident log (what went wrong, when, under what conditions)
 *   - Precondition metrics (the observable state before each incident)
 *   - Outcome and resolution
 *   - Structured lessons for pattern matching
 *
 * The pattern engine (src/lib/missionMemory.js) compares the CURRENT mission
 * state against these preconditions to surface predictive warnings.
 */

export const HISTORICAL_EXPEDITIONS = [
  /* ================================================================
     EXPEDITION 01 — MAITRI-6 ANTARCTIC WINTER MISSION (2018–2019)
     ================================================================ */
  {
    id: 'EXP-HIST-001',
    name: 'Maitri-6 Antarctic Winter Mission',
    station: 'Maitri Station, Antarctica',
    season: 'Winter',
    year: 2019,
    duration_days: 145,
    personnel_count: 22,
    commander: 'Dr. Suresh Nair',
    outcome: 'COMPLETED_WITH_INCIDENTS',
    continuity_score_avg: 61,
    continuity_score_min: 39,
    summary:
      'Extended winter isolation mission. Severe fuel shortfall in Week 9 due to combined pack-ice delay and elevated heating demand. Generator failure cascaded into data-center outage. Mission completed after emergency bladder reserve draw-down.',

    incidents: [
      {
        id: 'INC-001-01',
        week: 9,
        category: 'fuel',
        title: 'Critical Fuel Shortage — Heating Demand Spike',
        severity: 'CRITICAL',
        description:
          'Station heating load surged +22% due to unexpected -46°C ambient temperatures. Fuel burn rate exceeded forecasted 1,180 L/day, reaching 1,440 L/day. Inbound supply vessel delayed 6 days by Lazarev Sea pack ice.',
        preconditions: {
          fuel_days_remaining: 11,
          cargo_delay_days: 6,
          ambient_temp_celsius: -46,
          burn_rate_liters_per_day: 1440,
          personnel_count: 22,
          season: 'Winter',
          generator_service_overdue: false,
          last_resupply_days_ago: 31,
        },
        impact:
          'Generator runtime reduced by 18%. Science lab heating circuits shed. Cryogenic sample vaults at risk for 38 hours.',
        resolution:
          'Emergency draw-down of Bladder Reserve BR-02 (4,200 L). Load-shedding of auxiliary circuits. Mission extended 4 days.',
        resolution_time_hours: 38,
        lesson: 'Winter missions require 20% fuel buffer above calculated runway. Bladder reserves must be pre-authorized for rapid draw-down.',
        lesson_tags: ['fuel', 'winter', 'heating', 'cargo-delay', 'buffer'],
      },
      {
        id: 'INC-001-02',
        week: 11,
        category: 'equipment',
        title: 'Generator B Failure — Overloaded Under Peak Draw',
        severity: 'HIGH',
        description:
          'Primary Generator B tripped under peak draw during storm heating cycle. Maintenance cycle overdue by 8 days due to crew availability issues.',
        preconditions: {
          generator_service_overdue_days: 8,
          load_percent: 97,
          ambient_temp_celsius: -43,
          crew_available_for_maintenance: 2,
        },
        impact: 'Station on single-generator redundancy for 19 hours. Hydronic heating pressure dropped 30%.',
        resolution: 'Emergency field service by station engineer. Generator B restored with spare injector kit.',
        resolution_time_hours: 19,
        lesson: 'Generator service must not slip more than 3 days regardless of crew availability. Designate dedicated maintenance standby.',
        lesson_tags: ['generator', 'equipment', 'maintenance', 'overload'],
      },
    ],
  },

  /* ================================================================
     EXPEDITION 02 — MAITRI-7 SUMMER RESUPPLY MISSION (2019–2020)
     ================================================================ */
  {
    id: 'EXP-HIST-002',
    name: 'Maitri-7 Summer Resupply Mission',
    station: 'Maitri Station, Antarctica',
    season: 'Summer',
    year: 2020,
    duration_days: 72,
    personnel_count: 31,
    commander: 'Dr. Priya Menon',
    outcome: 'COMPLETED_SMOOTHLY',
    continuity_score_avg: 82,
    continuity_score_min: 74,
    summary:
      'Successful summer resupply with minimal incidents. Cargo delays were pre-empted by route optimization. Serves as the benchmark reference mission for summer operations.',

    incidents: [
      {
        id: 'INC-002-01',
        week: 3,
        category: 'cargo',
        title: 'Blue-Ice Runway Surface Degradation',
        severity: 'MODERATE',
        description:
          'Unexpected melt surface on blue-ice runway limited aircraft payload to 60% of planned manifest capacity. 2 cargo flights diverted to Novo backup runway.',
        preconditions: {
          ambient_temp_celsius: -4,
          runway_surface_condition: 'DEGRADED',
          cargo_flights_pending: 4,
          season: 'Summer',
          day_of_season: 22,
        },
        impact: 'Cargo delivery reduced by 38% for 5 days. Science equipment delivery delayed.',
        resolution: 'Diversion to Novo backup runway. Manifest redistributed across 3 additional flights.',
        resolution_time_hours: 120,
        lesson: 'Summer operations after Day 20 require daily runway surface inspection. Maintain Novo diversion plan pre-approved.',
        lesson_tags: ['cargo', 'runway', 'summer', 'diversion'],
      },
    ],
  },

  /* ================================================================
     EXPEDITION 03 — HIMADRI ARCTIC STATION MISSION (2020–2021)
     ================================================================ */
  {
    id: 'EXP-HIST-003',
    name: 'Himadri Arctic Station — Autumn Transition',
    station: 'Himadri Station, Svalbard, Arctic',
    season: 'Autumn',
    year: 2021,
    duration_days: 98,
    personnel_count: 14,
    commander: 'Dr. Anupam Bose',
    outcome: 'COMPLETED_WITH_INCIDENTS',
    continuity_score_avg: 67,
    continuity_score_min: 44,
    summary:
      'Arctic autumn transition mission with medical emergency in Week 6 and fuel logistics challenges. Small team size amplified personnel dependency risk.',

    incidents: [
      {
        id: 'INC-003-01',
        week: 6,
        category: 'medical',
        title: 'Acute Appendicitis — Emergency Medevac Required',
        severity: 'CRITICAL',
        description:
          'Field scientist developed acute appendicitis during traverse to Ny-Ålesund research node. Emergency medevac helicopter dispatched from Longyearbyen.',
        preconditions: {
          personnel_count: 14,
          field_team_size: 4,
          nearest_medical_facility_km: 112,
          weather_condition: 'MODERATE_STORM',
          medevac_window_hours: 3,
        },
        impact: 'Field traverse suspended 4 days. Mission scope reduced by 15%.',
        resolution: 'Successful medevac within 4-hour window. Patient stabilized. Traverse team recalled to station.',
        resolution_time_hours: 6,
        lesson: 'All field traverses >24h require a qualified medic. Medical evacuation window must be confirmed before each deployment.',
        lesson_tags: ['medical', 'medevac', 'field-traverse', 'personnel'],
      },
      {
        id: 'INC-003-02',
        week: 8,
        category: 'fuel',
        title: 'Fuel Delivery Delayed — Arctic Sea Route Freeze',
        severity: 'HIGH',
        description:
          'Scheduled fuel barge unable to navigate Isfjorden due to early seasonal freeze. Delivery delayed 9 days beyond scheduled date.',
        preconditions: {
          fuel_days_remaining: 13,
          cargo_delay_days: 9,
          ambient_temp_celsius: -18,
          season: 'Autumn',
          sea_ice_forming: true,
          burn_rate_liters_per_day: 860,
        },
        impact: 'Station entered conservation mode for 6 days. Non-essential science experiments suspended.',
        resolution: 'Emergency helicopter fuel pod transfer from Norwegian station. Conservation protocol maintained until sea route cleared.',
        resolution_time_hours: 156,
        lesson: 'Arctic autumn missions after Week 7: plan for sea route freeze. Pre-arrange helicopter fuel-pod emergency transfer MOU with partner stations.',
        lesson_tags: ['fuel', 'arctic', 'autumn', 'sea-ice', 'cargo-delay'],
      },
    ],
  },

  /* ================================================================
     EXPEDITION 04 — MAITRI-8 WINTER DEEP SCIENCE MISSION (2021–2022)
     ================================================================ */
  {
    id: 'EXP-HIST-004',
    name: 'Maitri-8 Deep Science Winter Mission',
    station: 'Maitri Station, Antarctica',
    season: 'Winter',
    year: 2022,
    duration_days: 168,
    personnel_count: 18,
    commander: 'Dr. Kavita Sharma',
    outcome: 'COMPLETED_WITH_INCIDENTS',
    continuity_score_avg: 58,
    continuity_score_min: 34,
    summary:
      'Longest continuous mission to date. Multiple cascading incidents in the mid-winter period. Fuel crisis compounded by generator failure and a blizzard event that grounded medevac capacity for 11 days.',

    incidents: [
      {
        id: 'INC-004-01',
        week: 12,
        category: 'fuel',
        title: 'Fuel Runway Breach — Cascading Generator Impact',
        severity: 'CRITICAL',
        description:
          'Fuel reserves dropped below 7-day runway for the first time in NCPOR history. Concurrent Generator A fault reduced generation efficiency to 74%. Extended blizzard grounded all resupply flights for 11 days.',
        preconditions: {
          fuel_days_remaining: 7,
          cargo_delay_days: 11,
          ambient_temp_celsius: -51,
          burn_rate_liters_per_day: 1550,
          season: 'Winter',
          generator_efficiency_percent: 74,
          blizzard_active: true,
          personnel_count: 18,
        },
        impact:
          'Continuity Score reached 34% — lowest recorded. Cryogenic vaults lost temperature integrity. 3 science experiments permanently lost. 2 personnel treated for cold stress.',
        resolution:
          'Full station emergency protocol activated. 12 non-essential personnel placed in survival mode. Bladder reserves drawn down completely. Ground convoy resupply from Novolazarevskaya authorized on Day 14.',
        resolution_time_hours: 264,
        lesson: 'Winter missions >120 days MUST pre-position secondary fuel depot within 80km. Never allow fuel below 10-day runway without active resupply in transit.',
        lesson_tags: ['fuel', 'winter', 'blizzard', 'generator', 'cascade', 'critical'],
      },
      {
        id: 'INC-004-02',
        week: 14,
        category: 'emergency',
        title: 'Cold Stress — Multiple Personnel',
        severity: 'HIGH',
        description:
          'Three station members developed hypothermia symptoms during power conservation period when habitat heating was reduced to 40% capacity.',
        preconditions: {
          habitat_heating_percent: 40,
          ambient_temp_celsius: -51,
          consecutive_conservation_days: 8,
          personnel_in_field: 0,
        },
        impact: 'Three personnel required medical treatment. Station morale significantly affected.',
        resolution: 'Emergency heating circuit prioritization. Medical officer issued warming protocols. All recovered within 48 hours.',
        resolution_time_hours: 48,
        lesson: 'Conservation protocols must maintain minimum 65% habitat heating regardless of fuel status. Life-safety is non-negotiable.',
        lesson_tags: ['medical', 'heating', 'conservation', 'personnel'],
      },
    ],
  },

  /* ================================================================
     EXPEDITION 05 — MAITRI-9 TRANSITION SEASON MISSION (2022–2023)
     ================================================================ */
  {
    id: 'EXP-HIST-005',
    name: 'Maitri-9 Autumn-Winter Transition Mission',
    station: 'Maitri Station, Antarctica',
    season: 'Autumn',
    year: 2023,
    duration_days: 110,
    personnel_count: 25,
    commander: 'Dr. Ramesh Iyer',
    outcome: 'COMPLETED_WITH_INCIDENTS',
    continuity_score_avg: 70,
    continuity_score_min: 51,
    summary:
      'Autumn transition mission with cargo logistics challenges and personnel check-in anomalies. Proactive risk management prevented escalation to critical status.',

    incidents: [
      {
        id: 'INC-005-01',
        week: 4,
        category: 'cargo',
        title: 'Consignment C-201 Manifested Incorrectly — Critical Item Omission',
        severity: 'HIGH',
        description:
          'Incoming cargo manifest C-201 omitted 840 kg of critical science equipment due to documentation error at Chennai port. Discovered only upon vessel arrival at Novo Staging.',
        preconditions: {
          cargo_manifest_verified: false,
          port_origin: 'Chennai',
          days_until_vessel_arrival: 0,
          critical_items_missing: true,
        },
        impact: 'Science program delayed 3 weeks. Equipment air-freighted at significant cost.',
        resolution: 'Emergency air freight via chartered aircraft from Cape Town. Equipment arrived 19 days late.',
        resolution_time_hours: 456,
        lesson: 'All cargo manifests must be independently cross-checked at origin port and station pre-arrival. Critical items require dual-verification sign-off.',
        lesson_tags: ['cargo', 'manifest', 'verification', 'documentation'],
      },
      {
        id: 'INC-005-02',
        week: 7,
        category: 'personnel',
        title: 'Field Team Check-In Missed — Search Protocol Activated',
        severity: 'HIGH',
        description:
          'Ice-core traverse team (4 personnel) missed two consecutive 6-hour satellite check-ins. Search and rescue protocol activated. Team located safely — radio equipment failure.',
        preconditions: {
          field_team_size: 4,
          consecutive_missed_checkins: 2,
          distance_from_station_km: 74,
          weather_condition: 'MODERATE',
          radio_equipment_age_months: 38,
        },
        impact: 'Full SAR activation, 8-hour response mobilization. Team located safely after 11 hours.',
        resolution: 'Snowcat rescue team dispatched. Team self-evacuated via backup navigation. Redundant EPIRB beacon activated successfully.',
        resolution_time_hours: 11,
        lesson: 'All field radios older than 24 months require pre-deployment full test. Carry redundant EPIRB + satellite messenger regardless of weather forecast.',
        lesson_tags: ['personnel', 'communication', 'field-traverse', 'sar', 'equipment'],
      },
    ],
  },

  /* ================================================================
     EXPEDITION 06 — MAITRI-10 SUMMER SCIENCE PROGRAM (2023–2024)
     ================================================================ */
  {
    id: 'EXP-HIST-006',
    name: 'Maitri-10 Summer Science Program',
    station: 'Maitri Station, Antarctica',
    season: 'Summer',
    year: 2024,
    duration_days: 78,
    personnel_count: 34,
    commander: 'Dr. Nalini Desai',
    outcome: 'COMPLETED_WITH_INCIDENTS',
    continuity_score_avg: 77,
    continuity_score_min: 63,
    summary:
      'Largest team size to date for a summer program. Inventory management gaps and fuel accounting discrepancies identified. Weather window was favorable.',

    incidents: [
      {
        id: 'INC-006-01',
        week: 2,
        category: 'inventory',
        title: 'Medical Supply Inventory Discrepancy — 34% Undercount',
        severity: 'MODERATE',
        description:
          'Physical audit of medical bay revealed 34% fewer critical medications than manifest records indicated. Cause: multiple partial draws not entered into inventory system.',
        preconditions: {
          personnel_count: 34,
          inventory_last_audited_days_ago: 41,
          medication_count_discrepancy_percent: 34,
          electronic_system_used: false,
        },
        impact: 'Emergency resupply of medical items required. Station medical officer restricted non-critical dispensing for 9 days.',
        resolution: 'Emergency resupply via next available aircraft. Full electronic inventory system implemented.',
        resolution_time_hours: 216,
        lesson: 'Medical inventory must be audited every 14 days regardless of team size. Mandatory electronic log entry for all draws — no exceptions.',
        lesson_tags: ['inventory', 'medical', 'audit', 'documentation'],
      },
      {
        id: 'INC-006-02',
        week: 5,
        category: 'fuel',
        title: 'Fuel Accounting Error — Actual Reserves 12% Below Forecast',
        severity: 'MODERATE',
        description:
          'Routine cross-check revealed a systematic 12% over-reporting of fuel reserves due to meter calibration drift on Tank 3. Actual runway was 11.4 days, not 13.0 as reported.',
        preconditions: {
          fuel_days_remaining_reported: 13,
          fuel_days_remaining_actual: 11,
          meter_calibration_last_checked_days: 68,
          personnel_count: 34,
          season: 'Summer',
        },
        impact: 'Emergency recalibration and resupply prioritization. No operational disruption but planning margins severely tightened.',
        resolution: 'Meter recalibration completed. Reserve management tightened to 8-day minimum buffer.',
        resolution_time_hours: 12,
        lesson: 'Fuel meter calibration must be verified every 30 days. Cross-check physical dipstick readings against electronic meter weekly.',
        lesson_tags: ['fuel', 'inventory', 'calibration', 'accounting'],
      },
    ],
  },
]

/* ================================================================
   AGGREGATED LESSON CATEGORIES for the Lessons Learned Library
   ================================================================ */
export const LESSON_CATEGORIES = ['fuel', 'cargo', 'equipment', 'medical', 'personnel', 'inventory', 'emergency', 'winter', 'summer']

/* ================================================================
   INCIDENT FREQUENCY MAP — how many expeditions had each category
   ================================================================ */
export const INCIDENT_FREQUENCY = {
  fuel: { count: 5, total: 6, label: '5 of 6 past expeditions' },
  cargo: { count: 3, total: 6, label: '3 of 6 past expeditions' },
  equipment: { count: 2, total: 6, label: '2 of 6 past expeditions' },
  medical: { count: 2, total: 6, label: '2 of 6 past expeditions' },
  personnel: { count: 2, total: 6, label: '2 of 6 past expeditions' },
  inventory: { count: 2, total: 6, label: '2 of 6 past expeditions' },
  emergency: { count: 1, total: 6, label: '1 of 6 past expeditions' },
  winter: { count: 3, total: 4, label: '3 of 4 winter expeditions' },
  'cargo-delay': { count: 4, total: 6, label: '4 of 6 past expeditions' },
  generator: { count: 2, total: 6, label: '2 of 6 past expeditions' },
}

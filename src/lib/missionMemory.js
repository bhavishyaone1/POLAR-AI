/**
 * MISSION MEMORY ENGINE — POLAR-AI PATTERN MATCHING
 * ===================================================
 * Pure JavaScript pattern-matching engine that compares the CURRENT
 * mission's live state against 6 historical expedition incident datasets.
 *
 * HOW IT WORKS:
 *   1. You pass in a "currentState" object (fuel days, cargo delay, season, etc.)
 *   2. The engine scans all historical incident preconditions
 *   3. It scores each match based on how many conditions align
 *   4. It returns ranked predictions with confidence %, historical evidence,
 *      and recommended actions pulled directly from past resolutions
 *
 * NO ML LIBRARY NEEDED. This is deterministic pattern matching — 
 * transparent, auditable, and explainable by design.
 */

import { HISTORICAL_EXPEDITIONS, INCIDENT_FREQUENCY } from '../data/historicalExpeditions'

/* ================================================================
   MATCH SCORING RULES
   Each matched condition contributes a score weight.
   A total score ≥ 0.5 (50%) is considered a meaningful match.
   ================================================================ */
const SCORING_RULES = [
  {
    key: 'fuel_days_remaining',
    label: 'Fuel runway critically low',
    check: (current, past) =>
      current.fuel_days_remaining != null &&
      past.fuel_days_remaining != null &&
      Math.abs(current.fuel_days_remaining - past.fuel_days_remaining) <= 4,
    weight: 0.30,
  },
  {
    key: 'cargo_delay_days',
    label: 'Cargo resupply delayed',
    check: (current, past) =>
      current.cargo_delay_days != null &&
      past.cargo_delay_days != null &&
      current.cargo_delay_days >= 3 &&
      past.cargo_delay_days >= 3,
    weight: 0.25,
  },
  {
    key: 'season',
    label: 'Same season type',
    check: (current, past) =>
      current.season && past.season && current.season === past.season,
    weight: 0.15,
  },
  {
    key: 'ambient_temp',
    label: 'Similar extreme temperature',
    check: (current, past) =>
      current.ambient_temp_celsius != null &&
      past.ambient_temp_celsius != null &&
      Math.abs(current.ambient_temp_celsius - past.ambient_temp_celsius) <= 8,
    weight: 0.15,
  },
  {
    key: 'generator_overdue',
    label: 'Generator maintenance overdue',
    check: (current, past) =>
      current.generator_service_overdue === true &&
      (past.generator_service_overdue === true || past.generator_service_overdue_days > 0),
    weight: 0.10,
  },
  {
    key: 'personnel_count',
    label: 'Similar personnel scale',
    check: (current, past) =>
      current.personnel_count != null &&
      past.personnel_count != null &&
      Math.abs(current.personnel_count - past.personnel_count) <= 6,
    weight: 0.05,
  },
]

/**
 * Score a single historical incident against the current state.
 * Returns a score 0.0–1.0 and which conditions matched.
 */
function scoreIncident(currentState, incident) {
  const preconditions = incident.preconditions
  let totalWeight = 0
  let matchedWeight = 0
  const matchedConditions = []

  for (const rule of SCORING_RULES) {
    totalWeight += rule.weight
    if (rule.check(currentState, preconditions)) {
      matchedWeight += rule.weight
      matchedConditions.push(rule.label)
    }
  }

  const score = totalWeight > 0 ? matchedWeight / totalWeight : 0
  return { score, matchedConditions }
}

/**
 * matchPatterns(currentState)
 * ============================
 * Main pattern matching function.
 * Returns all matched incidents sorted by score descending.
 * Only returns incidents with score >= 0.30.
 *
 * @param {object} currentState - Current mission metrics
 * @returns {Array} matched patterns with score, expedition, incident, conditions
 */
export function matchPatterns(currentState = {}) {
  const results = []

  for (const expedition of HISTORICAL_EXPEDITIONS) {
    for (const incident of expedition.incidents) {
      const { score, matchedConditions } = scoreIncident(currentState, incident)
      if (score >= 0.30) {
        results.push({
          score,
          matchedConditions,
          expedition: {
            id: expedition.id,
            name: expedition.name,
            year: expedition.year,
            station: expedition.station,
            season: expedition.season,
            commander: expedition.commander,
            outcome: expedition.outcome,
          },
          incident: {
            id: incident.id,
            title: incident.title,
            category: incident.category,
            severity: incident.severity,
            description: incident.description,
            impact: incident.impact,
            resolution: incident.resolution,
            resolution_time_hours: incident.resolution_time_hours,
            lesson: incident.lesson,
            lesson_tags: incident.lesson_tags,
          },
        })
      }
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

/**
 * getPredictions(currentState)
 * =============================
 * Returns top 3 predicted risk categories with:
 *   - confidence percentage
 *   - number of past expeditions where this occurred
 *   - recommended actions from historical resolutions
 *   - supporting expedition evidence
 *
 * @param {object} currentState - Current mission metrics
 * @returns {Array} top predictions
 */
export function getPredictions(currentState = {}) {
  const patterns = matchPatterns(currentState)

  // Group by category and aggregate
  const categoryMap = {}
  for (const match of patterns) {
    const cat = match.incident.category
    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        category: cat,
        score: 0,
        count: 0,
        expeditions: [],
        lessons: [],
        incident: match.incident,
        matchedConditions: match.matchedConditions,
      }
    }
    categoryMap[cat].score = Math.max(categoryMap[cat].score, match.score)
    categoryMap[cat].count += 1
    categoryMap[cat].expeditions.push({
      name: match.expedition.name,
      year: match.expedition.year,
      outcome: match.expedition.outcome,
    })
    if (!categoryMap[cat].lessons.includes(match.incident.lesson)) {
      categoryMap[cat].lessons.push(match.incident.lesson)
    }
  }

  return Object.values(categoryMap)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((pred) => ({
      ...pred,
      confidence: Math.round(pred.score * 100),
      historical_frequency: INCIDENT_FREQUENCY[pred.category] || null,
    }))
}

/**
 * getLessonsFor(category)
 * ========================
 * Returns all lessons learned for a given category tag.
 *
 * @param {string} category - e.g. 'fuel', 'cargo', 'medical'
 * @returns {Array} lesson objects with expedition context
 */
export function getLessonsFor(category) {
  const lessons = []
  for (const expedition of HISTORICAL_EXPEDITIONS) {
    for (const incident of expedition.incidents) {
      const tags = incident.lesson_tags || []
      if (tags.includes(category) || incident.category === category) {
        lessons.push({
          lesson: incident.lesson,
          expedition_name: expedition.name,
          year: expedition.year,
          severity: incident.severity,
          incident_title: incident.title,
          lesson_tags: incident.lesson_tags,
        })
      }
    }
  }
  return lessons
}

/**
 * getSimilarMissions(currentState)
 * ==================================
 * Returns the 2 past expeditions most similar to the current one,
 * based on season, personnel count, and station.
 *
 * @param {object} currentState
 * @returns {Array} up to 2 matching past expeditions with similarity score
 */
export function getSimilarMissions(currentState = {}) {
  const scored = HISTORICAL_EXPEDITIONS.map((exp) => {
    let score = 0
    if (currentState.season && exp.season === currentState.season) score += 0.40
    if (currentState.station && exp.station?.toLowerCase().includes(currentState.station?.toLowerCase())) score += 0.30
    if (
      currentState.personnel_count != null &&
      Math.abs(exp.personnel_count - currentState.personnel_count) <= 5
    )
      score += 0.30
    return { ...exp, similarity: Math.round(score * 100) }
  })

  return scored
    .filter((e) => e.similarity >= 30)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 2)
}

/**
 * getAllLessons()
 * ===============
 * Returns every lesson from every expedition, de-duplicated.
 */
export function getAllLessons() {
  const seen = new Set()
  const lessons = []
  for (const expedition of HISTORICAL_EXPEDITIONS) {
    for (const incident of expedition.incidents) {
      const key = incident.lesson
      if (!seen.has(key)) {
        seen.add(key)
        lessons.push({
          lesson: incident.lesson,
          expedition_name: expedition.name,
          year: expedition.year,
          severity: incident.severity,
          incident_title: incident.title,
          category: incident.category,
          lesson_tags: incident.lesson_tags,
        })
      }
    }
  }
  return lessons
}

/**
 * getCategoryIcon(category)
 * ==========================
 * Returns an emoji representative for a risk category.
 */
export function getCategoryIcon(category) {
  const icons = {
    fuel: '🛢️',
    cargo: '📦',
    equipment: '⚙️',
    medical: '🏥',
    personnel: '👥',
    inventory: '📋',
    emergency: '🚨',
    weather: '🌨️',
  }
  return icons[category] || '⚠️'
}

/**
 * getConfidenceLabel(confidence)
 * ================================
 * Returns a human-readable label for a confidence percentage.
 */
export function getConfidenceLabel(confidence) {
  if (confidence >= 80) return 'Very High'
  if (confidence >= 60) return 'High'
  if (confidence >= 40) return 'Moderate'
  return 'Low'
}

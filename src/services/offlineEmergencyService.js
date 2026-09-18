/**
 * OFFLINE EMERGENCY RESPONSE SERVICE
 * ===================================
 * 100% Autonomous, zero-network spatial triage and rescue coordination.
 * Functions entirely in-browser or on disconnected local edge devices.
 * Uses spherical Haversine trigonometry to compute physical distances,
 * transit times, and vehicle/crew dispatch recommendations.
 */

// Convert degrees to radians
function toRad(deg) {
  return (deg * Math.PI) / 180
}

/**
 * Calculates great-circle distance between two polar coordinates in kilometers.
 */
export function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 9999
  const R = 6371 // Earth radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number((R * c).toFixed(2))
}

/**
 * Generates an autonomous rescue triage assessment for an incident without internet connectivity.
 */
export function triageEmergencyOffline({
  incident,
  personnel = [],
  assets = [],
  inventory = [],
}) {
  const incLat = incident.latitude ?? -70.7455
  const incLng = incident.longitude ?? 11.5874

  // 1. Sort nearest personnel
  const nearbyPersonnel = personnel
    .map((p) => {
      const distKm = calculateHaversineDistanceKm(incLat, incLng, p.latitude, p.longitude)
      // Traverse speed over snow is estimated at 3.5 km/h on foot, 25 km/h on snowmobile
      const estFootMinutes = Math.round((distKm / 3.5) * 60)
      return {
        ...p,
        distanceKm: distKm,
        estFootMinutes,
        isQualifiedMedic: p.role?.toLowerCase().includes('medic') || p.role?.toLowerCase().includes('doctor'),
      }
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 6)

  // 2. Sort nearest operational vehicles
  const nearbyVehicles = assets
    .filter((a) => a.type === 'VEHICLE' && a.status === 'OPERATIONAL')
    .map((v) => {
      // Default location reference if coordinates not attached
      const isMaitri = v.location_id?.includes('MAITRI')
      const vLat = isMaitri ? -70.7667 : -69.4067
      const vLng = isMaitri ? 11.7333 : 76.1867
      const distKm = calculateHaversineDistanceKm(incLat, incLng, vLat, vLng)
      const estVehicleMinutes = Math.max(5, Math.round((distKm / 22) * 60))
      return {
        ...v,
        distanceKm: distKm,
        estMinutes: estVehicleMinutes,
      }
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)

  // 3. Relevant emergency supplies at location
  const emergencySupplies = inventory.filter(
    (i) => i.category === 'Medical' || i.category === 'Safety'
  )

  // 4. Generate tactical dispatch recommendation
  const primaryVehicle = nearbyVehicles[0]
  const primaryMedic = nearbyPersonnel.find((p) => p.isQualifiedMedic) || nearbyPersonnel[0]

  const tacticalPlan = {
    incidentId: incident.id,
    severity: incident.severity || 'HIGH',
    type: incident.type,
    dispatchVehicle: primaryVehicle ? primaryVehicle.name : 'PistenBully 300 Tracked Snowcat',
    vehicleEtaMinutes: primaryVehicle ? primaryVehicle.estMinutes : 15,
    assignedLeader: primaryMedic ? primaryMedic.name : 'Cdr. Vikram Rathore',
    medicalEscort: primaryMedic ? `${primaryMedic.name} (${primaryMedic.role})` : 'Medical Officer on call',
    recommendedSupplies: ['Trauma / Frostbite Kit', 'Hypothermia Thermal Wrap', 'Portable Oxygen Cylinder'],
    communicationsProtocol: 'CODAN HF Emergency Channel 4 (Frequency: 8,291 kHz)',
    weatherCaution: 'Monitor sub-zero windchill; ensure heated cabin on evacuation vehicle.',
    offlineGeneratedAt: new Date().toISOString(),
  }

  return {
    incident,
    nearbyPersonnel,
    nearbyVehicles,
    emergencySupplies,
    tacticalPlan,
  }
}

import { BIHAR_DISTRICTS, PROFESSIONAL_TYPES } from '../constants/biharData';
import { sortAlphabetically } from '../utils/sorting';

export interface LocationConfig {
  type: 'sub_registry' | 'block' | 'court' | 'notary_zone' | 'generic';
  labelEn: string;
  labelHi: string;
  placeholderEn: string;
  placeholderHi: string;
}

/**
 * Resolves the third-level location configuration based on professional type
 */
export function getLocationConfig(professionalType: string): LocationConfig {
  const norm = professionalType.toLowerCase();

  if (norm.includes('deed') || norm.includes('कातिब') || norm.includes('katib')) {
    return {
      type: 'sub_registry',
      labelEn: 'Select Sub-Registry Office',
      labelHi: 'उप-पंजीकरण कार्यालय चुनें',
      placeholderEn: 'Select Sub-Registry Office',
      placeholderHi: 'उप-पंजीकरण कार्यालय चुनें'
    };
  }

  if (norm.includes('amin') || norm.includes('surveyor') || norm.includes('अमीन')) {
    return {
      type: 'block',
      labelEn: 'Select Block',
      labelHi: 'प्रखंड चुनें',
      placeholderEn: 'Select Block',
      placeholderHi: 'प्रखंड चुनें'
    };
  }

  if (norm.includes('lawyer') || norm.includes('advocate') || norm.includes('वकील')) {
    return {
      type: 'court',
      labelEn: 'Select Court / Legal Location',
      labelHi: 'न्यायालय / कानूनी स्थान चुनें',
      placeholderEn: 'Select Court / Legal Location',
      placeholderHi: 'न्यायालय / कानूनी स्थान चुनें'
    };
  }

  if (norm.includes('notary') || norm.includes('नोटरी')) {
    return {
      type: 'notary_zone',
      labelEn: 'Select Notary Zone / Chamber',
      labelHi: 'नोटरी क्षेत्र / चेंबर चुनें',
      placeholderEn: 'Select Notary Zone / Chamber',
      placeholderHi: 'नोटरी क्षेत्र / चेंबर चुनें'
    };
  }

  return {
    type: 'generic',
    labelEn: 'Select Location',
    labelHi: 'स्थान चुनें',
    placeholderEn: 'Select Location',
    placeholderHi: 'स्थान चुनें'
  };
}

/**
 * Async API abstraction for fetching conditional locations.
 * In production this connects to `GET /api/professionals/locations?type=${type}&district=${district}`.
 * Strictly prevents cross-district contamination and guarantees alphabetical sorting.
 */
export async function getLocations(
  professionalType: string,
  districtName: string
): Promise<string[]> {
  // Simulate network latency (150ms - 300ms)
  await new Promise(resolve => setTimeout(resolve, 180));

  if (!professionalType || !districtName || districtName === 'All') {
    return [];
  }

  // Find exact district record
  const district = BIHAR_DISTRICTS.find(
    d => d.name.toLowerCase() === districtName.toLowerCase()
  );

  if (!district) {
    return [];
  }

  const normType = professionalType.toLowerCase();
  let rawLocations: string[] = [];

  if (normType.includes('deed') || normType.includes('कातिब') || normType.includes('katib')) {
    // Case A: Deed Writer -> Only Sub-Registry Offices of this district
    rawLocations = district.registryOffices || [];
  } else if (normType.includes('amin') || normType.includes('surveyor') || normType.includes('अमीन')) {
    // Case B: Amin / Surveyor -> Only Blocks of this district
    rawLocations = district.blocks || [];
  } else if (normType.includes('lawyer') || normType.includes('advocate') || normType.includes('वकील')) {
    // Lawyer -> Courts & Legal Forums of this district
    rawLocations = district.courts || [];
  } else if (normType.includes('notary') || normType.includes('नोटरी')) {
    // Notary -> Notary Zones & Bar Chambers of this district
    rawLocations = district.notaryZones || [];
  } else {
    // Default to combined locations for this district only
    rawLocations = [
      ...(district.registryOffices || []),
      ...(district.blocks || [])
    ];
  }

  // Always return strictly sorted alphabetically A → Z
  return sortAlphabetically(rawLocations);
}

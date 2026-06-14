export interface Region {
  id: string;
  country: string;
  countryCode: string;
  state?: string;
  stateCode?: string;
  district?: string;
  defaultLanguage: string;
  supportedLanguages: string[];
}

export interface RegionPack {
  id: string;
  regionId: string;
  name: string;
  description: string;
  templateIds: string[];
  version: string;
}

export const INDIA_REGION: Region = {
  id: 'in',
  country: 'India',
  countryCode: 'IN',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'hi'],
};

export const MP_REGION: Region = {
  id: 'in-mp',
  country: 'India',
  countryCode: 'IN',
  state: 'Madhya Pradesh',
  stateCode: 'MP',
  defaultLanguage: 'hi',
  supportedLanguages: ['en', 'hi'],
};

export const REGIONS: Region[] = [INDIA_REGION, MP_REGION];

export function getRegionById(id: string): Region | undefined {
  return REGIONS.find((r) => r.id === id);
}

export function matchRegion(countryCode: string, stateCode?: string): Region {
  if (countryCode === 'IN' && stateCode === 'MP') {
    return MP_REGION;
  }
  if (countryCode === 'IN') {
    return INDIA_REGION;
  }
  return {
    id: countryCode.toLowerCase(),
    country: countryCode,
    countryCode,
    defaultLanguage: 'en',
    supportedLanguages: ['en'],
  };
}

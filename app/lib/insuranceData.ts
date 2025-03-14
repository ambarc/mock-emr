export interface InsurancePlan {
  id: string;
  name: string;
  type: 'standard' | 'case';
  state: string;
  network?: string;
  affiliations?: string[];
  payerId?: string;
  address?: string;
}

export const dcMetroInsurancePlans: InsurancePlan[] = [
  // DC Plans
  { id: 'CAREFIRST-DC-1', name: 'CareFirst BlueCross BlueShield DC', type: 'standard', state: 'DC', network: 'PPO' },
  { id: 'AETNA-DC-1', name: 'Aetna DC Health Insurance', type: 'standard', state: 'DC', network: 'HMO' },
  { id: 'KAISER-DC-1', name: 'Kaiser Permanente DC', type: 'standard', state: 'DC', network: 'HMO' },
  { id: 'UNITED-DC-1', name: 'UnitedHealthcare DC Choice Plus', type: 'standard', state: 'DC', network: 'PPO' },
  { id: 'CIGNA-DC-1', name: 'Cigna DC Connect', type: 'standard', state: 'DC', network: 'HMO' },
  { id: 'AMERIHEALTH-DC-1', name: 'AmeriHealth Caritas DC', type: 'standard', state: 'DC' },
  { id: 'MEDICARE-DC-1', name: 'Medicare DC Original', type: 'standard', state: 'DC' },
  { id: 'MEDICAID-DC-1', name: 'DC Medicaid', type: 'standard', state: 'DC' },
  
  // Maryland Plans
  { id: 'CAREFIRST-MD-1', name: 'CareFirst BlueCross BlueShield Maryland', type: 'standard', state: 'MD', network: 'PPO' },
  { id: 'KAISER-MD-1', name: 'Kaiser Permanente Maryland', type: 'standard', state: 'MD', network: 'HMO' },
  { id: 'UNITED-MD-1', name: 'UnitedHealthcare Maryland Choice', type: 'standard', state: 'MD', network: 'PPO' },
  { id: 'AETNA-MD-1', name: 'Aetna Maryland Health', type: 'standard', state: 'MD', network: 'HMO' },
  { id: 'CIGNA-MD-1', name: 'Cigna Maryland Connect', type: 'standard', state: 'MD', network: 'HMO' },
  { id: 'MEDICARE-MD-1', name: 'Medicare Maryland Original', type: 'standard', state: 'MD' },
  { id: 'MEDICAID-MD-1', name: 'Maryland Medicaid', type: 'standard', state: 'MD' },
  { id: 'PRIORITY-MD-1', name: 'Priority Partners Maryland', type: 'standard', state: 'MD' },
  
  // Virginia Plans
  { id: 'ANTHEM-VA-1', name: 'Anthem HealthKeepers Virginia', type: 'standard', state: 'VA', network: 'HMO' },
  { id: 'CAREFIRST-VA-1', name: 'CareFirst BlueCross BlueShield Virginia', type: 'standard', state: 'VA', network: 'PPO' },
  { id: 'KAISER-VA-1', name: 'Kaiser Permanente Virginia', type: 'standard', state: 'VA', network: 'HMO' },
  { id: 'UNITED-VA-1', name: 'UnitedHealthcare Virginia Options', type: 'standard', state: 'VA', network: 'PPO' },
  { id: 'AETNA-VA-1', name: 'Aetna Virginia Innovation Health', type: 'standard', state: 'VA', network: 'HMO' },
  { id: 'MEDICARE-VA-1', name: 'Medicare Virginia Original', type: 'standard', state: 'VA' },
  { id: 'MEDICAID-VA-1', name: 'Virginia Medicaid', type: 'standard', state: 'VA' },
  { id: 'OPTIMA-VA-1', name: 'Optima Health Virginia', type: 'standard', state: 'VA', network: 'HMO' },
  
  // Regional Case Plans
  { id: 'CASE-DC-1', name: 'DC Government Employee Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-DC-2', name: 'World Bank Group Health Insurance', type: 'case', state: 'DC' },
  { id: 'CASE-DC-3', name: 'IMF Health Benefits Plan', type: 'case', state: 'DC' },
  { id: 'CASE-MD-1', name: 'Maryland State Employee Health Plan', type: 'case', state: 'MD' },
  { id: 'CASE-MD-2', name: 'Johns Hopkins Employee Health Plan', type: 'case', state: 'MD' },
  { id: 'CASE-VA-1', name: 'Virginia State Employee Health Plan', type: 'case', state: 'VA' },
  
  // Additional Regional Plans
  { id: 'BCBS-FEP-1', name: 'Blue Cross Blue Shield Federal Employee Program', type: 'standard', state: 'DC' },
  { id: 'GEHA-FED-1', name: 'GEHA Federal Health Plan', type: 'standard', state: 'DC' },
  { id: 'TRICARE-1', name: 'TRICARE East Region', type: 'standard', state: 'DC' },
  { id: 'MEDICARE-ADV-DC-1', name: 'Medicare Advantage DC UnitedHealthcare AARP', type: 'standard', state: 'DC' },
  { id: 'MEDICARE-ADV-MD-1', name: 'Medicare Advantage MD CareFirst Advantage', type: 'standard', state: 'MD' },
  { id: 'MEDICARE-ADV-VA-1', name: 'Medicare Advantage VA Anthem HealthKeepers', type: 'standard', state: 'VA' },
  
  // Dental Plans
  { id: 'DELTA-DENTAL-1', name: 'Delta Dental PPO - DC Metro', type: 'standard', state: 'DC', network: 'PPO' },
  { id: 'METLIFE-DENTAL-1', name: 'MetLife Dental - DC Metro', type: 'standard', state: 'DC', network: 'PPO' },
  { id: 'CIGNA-DENTAL-1', name: 'Cigna Dental - DC Metro', type: 'standard', state: 'DC', network: 'PPO' },
  
  // Vision Plans
  { id: 'VSP-1', name: 'VSP Vision - DC Metro', type: 'standard', state: 'DC' },
  { id: 'EYEMED-1', name: 'EyeMed - DC Metro', type: 'standard', state: 'DC' },
  
  // Additional Case Plans
  { id: 'CASE-NIH-1', name: 'NIH Employee Health Plan', type: 'case', state: 'MD' },
  { id: 'CASE-DOD-1', name: 'Department of Defense Health Plan', type: 'case', state: 'VA' },
  { id: 'CASE-STATE-1', name: 'US State Department Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-METRO-1', name: 'WMATA Employee Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-GWU-1', name: 'George Washington University Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-AU-1', name: 'American University Employee Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-GT-1', name: 'Georgetown University Employee Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-CUA-1', name: 'Catholic University Employee Health Plan', type: 'case', state: 'DC' },
  { id: 'CASE-HOWARD-1', name: 'Howard University Employee Health Plan', type: 'case', state: 'DC' },
  {
    id: '1',
    name: 'Tricare for Life (TRICARE)',
    type: 'standard',
    state: 'DC',
    network: 'Tricare Network',
    affiliations: ['Tricare', 'Champus', 'WPS Health Insurance', 'Wisconsin Physicians Service', 'Secondary to Medicare'],
    payerId: 'TDFIC',
    address: 'PO BOX 7890 MADISON WI 53707-7890'
  },
  {
    id: '2',
    name: 'Tricare West - TriWest (TRICARE)',
    type: 'standard',
    state: 'DC',
    network: 'Tricare Network',
    affiliations: ['Tricare', 'TriWest', 'Military and Veterans', 'United Healthcare Military and Veterans', 'Health Net Military and Veterans', 'Health Net Federal Services'],
    payerId: '99726',
    address: 'PO BOX 202160 FLORENCE SC 29502-2160'
  }
]; 
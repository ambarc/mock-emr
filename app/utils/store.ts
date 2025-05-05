// Simple store utility for managing clinical data
const STORE_KEY = 'emr_data';

interface Insurance {
  id: string;
  patientId: string;
  type: string;
  provider: string;
  policyNumber: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDOB: string;
  relationship: string;
  effectiveDate: string;
  expirationDate: string;
  cardFront: string | null;
  cardBack: string | null;
  createdAt: string;
}

interface ClinicalStore {
  medications: any[];
  problems: any[];
  allergies: any[];
  vitals: any[];
  insurance: Insurance[];
  [key: string]: any[];
}

const defaultStore: ClinicalStore = {
  medications: [],
  problems: [],
  allergies: [],
  vitals: [],
  insurance: []
};

export const store = {
  // Get all data
  getAll: (): ClinicalStore => {
    const data = localStorage.getItem(STORE_KEY);
    return data ? JSON.parse(data) : defaultStore;
  },

  // Get data for a specific domain
  get: (domain: keyof ClinicalStore): any[] => {
    const data = store.getAll();
    return data[domain] || [];
  },

  // Get patient-specific insurance data
  getPatientInsurance: (patientId: string): Insurance[] => {
    const insuranceData = store.get('insurance');
    return insuranceData.filter((insurance: Insurance) => insurance.patientId === patientId);
  },

  // Set data for a specific domain
  set: (domain: keyof ClinicalStore, items: any[]): void => {
    const data = store.getAll();
    data[domain] = items;
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  },

  // Add item to a domain
  add: (domain: keyof ClinicalStore, item: any): void => {
    const items = store.get(domain);
    store.set(domain, [...items, item]);
  },

  // Add insurance for a specific patient
  addInsurance: (patientId: string, insurance: Omit<Insurance, 'id' | 'patientId' | 'createdAt'>): void => {
    const newInsurance: Insurance = {
      ...insurance,
      id: crypto.randomUUID(),
      patientId,
      createdAt: new Date().toISOString()
    };
    store.add('insurance', newInsurance);
  },

  // Remove item from a domain by id
  remove: (domain: keyof ClinicalStore, id: string): void => {
    const items = store.get(domain);
    store.set(domain, items.filter((item: any) => item.id !== id));
  },

  // Clear all data
  clear: (): void => {
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultStore));
  }
}; 
// Simple store utility for managing clinical data
const STORE_KEY = 'emr_data';

interface ClinicalStore {
  medications: any[];
  problems: any[];
  allergies: any[];
  vitals: any[];
  [key: string]: any[];
}

const defaultStore: ClinicalStore = {
  medications: [],
  problems: [],
  allergies: [],
  vitals: []
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
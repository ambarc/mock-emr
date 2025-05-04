import { create } from 'zustand';

export interface Medication {
  product_ndc: string;
  generic_name: string;
  brand_name: string | null;
  labeler_name: string;
  dosage_form: string;
  status: 'Active' | 'Historical';
  active_ingredients: Array<{
    name: string;
    strength: string;
  }>;
}

interface MedicationStore {
  medications: Medication[];
  isLoading: boolean;
  error: string | null;
  fetchMedications: () => Promise<void>;
}

export const useMedicationStore = create<MedicationStore>((set) => ({
  medications: [],
  isLoading: false,
  error: null,
  fetchMedications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/medications');
      if (!response.ok) {
        throw new Error('Failed to fetch medications');
      }
      const data = await response.json();
      set({ medications: data.medications || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
})); 
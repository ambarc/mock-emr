import { Medication } from './types';
import MiniSearch from 'minisearch';
import medicationsData from './data.json';

interface SearchDocument {
  id: string;
  generic_name: string;
  brand_name: string;
  active_ingredients: { name: string; strength: string; }[];
  dosage_form: string;
  [key: string]: any;
}

let searchIndex: MiniSearch<SearchDocument> | null = null;
let indexError: Error | null = null;

// Try to initialize the search index
try {
  searchIndex = new MiniSearch<SearchDocument>({
    fields: ['generic_name', 'brand_name', 'active_ingredients.name', 'dosage_form'],
    storeFields: [
      'product_ndc',
      'generic_name',
      'brand_name',
      'active_ingredients',
      'dosage_form',
      'labeler_name',
      'packaging'
    ],
    extractField: (document: SearchDocument, fieldName: string) => {
      if (fieldName === 'active_ingredients.name') {
        return document.active_ingredients?.map(i => i.name).join(' ') || '';
      }
      return document[fieldName];
    },
    searchOptions: {
      boost: { generic_name: 2, brand_name: 2 },
      prefix: true,
      fuzzy: 0.2
    }
  });

  // Index all medications
  const medications: Medication[] = (medicationsData as any).results || [];
  
  // Create a Map to deduplicate medications by product_ndc
  const uniqueMedications = new Map();
  medications.forEach(med => {
    if (!uniqueMedications.has(med.product_ndc)) {
      uniqueMedications.set(med.product_ndc, med);
    }
  });

  // Convert back to array and add to index
  const dedupedMedications = Array.from(uniqueMedications.values());
  searchIndex.addAll(dedupedMedications.map(med => ({ ...med, id: med.product_ndc })));

} catch (error) {
  console.error('Failed to initialize search index:', error);
  indexError = error as Error;
}

interface SearchOptions {
  query: string;
  page?: number;
  pageSize?: number;
  dosageForm?: string;
}

export function searchMedications({ 
  query, 
  page = 1, 
  pageSize = 10,
  dosageForm 
}: SearchOptions) {
  if (indexError) {
    throw new Error('Search index failed to initialize: ' + indexError.message);
  }
  
  if (!searchIndex) {
    throw new Error('Search index not initialized');
  }

  // Search with MiniSearch
  let results = searchIndex.search(query, {
    filter: (result: SearchDocument) => {
      if (dosageForm) {
        return result.dosage_form.toLowerCase() === dosageForm.toLowerCase();
      }
      return true;
    }
  });

  // Calculate pagination
  const total = results.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  // Return paginated results
  return {
    medications: results.slice(start, end).map(result => ({
      ...result,
      score: result.score
    })),
    total,
    page,
    pageSize
  };
}

// Get unique dosage forms for filtering
export function getDosageForms(): string[] {
  return [...new Set(medications.map(med => med.dosage_form))].sort();
}

// Get medication by NDC
export function getMedicationByNDC(ndc: string): Medication | undefined {
  return medications.find(med => med.product_ndc === ndc);
} 
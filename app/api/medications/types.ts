export interface ActiveIngredient {
  name: string;
  strength: string;
}

export interface Package {
  package_ndc: string;
  description: string;
  marketing_start_date: string;
  sample: boolean;
}

export interface Medication {
  product_ndc: string;
  generic_name: string;
  labeler_name: string;
  brand_name: string;
  active_ingredients: ActiveIngredient[];
  finished: boolean;
  packaging: Package[];
  listing_expiration_date: string;
  marketing_category: string;
  dosage_form: string;
  spl_id: string;
}

export interface SearchResponse {
  medications: Medication[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
  dosageForm?: string;
} 
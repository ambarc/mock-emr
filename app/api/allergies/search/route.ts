import { NextResponse } from 'next/server';

// Mock allergies database
const allergiesDatabase = [
  {
    id: '1',
    name: 'Penicillin',
    type: 'Drug',
    severity: 'Severe',
    reaction: 'Anaphylaxis',
    description: 'Beta-lactam antibiotic',
    score: 0.95
  },
  {
    id: '2',
    name: 'Peanuts',
    type: 'Food',
    severity: 'Severe',
    reaction: 'Anaphylaxis',
    description: 'Tree nut allergy',
    score: 0.9
  },
  {
    id: '3',
    name: 'Dust Mites',
    type: 'Environmental',
    severity: 'Moderate',
    reaction: 'Respiratory distress',
    description: 'Common household allergen',
    score: 0.85
  },
  {
    id: '4',
    name: 'Sulfa Drugs',
    type: 'Drug',
    severity: 'Moderate',
    reaction: 'Skin rash',
    description: 'Sulfonamide antibiotics',
    score: 0.8
  },
  {
    id: '5',
    name: 'Latex',
    type: 'Environmental',
    severity: 'Moderate',
    reaction: 'Contact dermatitis',
    description: 'Natural rubber latex',
    score: 0.75
  },
  {
    id: '6',
    name: 'Shellfish',
    type: 'Food',
    severity: 'Severe',
    reaction: 'Anaphylaxis',
    description: 'Crustacean and mollusks',
    score: 0.7
  },
  {
    id: '7',
    name: 'Aspirin',
    type: 'Drug',
    severity: 'Mild',
    reaction: 'Respiratory symptoms',
    description: 'NSAIDs sensitivity',
    score: 0.65
  },
  {
    id: '8',
    name: 'Pet Dander',
    type: 'Environmental',
    severity: 'Mild',
    reaction: 'Allergic rhinitis',
    description: 'Animal allergens',
    score: 0.6
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  // Simple search implementation
  const results = allergiesDatabase
    .filter(allergy => 
      allergy.name.toLowerCase().includes(query) ||
      allergy.type.toLowerCase().includes(query) ||
      allergy.reaction.toLowerCase().includes(query) ||
      allergy.description.toLowerCase().includes(query)
    )
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({
    allergies: results,
    total: results.length,
    page: 1,
    pageSize: 10
  });
} 
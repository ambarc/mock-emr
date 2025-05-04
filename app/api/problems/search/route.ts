import { NextResponse } from 'next/server';

// Mock problems database
const problemsDatabase = [
  {
    id: '1',
    name: 'Hypertension',
    icd10_code: 'I10',
    category: 'Cardiovascular',
    description: 'High blood pressure',
    score: 0.95
  },
  {
    id: '2',
    name: 'Type 2 Diabetes Mellitus',
    icd10_code: 'E11',
    category: 'Endocrine',
    description: 'Adult-onset diabetes',
    score: 0.9
  },
  {
    id: '3',
    name: 'Major Depressive Disorder',
    icd10_code: 'F32.9',
    category: 'Mental Health',
    description: 'Clinical depression',
    score: 0.85
  },
  {
    id: '4',
    name: 'Asthma',
    icd10_code: 'J45',
    category: 'Respiratory',
    description: 'Chronic airway inflammation',
    score: 0.8
  },
  {
    id: '5',
    name: 'Osteoarthritis',
    icd10_code: 'M15',
    category: 'Musculoskeletal',
    description: 'Degenerative joint disease',
    score: 0.75
  },
  {
    id: '6',
    name: 'Anxiety Disorder',
    icd10_code: 'F41.9',
    category: 'Mental Health',
    description: 'Generalized anxiety',
    score: 0.7
  },
  {
    id: '7',
    name: 'GERD',
    icd10_code: 'K21',
    category: 'Digestive',
    description: 'Gastroesophageal reflux disease',
    score: 0.65
  },
  {
    id: '8',
    name: 'Migraine',
    icd10_code: 'G43',
    category: 'Neurological',
    description: 'Chronic headache disorder',
    score: 0.6
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  // Simple search implementation
  const results = problemsDatabase
    .filter(problem => 
      problem.name.toLowerCase().includes(query) ||
      problem.icd10_code.toLowerCase().includes(query) ||
      problem.category.toLowerCase().includes(query) ||
      problem.description.toLowerCase().includes(query)
    )
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({
    problems: results,
    total: results.length,
    page: 1,
    pageSize: 10
  });
} 
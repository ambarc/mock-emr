import { NextRequest, NextResponse } from 'next/server';
import { searchMedications, getDosageForms } from './search';
import { SearchParams } from './types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const dosageForm = searchParams.get('dosageForm') || undefined;

    if (!query) {
      return NextResponse.json({
        error: 'Search query is required'
      }, { status: 400 });
    }

    const results = searchMedications({
      query,
      page,
      pageSize,
      dosageForm
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Get available dosage forms for filtering
export async function OPTIONS() {
  try {
    const dosageForms = getDosageForms();
    return NextResponse.json({ dosageForms });
  } catch (error) {
    console.error('Error getting dosage forms:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
} 
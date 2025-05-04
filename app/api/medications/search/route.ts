import { NextRequest, NextResponse } from 'next/server';
import { searchMedications } from '../search';

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
    
    // Handle initialization errors specifically
    if (error instanceof Error && error.message.includes('Search index')) {
      return NextResponse.json({
        error: 'Search service is currently unavailable. Please try again later.'
      }, { status: 503 });
    }

    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
} 
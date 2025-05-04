import { NextResponse } from 'next/server';
import { getDosageForms } from '../search';

export async function GET() {
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
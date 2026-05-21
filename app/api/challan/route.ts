import { NextResponse } from 'next/server';
import lawsData from '@/data/laws.json';

export async function POST(req: Request) {
  try {
    const { district, violationTitle } = await req.json();
    
    // In a real app, we would query a DB. Here we query the JSON fallback
    const result = lawsData.find(l => 
      l.title === violationTitle && 
      (l.tier === 'state' || l.district === district)
    );

    if (result) {
      return NextResponse.json({ success: true, result });
    } else {
      return NextResponse.json({ success: false, message: 'No matching law found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

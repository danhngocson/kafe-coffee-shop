import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const stats = db.getStats();
  return NextResponse.json({ success: true, data: stats });
}

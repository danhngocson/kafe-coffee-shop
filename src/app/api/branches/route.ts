import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const branches = db.getBranches();
  return NextResponse.json({ success: true, data: branches });
}

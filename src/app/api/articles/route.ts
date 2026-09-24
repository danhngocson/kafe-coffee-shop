import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const articles = db.getArticles();
  return NextResponse.json({ success: true, data: articles });
}

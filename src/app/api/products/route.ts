import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const roastLevel = searchParams.get('roastLevel') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const products = db.getProducts(category, search, roastLevel, sort);
  return NextResponse.json({ success: true, data: products });
}

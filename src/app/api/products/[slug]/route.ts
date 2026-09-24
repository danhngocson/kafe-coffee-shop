import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = db.getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy sản phẩm cà phê.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: product });
}

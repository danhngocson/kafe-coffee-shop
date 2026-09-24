import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId') || undefined;
  const reviews = db.getReviews(productId);
  return NextResponse.json({ success: true, data: reviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, author, rating, comment } = body;

    if (!productId || !author || !rating || !comment) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp đầy đủ thông tin đánh giá.' },
        { status: 400 }
      );
    }

    const newReview = db.addReview({
      productId,
      author,
      rating: Number(rating),
      comment,
      verified: true
    });

    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi gửi đánh giá.', error: String(error) },
      { status: 500 }
    );
  }
}

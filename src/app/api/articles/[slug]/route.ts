import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = db.getArticleBySlug(slug);

  if (!article) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy bài viết.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: article });
}

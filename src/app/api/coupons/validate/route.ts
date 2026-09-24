import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập mã ưu đãi.' },
        { status: 400 }
      );
    }

    const result = db.validateVoucher(code, subtotal || 0);
    return NextResponse.json({ success: result.valid, ...result });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi kiểm tra mã giảm giá.', error: String(error) },
      { status: 500 }
    );
  }
}

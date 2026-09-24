import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const orders = db.getOrders();
  return NextResponse.json({ success: true, data: orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phone, email, address, city, note, items, subtotal, shippingFee, discount, total, paymentMethod } = body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp đầy đủ thông tin giao hàng và sản phẩm.' },
        { status: 400 }
      );
    }

    const newOrder = db.createOrder({
      customerName,
      phone,
      email: email || '',
      address,
      city: city || 'Toàn quốc',
      note: note || '',
      items,
      subtotal,
      shippingFee,
      discount,
      total,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'vietqr' ? 'paid' : 'pending'
    });

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi xử lý tạo đơn hàng.', error: String(error) },
      { status: 500 }
    );
  }
}

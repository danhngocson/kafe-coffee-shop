import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = db.getOrderById(id);

  if (!order) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy đơn hàng với mã này.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: order });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, paymentStatus } = body;

    const updated = db.updateOrderStatus(id, status, paymentStatus);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy đơn hàng để cập nhật.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi cập nhật đơn hàng.', error: String(error) },
      { status: 500 }
    );
  }
}

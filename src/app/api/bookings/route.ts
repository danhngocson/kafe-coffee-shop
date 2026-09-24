import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const bookings = db.getBookings();
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, date, timeSlot, guestCount, workshopType, branch, note } = body;

    if (!fullName || !phone || !date || !timeSlot || !workshopType || !branch) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng điền đầy đủ các thông tin bắt buộc.' },
        { status: 400 }
      );
    }

    const newBooking = db.createBooking({
      fullName,
      phone,
      email: email || '',
      date,
      timeSlot,
      guestCount: Number(guestCount) || 1,
      workshopType,
      branch,
      note: note || ''
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi gửi đăng ký.', error: String(error) },
      { status: 500 }
    );
  }
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Award, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface Workshop {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  highlights: string[];
}

const WORKSHOPS: Workshop[] = [
  {
    id: 'cupping',
    name: 'Khám Phá Hương Vị Cà Phê Đặc Sản (Cupping Session)',
    duration: '120 Phút',
    price: 250000,
    description: 'Học cách nhận biết 36 nốt hương vị cà phê (Trái cây, Socola, Mật ong, Hoa lá) theo vòng hương vị SCA quốc tế cùng Q-Grader.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    highlights: ['Thử nếm 6 dòng hạt đặc sản Việt & Thế giới', 'Tặng 1 túi hạt 100g tự chọn', 'Chứng nhận tham gia']
  },
  {
    id: 'latte-art',
    name: 'Nghệ Thuật Vẽ Sữa Latte Art Căn Bản',
    duration: '150 Phút',
    price: 350000,
    description: 'Kỹ thuật đánh sữa mịn màng chuẩn foam micro và thực hành đổ hình trái tim (Heart), hoa tulip trên nền cà phê espresso.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    highlights: ['Thực hành trên máy pha chuyên nghiệp', 'Không giới hạn sữa thực hành', 'Barista kèm 1-1']
  },
  {
    id: 'phin-mastery',
    name: 'Master Class: Nâng Tầm Ly Cà Phê Phin Việt',
    duration: '90 Phút',
    price: 190000,
    description: 'Tìm hiểu sâu về nhiệt độ, áp suất nén và tỉ lệ hạt Robusta Fine để tạo ra ly cà phê phin sánh đậm, hậu ngọt sâu không gắt.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
    highlights: ['Tặng kèm 01 phin nhôm mạ anodized cao cấp', 'Công thức cà phê muối & trứng gia truyền']
  }
];

export default function BookingPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(WORKSHOPS[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('KAFÉ Flagship Roastery Thảo Điền (TP.HCM)');
  const [date, setDate] = useState('2026-09-26');
  const [timeSlot, setTimeSlot] = useState('09:30 - 11:30 (Buổi Sáng)');
  const [guestCount, setGuestCount] = useState(2);
  const [note, setNote] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ id: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !date) {
      setErrorMsg('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          branch,
          date,
          timeSlot,
          guestCount,
          workshopType: selectedWorkshop.name,
          note
        })
      });

      const data = await res.json();
      if (data.success) {
        setBookingResult(data.data);
      } else {
        setErrorMsg(data.message || 'Có lỗi khi đặt lịch.');
      }
    } catch {
      setErrorMsg('Không thể kết nối đến máy chủ.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-espresso-950), var(--color-espresso-900))',
          color: '#fff',
          padding: '60px 0 50px',
          borderBottom: '1px solid var(--color-border-dark)'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} /> KAFÉ Coffee Lab
          </span>
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', color: '#fff', marginBottom: '16px' }}>
            Workshop & Trải Nghiệm Thử Nếm
          </h1>
          <p style={{ color: '#d6c5b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Tự tay trải nghiệm quá trình thử nếm cupping, đổ hình sữa latte art và tìm hiểu bí mật đằng sau những tách cà phê thượng hạng cùng nghệ nhân KAFÉ.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {bookingResult ? (
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: '#fff',
              padding: '40px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <CheckCircle2 size={38} />
            </div>

            <h2 className="heading-serif" style={{ fontSize: '1.8rem', color: 'var(--color-espresso-950)', marginBottom: '10px' }}>
              Đặt Chỗ Thành Công!
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Mã xác nhận giữ chỗ của bạn là: <strong style={{ color: 'var(--color-roast-amber)', fontSize: '1.1rem' }}>{bookingResult.id}</strong>
            </p>

            <div style={{ background: 'var(--color-cream-100)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <div><strong>Họ tên:</strong> {fullName}</div>
              <div><strong>Khóa trải nghiệm:</strong> {selectedWorkshop.name}</div>
              <div><strong>Thời gian:</strong> {date} ({timeSlot})</div>
              <div><strong>Địa điểm:</strong> {branch}</div>
              <div><strong>Số người:</strong> {guestCount} người</div>
              <div><strong>Học phí:</strong> {(selectedWorkshop.price * guestCount).toLocaleString('vi-VN')}₫ (Thanh toán tại quầy khi đến)</div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              Chúng tôi đã gửi tin nhắn xác nhận đến số điện thoại <strong>{phone}</strong>. Hẹn gặp bạn tại buổi trải nghiệm!
            </p>

            <button onClick={() => setBookingResult(null)} className="btn btn-primary">
              Đặt Thêm Buổi Khác
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'start' }}>
            {/* Left: Select workshop type */}
            <div>
              <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: 'var(--color-espresso-950)', marginBottom: '20px' }}>
                1. Chọn Khóa Trải Nghiệm
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {WORKSHOPS.map(ws => (
                  <div
                    key={ws.id}
                    onClick={() => setSelectedWorkshop(ws)}
                    style={{
                      display: 'flex',
                      gap: '18px',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedWorkshop.id === ws.id ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                      background: selectedWorkshop.id === ws.id ? 'var(--color-cream-100)' : '#fff',
                      cursor: 'pointer',
                      boxShadow: selectedWorkshop.id === ws.id ? 'var(--shadow-sm)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={ws.image} alt={ws.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>{ws.name}</h4>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                        Thời lượng: {ws.duration} • <strong style={{ color: 'var(--color-roast-amber)' }}>{ws.price.toLocaleString('vi-VN')}₫/khách</strong>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {ws.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking Form */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                padding: '30px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: 'var(--color-espresso-950)', marginBottom: '20px' }}>
                2. Thông Tin Đặt Lịch
              </h3>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Họ và tên học viên <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Số điện thoại <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Email nhận thư mời:
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Chọn chi nhánh trạm rang:
                  </label>
                  <select
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', background: '#fff' }}
                  >
                    <option value="KAFÉ Flagship Roastery Thảo Điền (TP.HCM)">KAFÉ Flagship Roastery Thảo Điền (TP. Thủ Đức, TP.HCM)</option>
                    <option value="KAFÉ Heritage Nhà Cổ Hoàn Kiếm (Hà Nội)">KAFÉ Heritage Nhà Cổ (Quận Hoàn Kiếm, Hà Nội)</option>
                    <option value="KAFÉ Farmhouse Cầu Đất (Đà Lạt)">KAFÉ Farmhouse Cầu Đất (TP. Đà Lạt, Lâm Đồng)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Ngày tham gia:
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', background: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Khung giờ:
                    </label>
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', background: '#fff' }}
                    >
                      <option value="09:30 - 11:30 (Buổi Sáng)">09:30 - 11:30 (Buổi Sáng)</option>
                      <option value="14:30 - 16:30 (Buổi Chiều)">14:30 - 16:30 (Buổi Chiều)</option>
                      <option value="18:30 - 20:30 (Buổi Tối)">18:30 - 20:30 (Buổi Tối)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Số lượng khách đăng ký:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuestCount(num)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          border: guestCount === num ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                          background: guestCount === num ? 'var(--color-espresso-900)' : '#fff',
                          color: guestCount === num ? '#fff' : 'var(--color-espresso-950)',
                          fontWeight: 700
                        }}
                      >
                        {num}
                      </button>
                    ))}
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>người</span>
                  </div>
                </div>

                <div style={{ padding: '14px', background: 'var(--color-cream-100)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tạm tính học phí:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-roast-amber)' }}>
                    {(selectedWorkshop.price * guestCount).toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '14px', fontSize: '1.02rem' }}
                >
                  {submitting ? 'Đang gửi đăng ký...' : 'Xác Nhận Giữ Chỗ'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

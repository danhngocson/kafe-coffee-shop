'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Branch } from '@/types';
import { MapPin, Phone, Clock, Mail, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadBranches() {
      try {
        const res = await fetch('/api/branches');
        const data = await res.json();
        if (data.success) {
          setBranches(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadBranches();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
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
            <MapPin size={14} /> Hệ Thống Cửa Hàng
          </span>
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', color: '#fff', marginBottom: '16px' }}>
            Không Gian Trải Nghiệm & Liên Hệ
          </h1>
          <p style={{ color: '#d6c5b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Ghé thăm các xưởng rang trực tiếp của KAFÉ tại TP. Hồ Chí Minh, Hà Nội và Đà Lạt để thưởng thức tách cà phê thơm nóng và hít thở mùi hương hạt rang mộc.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {/* Branches Grid */}
        <h2 className="heading-serif" style={{ fontSize: '1.8rem', color: 'var(--color-espresso-950)', marginBottom: '28px', textAlign: 'center' }}>
          Danh Sách Trạm Rang KAFÉ
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '70px' }}>
          {branches.map(branch => (
            <div
              key={branch.id}
              style={{
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <Image src={branch.image} alt={branch.name} fill style={{ objectFit: 'cover' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'var(--color-espresso-900)',
                    color: 'var(--color-gold-light)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {branch.city}
                </span>
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '12px' }}>
                  {branch.name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <MapPin size={18} color="var(--color-roast-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{branch.address}, {branch.district}, {branch.city}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Phone size={18} color="var(--color-roast-amber)" style={{ flexShrink: 0 }} />
                    <span>{branch.phone}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Clock size={18} color="var(--color-roast-amber)" style={{ flexShrink: 0 }} />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                {/* Features tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {branch.features.map((feat, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--color-cream-100)',
                        color: 'var(--color-espresso-800)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & Direct Support */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Hỗ Trợ Nhanh</span>
            <h3 className="heading-serif" style={{ fontSize: '1.8rem', color: 'var(--color-espresso-950)', marginBottom: '16px' }}>
              Bạn Cần Tư Vấn Gu Cà Phê Hay Đặt Hàng Doanh Nghiệp?
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
              Đội ngũ Barista và tư vấn viên KAFÉ luôn sẵn sàng hỗ trợ bạn chọn đúng loại hạt, cỡ xay phù hợp với máy pha tại gia, hoặc cung cấp gói hạt cà phê sỉ cho quán cà phê và văn phòng.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <Phone size={22} color="var(--color-roast-amber)" />
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Hotline Đặt Hàng & Tư Vấn</span>
                  <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-espresso-950)' }}>1900 6868 (Phím 1)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <Mail size={22} color="var(--color-roast-amber)" />
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Hợp Tác Doanh Nghiệp & Sỉ Hạt</span>
                  <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-espresso-950)' }}>b2b@kaferoastery.vn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '18px' }}>
              Gửi Tin Nhắn Cho KAFÉ
            </h4>

            {submitted && (
              <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} />
                <span>Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ phản hồi trong 30 phút.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Họ và tên của bạn:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Số điện thoại liên lạc:
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

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Nội dung cần hỗ trợ:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tư vấn chọn hạt cà phê, hợp tác phân phối sỉ, hoặc phản hồi dịch vụ..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={16} /> Gửi Yêu Cầu Hỗ Trợ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

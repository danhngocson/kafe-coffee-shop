'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Order } from '@/types';
import { Search, PackageCheck, Clock, Truck, CheckCircle2, AlertCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearchOrder = async (searchId: string) => {
    if (!searchId.trim()) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/orders/${searchId.trim()}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
      } else {
        setOrder(null);
        setErrorMsg('Không tìm thấy đơn hàng với mã này. Vui lòng kiểm tra lại!');
      }
    } catch {
      setErrorMsg('Không thể tra cứu đơn hàng vào lúc này.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      handleSearchOrder(initialOrderId);
    }
  }, [initialOrderId]);

  // Determine active step index
  const getStepStatus = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 1;
      case 'roasting': return 2;
      case 'shipping': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = order ? getStepStatus(order.status) : 0;

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-espresso-950), var(--color-espresso-900))',
          color: '#fff',
          padding: '60px 0 50px',
          borderBottom: '1px solid var(--color-border-dark)'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Real-time Tracking</span>
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '16px' }}>
            Tra Cứu Hành Trình Đơn Hàng
          </h1>
          <p style={{ color: '#d6c5b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
            Nhập mã đơn hàng KAFÉ (ví dụ: <strong style={{ color: 'var(--color-gold-light)' }}>KAFE-89214</strong>) để theo dõi tiến độ rang xay và vận chuyển gói cà phê của bạn.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearchOrder(orderIdInput);
            }}
            style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '480px',
              margin: '0 auto',
              background: '#fff',
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <input
              type="text"
              placeholder="Nhập mã đơn hàng (KAFE-XXXXX)..."
              value={orderIdInput}
              onChange={e => setOrderIdInput(e.target.value)}
              style={{
                flexGrow: 1,
                border: 'none',
                outline: 'none',
                padding: '10px 20px',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-full)'
              }}
            />
            <button type="submit" disabled={loading} className="btn btn-gold btn-sm">
              <Search size={16} /> {loading ? 'Đang tìm...' : 'Tra Cứu'}
            </button>
          </form>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {errorMsg && (
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto 40px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <AlertCircle size={22} />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Order Details View */}
        {order && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            {/* Top Bar with Tracking ID */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                padding: '24px 30px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '30px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Mã Đơn Hàng:
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-roast-amber)' }}>
                  {order.id}
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Đặt lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    background: order.paymentStatus === 'paid' ? '#dcfce7' : '#fef3c7',
                    color: order.paymentStatus === 'paid' ? '#166534' : '#b45309'
                  }}
                >
                  {order.paymentStatus === 'paid' ? '✓ Đã Thanh Toán' : 'Chưa Thanh Toán (COD)'}
                </span>

                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Vận đơn: <strong>{order.trackingCode}</strong>
                </span>
              </div>
            </div>

            {/* Visual Timeline Tracking */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                padding: '36px 30px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '30px'
              }}
            >
              <h3 className="heading-serif" style={{ fontSize: '1.25rem', marginBottom: '30px', color: 'var(--color-espresso-950)' }}>
                Tiến Độ Giao Hàng Thời Gian Thực
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center', position: 'relative' }}>
                {/* Step 1 */}
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      margin: '0 auto 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: currentStep >= 1 ? 'var(--color-espresso-900)' : '#f3f4f6',
                      color: currentStep >= 1 ? 'var(--color-gold-warm)' : '#9ca3af',
                      fontWeight: 700
                    }}
                  >
                    <PackageCheck size={20} />
                  </div>
                  <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: currentStep >= 1 ? 'var(--color-espresso-950)' : '#9ca3af' }}>
                    Đã Nhận Đơn
                  </h5>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Hệ thống xác nhận</span>
                </div>

                {/* Step 2 */}
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      margin: '0 auto 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: currentStep >= 2 ? 'var(--color-espresso-900)' : '#f3f4f6',
                      color: currentStep >= 2 ? 'var(--color-gold-warm)' : '#9ca3af',
                      fontWeight: 700
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: currentStep >= 2 ? 'var(--color-espresso-950)' : '#9ca3af' }}>
                    Rang & Xay Hạt
                  </h5>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Đóng van 1 chiều</span>
                </div>

                {/* Step 3 */}
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      margin: '0 auto 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: currentStep >= 3 ? 'var(--color-espresso-900)' : '#f3f4f6',
                      color: currentStep >= 3 ? 'var(--color-gold-warm)' : '#9ca3af',
                      fontWeight: 700
                    }}
                  >
                    <Truck size={20} />
                  </div>
                  <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: currentStep >= 3 ? 'var(--color-espresso-950)' : '#9ca3af' }}>
                    Đang Giao Hàng
                  </h5>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Shipper trên đường</span>
                </div>

                {/* Step 4 */}
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      margin: '0 auto 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: currentStep >= 4 ? '#16a34a' : '#f3f4f6',
                      color: currentStep >= 4 ? '#fff' : '#9ca3af',
                      fontWeight: 700
                    }}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: currentStep >= 4 ? '#16a34a' : '#9ca3af' }}>
                    Đã Giao Xong
                  </h5>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Thưởng thức tách ngon</span>
                </div>
              </div>
            </div>

            {/* Recipient Details & Items Table */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Delivery Address */}
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '14px' }}>
                  Địa Chỉ Nhận Hàng
                </h4>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{order.customerName}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>SĐT: {order.phone}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{order.address}, {order.city}</p>
                {order.note && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                    Ghi chú: &quot;{order.note}&quot;
                  </p>
                )}
              </div>

              {/* Payment Summary */}
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '14px' }}>
                  Chi Phí Đơn Hàng
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px' }}>
                  <span>Tiền hàng:</span>
                  <span>{order.subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px' }}>
                  <span>Phí ship:</span>
                  <span>{order.shippingFee === 0 ? 'Miễn phí' : `${order.shippingFee.toLocaleString('vi-VN')}₫`}</span>
                </div>
                {order.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#16a34a', marginBottom: '8px' }}>
                    <span>Giảm giá:</span>
                    <span>-{order.discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-roast-amber)', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                  <span>Tổng thanh toán:</span>
                  <span>{order.total.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            </div>

            {/* Items list */}
            <div
              style={{
                marginTop: '24px',
                background: 'var(--color-bg-card)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '16px' }}>
                Sản Phẩm Trong Gói Hàng
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={item.productImage} alt={item.productName} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ fontSize: '0.92rem', fontWeight: 700 }}>{item.productName}</h5>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        {item.weight}g • {item.grind} • Số lượng: x{item.quantity}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Đang tải thông tin tra cứu...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}

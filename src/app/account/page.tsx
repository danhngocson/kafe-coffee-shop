'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Order } from '@/types';
import { User, Award, Package, MapPin, Tag, Copy, Check, Clock, ChevronRight, Compass } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AccountPage() {
  const { showToast } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Đã sao chép mã ưu đãi ${code}!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-espresso-950), var(--color-espresso-900))',
          color: '#fff',
          padding: '50px 0',
          borderBottom: '1px solid var(--color-border-dark)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-roast-amber), var(--color-gold-warm))',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(196, 130, 63, 0.4)'
              }}
            >
              VA
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 className="heading-serif" style={{ fontSize: '1.8rem', color: '#fff' }}>
                  Nguyễn Văn An
                </h1>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                  <Award size={12} /> Hạng Vàng (Gold Roaster)
                </span>
              </div>
              <p style={{ color: '#d6c5b8', fontSize: '0.88rem', marginTop: '4px' }}>
                Thành viên gắn bó từ 2025 • an.nguyen@gmail.com • 0912 345 678
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Loyalty Point & Voucher Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          {/* Coffee Points */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2a1b12, #180e09)',
              color: '#fff',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(217, 159, 89, 0.3)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-warm)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Điểm Thưởng Tích Lũy
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-gold-light)', margin: '6px 0' }}>
              850 <span style={{ fontSize: '1rem', fontWeight: 400, color: '#d6c5b8' }}>Hạt Vàng</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#b5a498' }}>
              Đổi ngay 01 gói cà phê mộc hoặc ly Cold Brew miễn phí tại bất kỳ quầy bar nào.
            </p>
          </div>

          {/* Exclusive Vouchers */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Tag size={18} color="var(--color-roast-amber)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>
                Voucher Dành Riêng Cho Bạn
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-cream-100)', padding: '8px 12px', borderRadius: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-espresso-950)' }}>KAFE20</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginLeft: '6px' }}>-20% cho đơn từ 200k</span>
                </div>
                <button onClick={() => copyVoucher('KAFE20')} style={{ color: 'var(--color-roast-amber)', fontSize: '0.8rem', fontWeight: 700 }}>
                  {copiedCode === 'KAFE20' ? 'Đã chép' : 'Sao chép'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-cream-100)', padding: '8px 12px', borderRadius: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-espresso-950)' }}>BANME</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginLeft: '6px' }}>-30k cho Robusta Honey</span>
                </div>
                <button onClick={() => copyVoucher('BANME')} style={{ color: 'var(--color-roast-amber)', fontSize: '0.8rem', fontWeight: 700 }}>
                  {copiedCode === 'BANME' ? 'Đã chép' : 'Sao chép'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div style={{ background: 'var(--color-bg-card)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: 'var(--color-espresso-950)' }}>
              Lịch Sử Mua Hàng ({orders.length} đơn)
            </h3>
            <Link href="/shop" className="btn btn-outline btn-sm">
              Tiếp tục mua sắm
            </Link>
          </div>

          {loading ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Đang tải lịch sử đơn hàng...</p>
          ) : orders.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Bạn chưa có đơn hàng nào.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    background: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px', borderBottom: '1px solid var(--color-cream-100)', paddingBottom: '12px' }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-espresso-950)' }}>{order.id}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginLeft: '12px' }}>
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          background: order.status === 'delivered' ? '#dcfce7' : '#fef3c7',
                          color: order.status === 'delivered' ? '#166534' : '#b45309'
                        }}
                      >
                        {order.status === 'delivered' ? 'Đã Giao Xong' : order.status === 'shipping' ? 'Đang Giao Hàng' : 'Đang Xử Lý'}
                      </span>

                      <Link href={`/order-tracking?orderId=${order.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-roast-amber)', fontWeight: 700 }}>
                        <Compass size={14} /> Tra cứu
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                        <span>• {item.productName} ({item.weight}g, {item.grind}) x{item.quantity}</span>
                        <span style={{ fontWeight: 600 }}>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--color-cream-100)', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Giao đến: {order.address}, {order.city}</span>
                    <div>
                      <span>Tổng tiền: </span>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--color-roast-amber)' }}>{order.total.toLocaleString('vi-VN')}₫</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

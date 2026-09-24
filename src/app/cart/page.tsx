'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, AlertCircle, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkingCoupon, setCheckingCoupon] = useState(false);

  // Free shipping policy: Free if subtotal >= 300,000₫, else 25,000₫
  const shippingFee = cartSubtotal >= 300000 || cartSubtotal === 0 ? 0 : 25000;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const handleApplyVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCheckingCoupon(true);
    setCouponError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput.trim(), subtotal: cartSubtotal })
      });
      const data = await res.json();
      if (data.success) {
        applyCoupon(couponInput.toUpperCase(), data.discount);
        setCouponInput('');
      } else {
        setCouponError(data.message || 'Mã ưu đãi không hợp lệ.');
      }
    } catch {
      setCouponError('Không thể kiểm tra mã vào lúc này.');
    } finally {
      setCheckingCoupon(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '90px 20px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'var(--color-bg-card)',
            padding: '50px 30px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--color-cream-100)',
              color: 'var(--color-roast-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}
          >
            <ShoppingBag size={36} />
          </div>
          <h2 className="heading-serif" style={{ fontSize: '1.8rem', color: 'var(--color-espresso-950)', marginBottom: '12px' }}>
            Giỏ Hàng Của Bạn Đang Trống
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '26px', lineHeight: 1.6 }}>
            Bạn chưa thêm mẻ hạt cà phê thơm ngon nào vào giỏ. Hãy ghé thăm cửa hàng để chọn ngay loại hạt yêu thích nhé!
          </p>
          <Link href="/shop" className="btn btn-gold">
            Khám Phá Thực Đơn Cà Phê <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-cream-100)', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h1 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--color-espresso-950)' }}>
            Giỏ Hàng Của Bạn ({cart.length} món)
          </h1>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Cart items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map(item => {
              const baseWeight = item.product.weightOptions[0] || 250;
              const ratio = item.selectedWeight / baseWeight;
              const unitPrice = Math.round(item.product.price * (ratio > 1 ? ratio * 0.95 : 1));
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedWeight}-${item.selectedGrind}`}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    background: 'var(--color-bg-card)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    alignItems: 'center'
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      width: '90px',
                      height: '90px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flexGrow: 1 }}>
                    <Link href={`/shop/${item.product.slug}`}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '4px' }}>
                        {item.product.name}
                      </h4>
                    </Link>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      Khối lượng: <strong>{item.selectedWeight}g</strong> | Kiểu xay: <strong>{item.selectedGrind}</strong>
                    </p>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-roast-amber)' }}>
                      {unitPrice.toLocaleString('vi-VN')}₫
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-cream-50)'
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.selectedGrind, -1)}
                      style={{ padding: '6px 10px', color: 'var(--color-text-secondary)' }}
                      title="Giảm"
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.selectedGrind, 1)}
                      style={{ padding: '6px 10px', color: 'var(--color-text-secondary)' }}
                      title="Tăng"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Item Total & Delete */}
                  <div style={{ textAlign: 'right', minWidth: '95px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-espresso-950)', marginBottom: '8px' }}>
                      {itemTotal.toLocaleString('vi-VN')}₫
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedWeight, item.selectedGrind)}
                      style={{ color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-roast-amber)', fontWeight: 600 }}>
                <ArrowLeft size={16} /> Tiếp tục chọn thêm cà phê
              </Link>
              <button onClick={clearCart} style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                Xóa tất cả
              </button>
            </div>
          </div>

          {/* Right: Order Summary & Coupon */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: 'var(--color-espresso-950)', marginBottom: '20px' }}>
              Tóm Tắt Đơn Hàng
            </h3>

            {/* Voucher input form */}
            <form onSubmit={handleApplyVoucher} style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Mã giảm giá / Voucher:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Thử mã: KAFE20 hoặc BANME"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                />
                <button type="submit" disabled={checkingCoupon} className="btn btn-primary btn-sm">
                  {checkingCoupon ? 'Kiểm tra...' : 'Áp Dụng'}
                </button>
              </div>

              {couponError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontSize: '0.8rem', marginTop: '6px' }}>
                  <AlertCircle size={14} /> {couponError}
                </div>
              )}

              {appliedCoupon && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#166534',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    marginTop: '10px',
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={14} /> Đã áp dụng mã: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount.toLocaleString('vi-VN')}₫)
                  </span>
                  <button onClick={removeCoupon} style={{ color: '#dc2626', fontSize: '0.78rem', fontWeight: 600 }}>
                    Hủy
                  </button>
                </div>
              )}
            </form>

            {/* Calculations breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
                <span>Tạm tính tiền hàng:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-espresso-950)' }}>{cartSubtotal.toLocaleString('vi-VN')}₫</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
                <span>Phí vận chuyển:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong style={{ color: '#16a34a' }}>Miễn phí giao hàng</strong>
                  ) : (
                    `${shippingFee.toLocaleString('vi-VN')}₫`
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#16a34a' }}>
                  <span>Giảm giá voucher:</span>
                  <span style={{ fontWeight: 700 }}>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}

              {/* Free shipping banner if under 300k */}
              {cartSubtotal < 300000 && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-roast-amber)', background: 'var(--color-cream-100)', padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}>
                  Mua thêm {(300000 - cartSubtotal).toLocaleString('vi-VN')}₫ để được Miễn Phí Vận Chuyển toàn quốc!
                </p>
              )}
            </div>

            {/* Total */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderTop: '2px solid var(--color-border)',
                paddingTop: '18px',
                marginBottom: '26px'
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>Tổng thanh toán:</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-roast-amber)' }}>
                {grandTotal.toLocaleString('vi-VN')}₫
              </span>
            </div>

            <Link href="/checkout" className="btn btn-gold" style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}>
              Tiến Hành Thanh Toán <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

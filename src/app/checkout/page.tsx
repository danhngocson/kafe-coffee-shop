'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CreditCard, Truck, QrCode, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, appliedCoupon, clearCart, showToast } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hồ Chí Minh');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'momo' | 'vnpay'>('vietqr');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shippingFee = cartSubtotal >= 300000 || cartSubtotal === 0 ? 0 : 25000;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Bạn chưa có sản phẩm nào trong giỏ để thanh toán.</h2>
        <Link href="/shop" className="btn btn-gold" style={{ marginTop: '20px' }}>
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const orderItems = cart.map(item => {
        const baseWeight = item.product.weightOptions[0] || 250;
        const ratio = item.selectedWeight / baseWeight;
        const unitPrice = Math.round(item.product.price * (ratio > 1 ? ratio * 0.95 : 1));

        return {
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          price: unitPrice,
          quantity: item.quantity,
          weight: item.selectedWeight,
          grind: item.selectedGrind
        };
      });

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          address,
          city,
          note,
          items: orderItems,
          subtotal: cartSubtotal,
          shippingFee,
          discount: discountAmount,
          total: grandTotal,
          paymentMethod
        })
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        showToast('Đặt hàng thành công! Mã đơn: ' + data.data.id);
        router.push(`/order-tracking?orderId=${data.data.id}`);
      } else {
        setErrorMsg(data.message || 'Có lỗi xảy ra khi tạo đơn hàng.');
      }
    } catch {
      setErrorMsg('Không thể kết nối máy chủ để đặt hàng.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-cream-100)', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link href="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-roast-amber)', marginBottom: '4px' }}>
              <ArrowLeft size={14} /> Quay lại giỏ hàng
            </Link>
            <h1 className="heading-serif" style={{ fontSize: '1.9rem', color: 'var(--color-espresso-950)' }}>
              Thông Tin Giao Hàng & Thanh Toán
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '0.85rem', fontWeight: 600 }}>
            <Lock size={16} /> Thanh toán bảo mật SSL 256-bit
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <form onSubmit={handleSubmitOrder}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px', alignItems: 'start' }}>
            {/* Left: Shipping Form & Payment Method */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Shipping info box */}
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 className="heading-serif" style={{ fontSize: '1.3rem', color: 'var(--color-espresso-950)', marginBottom: '20px' }}>
                  1. Địa Chỉ Nhận Hàng
                </h3>

                {errorMsg && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Họ và tên người nhận <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                    />
                  </div>
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
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Địa chỉ email (nhận hóa đơn điện tử & theo dõi):
                  </label>
                  <input
                    type="email"
                    placeholder="nguyenvana@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Địa chỉ chi tiết (Số nhà, tên đường, phường/xã) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Số 123 Đường Nguyễn Huệ, Phường Bến Nghé"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', background: '#fff' }}
                    >
                      <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Lâm Đồng">Lâm Đồng (Đà Lạt)</option>
                      <option value="Đắk Lắk">Đắk Lắk (Buôn Ma Thuột)</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Khác">Tỉnh thành khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Ghi chú cho xưởng rang hoặc shipper:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Payment method selection box */}
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 className="heading-serif" style={{ fontSize: '1.3rem', color: 'var(--color-espresso-950)', marginBottom: '20px' }}>
                  2. Phương Thức Thanh Toán
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* VietQR Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'vietqr' ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                      background: paymentMethod === 'vietqr' ? 'var(--color-cream-100)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                    />
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={22} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Quét Mã VietQR (Chuyển khoản tức thì mọi Ngân hàng)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Miễn phí giao dịch, xác nhận tự động 24/7</div>
                    </div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>Khuyên dùng</span>
                  </label>

                  {/* COD Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'cod' ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                      background: paymentMethod === 'cod' ? 'var(--color-cream-100)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Truck size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Thanh toán khi nhận hàng (COD)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Kiểm tra hàng trước khi thanh toán tiền mặt</div>
                    </div>
                  </label>

                  {/* MoMo Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'momo' ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                      background: paymentMethod === 'momo' ? 'var(--color-cream-100)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                    />
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fce7f3', color: '#be185d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Ví điện tử MoMo</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Thanh toán qua ứng dụng MoMo trên điện thoại</div>
                    </div>
                  </label>
                </div>

                {/* VietQR Live Preview Box */}
                {paymentMethod === 'vietqr' && (
                  <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                      Mã QR thanh toán VietQR sẽ được kích hoạt sau khi bấm đặt hàng:
                    </p>
                    <div style={{ display: 'inline-block', padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      <QrCode size={110} color="#0f172a" />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                      Ngân hàng Quân Đội MBBank • STK: 8888.8888.6868 • KAFE ROASTERY
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Items & Submit */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 className="heading-serif" style={{ fontSize: '1.3rem', color: 'var(--color-espresso-950)', marginBottom: '20px' }}>
                Đơn Hàng Của Bạn ({cart.length} món)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
                {cart.map(item => {
                  const baseWeight = item.product.weightOptions[0] || 250;
                  const ratio = item.selectedWeight / baseWeight;
                  const price = Math.round(item.product.price * (ratio > 1 ? ratio * 0.95 : 1));

                  return (
                    <div key={`${item.product.id}-${item.selectedWeight}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>{item.product.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {item.selectedWeight}g • {item.selectedGrind} • SL: x{item.quantity}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-espresso-950)' }}>
                        {(price * item.quantity).toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span>Tiền hàng:</span>
                  <span>{cartSubtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span>Phí giao hàng:</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#16a34a' }}>Miễn phí</strong> : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a' }}>
                    <span>Voucher ({appliedCoupon?.code}):</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-roast-amber)', borderTop: '1.5px solid var(--color-border)', paddingTop: '14px' }}>
                  <span>Tổng cộng:</span>
                  <span>{grandTotal.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
              >
                {submitting ? 'Đang xử lý đơn...' : 'Xác Nhận Đặt Hàng'}
              </button>

              <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#16a34a" /> Cam kết hoàn tiền 100% nếu không đúng chất lượng
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

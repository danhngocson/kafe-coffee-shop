'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order, Booking } from '@/types';
import { ShieldCheck, DollarSign, Package, Users, Coffee, CheckCircle, Clock, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface StatsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalBookings: number;
  recentOrders: Order[];
}

export default function AdminPage() {
  const { showToast } = useCart();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, bookingsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/orders'),
        fetch('/api/bookings')
      ]);

      const [statsData, ordersData, bookingsData] = await Promise.all([
        statsRes.json(),
        ordersRes.json(),
        bookingsRes.json()
      ]);

      if (statsData.success) setStats(statsData.data);
      if (ordersData.success) setOrders(ordersData.data);
      if (bookingsData.success) setBookings(bookingsData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status'], newPaymentStatus?: Order['paymentStatus']) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, paymentStatus: newPaymentStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã cập nhật trạng thái đơn ${orderId} sang "${newStatus}"!`);
        await loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Admin Top Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-espresso-950), #1e110a)',
          color: '#fff',
          padding: '40px 0',
          borderBottom: '1px solid var(--color-border-dark)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-warm)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              <ShieldCheck size={16} /> KAFÉ Roastery Management Portal
            </div>
            <h1 className="heading-serif" style={{ fontSize: '2rem', color: '#fff' }}>
              Bảng Điều Khiển Quản Trị
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={loadData} className="btn btn-outline-white btn-sm">
              <RefreshCw size={15} /> Làm mới dữ liệu
            </button>
            <Link href="/shop" className="btn btn-gold btn-sm">
              Xem cửa hàng khách hàng
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div style={{ background: '#fff', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Doanh Thu Toàn Sàn</span>
              <DollarSign size={20} color="#16a34a" />
            </div>
            <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-espresso-950)' }}>
              {stats?.totalRevenue.toLocaleString('vi-VN')}₫
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>↑ +18.5% so với tháng trước</span>
          </div>

          <div style={{ background: '#fff', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Tổng Số Đơn Hàng</span>
              <Package size={20} color="var(--color-roast-amber)" />
            </div>
            <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-espresso-950)' }}>
              {orders.length}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Cập nhật theo thời gian thực</span>
          </div>

          <div style={{ background: '#fff', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sản Phẩm Đang Niêm Yết</span>
              <Coffee size={20} color="#d97706" />
            </div>
            <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-espresso-950)' }}>
              {stats?.totalProducts || 10}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>100% hạt mộc và dụng cụ</span>
          </div>

          <div style={{ background: '#fff', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Đặt Lịch Workshop</span>
              <Users size={20} color="#0284c7" />
            </div>
            <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-espresso-950)' }}>
              {bookings.length}
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>Tất cả đã giữ chỗ</span>
          </div>
        </div>

        {/* Orders Table */}
        <div
          style={{
            background: 'var(--color-bg-card)',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: 'var(--color-espresso-950)' }}>
              Quản Lý Đơn Hàng ({orders.length})
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Có thể đổi trạng thái đơn để kiểm tra hiển thị bên trang Tra Cứu
            </span>
          </div>

          {loading ? (
            <p>Đang tải danh sách đơn...</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', background: 'var(--color-cream-50)' }}>
                    <th style={{ padding: '12px 14px' }}>Mã Đơn</th>
                    <th style={{ padding: '12px 14px' }}>Khách Hàng</th>
                    <th style={{ padding: '12px 14px' }}>Sản Phẩm</th>
                    <th style={{ padding: '12px 14px' }}>Tổng Tiền</th>
                    <th style={{ padding: '12px 14px' }}>Thanh Toán</th>
                    <th style={{ padding: '12px 14px' }}>Trạng Thái Đơn</th>
                    <th style={{ padding: '12px 14px' }}>Thao Tác Nhanh</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '14px', fontWeight: 700, color: 'var(--color-espresso-950)' }}>
                        <Link href={`/order-tracking?orderId=${order.id}`} style={{ color: 'var(--color-roast-amber)' }}>
                          {order.id}
                        </Link>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 700 }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{order.phone}</div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        {order.items.map((it, idx) => (
                          <div key={idx} style={{ fontSize: '0.82rem' }}>
                            {it.productName} ({it.weight}g) x{it.quantity}
                          </div>
                        ))}
                      </td>
                      <td style={{ padding: '14px', fontWeight: 800, color: 'var(--color-espresso-950)' }}>
                        {order.total.toLocaleString('vi-VN')}₫
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: order.paymentStatus === 'paid' ? '#dcfce7' : '#fef3c7',
                            color: order.paymentStatus === 'paid' ? '#166534' : '#b45309'
                          }}
                        >
                          {order.paymentStatus === 'paid' ? 'Đã Thanh Toán' : 'Chưa Trả (COD)'}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background:
                              order.status === 'delivered'
                                ? '#dcfce7'
                                : order.status === 'shipping'
                                ? '#e0f2fe'
                                : '#ffedd5',
                            color:
                              order.status === 'delivered'
                                ? '#166534'
                                : order.status === 'shipping'
                                ? '#0369a1'
                                : '#c2410c'
                          }}
                        >
                          {order.status === 'delivered'
                            ? 'Đã Giao Xong'
                            : order.status === 'shipping'
                            ? 'Đang Giao Hàng'
                            : order.status === 'roasting'
                            ? 'Đang Rang Xay'
                            : 'Mới Tiếp Nhận'}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {order.status !== 'roasting' && order.status !== 'shipping' && order.status !== 'delivered' && (
                            <button
                              disabled={updatingId === order.id}
                              onClick={() => handleUpdateStatus(order.id, 'roasting')}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            >
                              Xác nhận rang
                            </button>
                          )}

                          {order.status !== 'shipping' && order.status !== 'delivered' && (
                            <button
                              disabled={updatingId === order.id}
                              onClick={() => handleUpdateStatus(order.id, 'shipping')}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '4px 8px', fontSize: '0.75rem', borderColor: '#0284c7', color: '#0284c7' }}
                            >
                              Giao cho shipper
                            </button>
                          )}

                          {order.status !== 'delivered' && (
                            <button
                              disabled={updatingId === order.id}
                              onClick={() => handleUpdateStatus(order.id, 'delivered', 'paid')}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '4px 8px', fontSize: '0.75rem', borderColor: '#16a34a', color: '#16a34a' }}
                            >
                              Hoàn tất đơn
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Workshop Bookings List */}
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
            Danh Sách Học Viên Đăng Ký Workshop ({bookings.length})
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {bookings.map(b => (
              <div key={b.id} style={{ background: 'var(--color-cream-50)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-espresso-950)' }}>{b.fullName}</strong>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                    {b.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-roast-amber)', marginBottom: '4px' }}>{b.workshopType}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>SĐT: {b.phone}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Ngày: {b.date} ({b.timeSlot})</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Chi nhánh: {b.branch}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

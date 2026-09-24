'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coffee, ShoppingBag, Search, Menu, X, Compass, CalendarCheck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/shop', label: 'Cửa Hàng' },
    { href: '/brew-guide', label: 'Cẩm Nang Pha Chế' },
    { href: '/about', label: 'Câu Chuyện KAFÉ' },
    { href: '/blog', label: 'Tạp Chí' },
    { href: '/booking', label: 'Workshop & Tasting' },
    { href: '/contact', label: 'Chi Nhánh' },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand Logo */}
        <Link href="/" className="logo">
          <div className="logo-icon">
            <Coffee size={22} />
          </div>
          <div>
            <span className="logo-text">KAFÉ</span>
            <span className="logo-sub">Artisan Roasters</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-links">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="nav-item">
                  <Link href={link.href} className={isActive ? 'active' : ''}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <Link href="/shop" className="icon-btn" title="Tìm kiếm cà phê">
            <Search size={19} />
          </Link>

          <Link href="/order-tracking" className="icon-btn" title="Tra cứu đơn hàng">
            <Compass size={19} />
          </Link>

          <Link href="/cart" className="icon-btn" title="Giỏ hàng">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link href="/admin" className="btn btn-outline btn-sm admin-header-btn">
            <ShieldCheck size={16} /> Admin
          </Link>

          {/* Mobile hamburger */}
          <button
            className="icon-btn"
            style={{ display: 'flex' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 74px)',
            background: 'var(--color-bg-dark)',
            color: '#fff',
            padding: '30px 24px',
            zIndex: 99,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <p style={{ color: 'var(--color-gold-warm)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Khám phá thế giới cà phê
          </p>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: pathname === link.href ? 'var(--color-gold-light)' : '#e5d8cc',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                paddingBottom: '12px'
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              href="/order-tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-outline-white"
            >
              <Compass size={18} /> Tra Cứu Vận Đơn
            </Link>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-gold"
            >
              <CalendarCheck size={18} /> Đặt Lịch Workshop
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-outline-white"
            >
              <ShieldCheck size={18} /> Quản Trị Hệ Thống
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

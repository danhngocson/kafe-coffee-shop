import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Phone, Mail, Globe, MessageCircle, Share2, Award, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand story */}
          <div className="footer-col">
            <Link href="/" className="logo" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <div className="logo-icon">
                <Coffee size={20} />
              </div>
              <div>
                <span className="logo-text" style={{ color: '#fff' }}>KAFÉ</span>
                <span className="logo-sub">Artisan Roasters</span>
              </div>
            </Link>
            <p style={{ fontSize: '0.9rem', color: '#b5a498', marginBottom: '20px', lineHeight: 1.6 }}>
              KAFÉ là xưởng rang cà phê thủ công kết nối trực tiếp với nông hộ Đắk Lắk và Lâm Đồng. Chúng tôi gìn giữ hương vị mộc bản địa và nâng tầm hạt cà phê Việt Nam đạt chuẩn chất lượng quốc tế SCA.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-gold-light)' }}>
                <Award size={16} /> 100% Cà phê chín mộc
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-gold-light)' }}>
                <ShieldCheck size={16} /> Không hương liệu tẩm ướp
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4>Khám Phá</h4>
            <ul>
              <li><Link href="/shop">Bộ Sưu Tập Cà Phê</Link></li>
              <li><Link href="/shop?category=coffee-beans">Hạt Cà Phê Đặc Sản</Link></li>
              <li><Link href="/shop?category=ready-to-drink">Cold Brew & Cà Phê Muối</Link></li>
              <li><Link href="/shop?category=equipment">Dụng Cụ Pha Phin & V60</Link></li>
              <li><Link href="/brew-guide">Công Cụ Tỉ Lệ Pha Chế</Link></li>
              <li><Link href="/booking">Workshop Thử Nếm Cupping</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div className="footer-col">
            <h4>Dịch Vụ</h4>
            <ul>
              <li><Link href="/order-tracking">Tra Cứu Đơn Hàng</Link></li>
              <li><Link href="/about">Hành Trình Thương Hiệu</Link></li>
              <li><Link href="/blog">Tạp Chí & Bí Quyết Pha</Link></li>
              <li><Link href="/contact">Hệ Thống Trạm Rang</Link></li>
              <li><Link href="/account">Tài Khoản & Điểm Thưởng</Link></li>
              <li><Link href="/admin">Cổng Quản Trị Hệ Thống</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="footer-col">
            <h4>Liên Hệ & Đặt Hạt</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#b5a498', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={18} color="var(--color-gold-warm)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>68 Xuân Thủy, Thảo Điền, TP. Thủ Đức, TP. HCM</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Phone size={18} color="var(--color-gold-warm)" style={{ flexShrink: 0 }} />
                <span>Hotline: 1900 6868 (08:00 - 21:00)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Mail size={18} color="var(--color-gold-warm)" style={{ flexShrink: 0 }} />
                <span>support@kaferoastery.vn</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" className="icon-btn" style={{ background: '#261710', borderColor: '#40271b', color: '#fff' }} title="Website">
                <Globe size={18} />
              </a>
              <a href="#" className="icon-btn" style={{ background: '#261710', borderColor: '#40271b', color: '#fff' }} title="Cộng đồng">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="icon-btn" style={{ background: '#261710', borderColor: '#40271b', color: '#fff' }} title="Chia sẻ">
                <Share2 size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 KAFÉ Artisan Roasters. Đã đăng ký bản quyền thương hiệu cà phê Việt.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Rang xay và đóng gói với <Heart size={14} color="#e05353" fill="#e05353" /> tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}

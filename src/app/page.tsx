import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Compass, Award, Clock, HeartHandshake, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = db.getProducts().slice(0, 4);
  const bestSellers = db.getProducts().filter(p => p.bestSeller).slice(0, 3);
  const articles = db.getArticles().slice(0, 2);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#120a06',
          color: '#fff',
          overflow: 'hidden',
          padding: '80px 0'
        }}
      >
        {/* Background Image with Dark Vignette Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80"
            alt="Coffee Roasting Background"
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.38 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 70% 30%, rgba(217, 159, 89, 0.15) 0%, rgba(18, 10, 6, 0.95) 85%)'
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="badge badge-gold">
                <Sparkles size={14} /> Tôn vinh hạt cà phê bản địa Việt Nam
              </span>
            </div>

            <h1
              className="heading-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.15,
                fontWeight: 700,
                marginBottom: '22px',
                color: '#fff'
              }}
            >
              Hương Vị Cà Phê Mộc <br />
              <span style={{ color: 'var(--color-gold-warm)' }}>Đậm Đà Từng Giọt</span> Tinh Hoa
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#d6c5b8',
                lineHeight: 1.65,
                marginBottom: '36px',
                fontWeight: 400
              }}
            >
              KAFÉ tuyển chọn 100% trái chín cây từ nông hộ Buôn Ma Thuột & Cầu Đất. Quy trình rang mộc thủ công giữ trọn tầng hương phong phú từ hoa trái nhiệt đới đến mật ong rừng.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Link href="/shop" className="btn btn-gold" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
                Khám Phá Cửa Hàng <ArrowRight size={18} />
              </Link>
              <Link href="/brew-guide" className="btn btn-outline-white" style={{ padding: '14px 28px' }}>
                <Compass size={18} /> Cẩm Nang Pha Chế
              </Link>
            </div>

            {/* Quick stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                marginTop: '50px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold-light)', fontFamily: 'var(--font-serif)' }}>
                  100%
                </span>
                <span style={{ fontSize: '0.85rem', color: '#b5a498' }}>Trái chín mộc</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold-light)', fontFamily: 'var(--font-serif)' }}>
                  85+
                </span>
                <span style={{ fontSize: '0.85rem', color: '#b5a498' }}>Điểm SCA quốc tế</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold-light)', fontFamily: 'var(--font-serif)' }}>
                  48 Giờ
                </span>
                <span style={{ fontSize: '0.85rem', color: '#b5a498' }}>Rang mới trước khi gửi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section style={{ padding: '50px 0', background: 'var(--color-cream-100)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-espresso-900)', color: 'var(--color-gold-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Flame size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>Rang Mộc Thủ Công</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Không tẩm bơ, bắp hay hóa chất</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-espresso-900)', color: 'var(--color-gold-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>Nguồn Gốc Minh Bạch</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Hợp tác cùng nông hộ Cầu Đất & Buôn Ma Thuột</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-espresso-900)', color: 'var(--color-gold-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>Tươi Mới Tuyệt Đối</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Van 1 chiều bảo quản độ ngon tối ưu</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-espresso-900)', color: 'var(--color-gold-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>Tư Vấn Đúng Gu</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Tùy chọn xay riêng cho phin, máy hay V60</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Signature Selection</span>
              <h2 className="heading-serif" style={{ fontSize: '2.2rem', color: 'var(--color-espresso-950)' }}>
                Hạt Cà Phê Đặc Sản Tuyển Chọn
              </h2>
            </div>
            <Link href="/shop" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Xem toàn bộ thực đơn <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '28px'
            }}
          >
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BANNER STORY SECTION */}
      <section style={{ padding: '90px 0', background: 'var(--color-espresso-900)', color: '#fff', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-espresso-700)' }}>
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
                alt="Coffee extraction"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Về KAFÉ Roastery</span>
              <h2 className="heading-serif" style={{ fontSize: '2.4rem', lineHeight: 1.25, marginBottom: '20px', color: '#fff' }}>
                Hành Trình Tôn Vinh <br />
                <span style={{ color: 'var(--color-gold-warm)' }}>Bản Sắc Cà Phê Việt Nam</span>
              </h2>
              <p style={{ color: '#d6c5b8', lineHeight: 1.7, marginBottom: '24px', fontSize: '1.02rem' }}>
                Chúng tôi không chỉ bán cà phê, mà gửi gắm tâm huyết của những người trẻ yêu nông sản quê hương. Từ ngọn đồi sương mờ Cầu Đất ở độ cao 1.650m đến thủ phủ đất đỏ bazan Buôn Ma Thuột, từng mẻ rang được điều chỉnh nhiệt độ chính xác đến từng giây để đánh thức những tầng hương thơm ngọt ngào nhất.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="var(--color-gold-warm)" />
                  <span style={{ fontSize: '0.95rem', color: '#f3cca0' }}>Lên men tự nhiên mật ong (Honey) & Kỵ khí rượu vang (Anaerobic)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="var(--color-gold-warm)" />
                  <span style={{ fontSize: '0.95rem', color: '#f3cca0' }}>Q-Grader giám sát và kiểm nghiệm chất lượng từng mẻ hạt</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="var(--color-gold-warm)" />
                  <span style={{ fontSize: '0.95rem', color: '#f3cca0' }}>Bao bì thân thiện môi trường có van xả khí 1 chiều</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Link href="/about" className="btn btn-gold">
                  Đọc Câu Chuyện Của Chúng Tôi
                </Link>
                <Link href="/booking" className="btn btn-outline-white">
                  Đặt Lịch Workshop Thử Nếm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COFFEE BREWING TOOL TEASER */}
      <section style={{ padding: '80px 0', background: 'var(--color-cream-50)' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #2a1b12, #180e09)',
              borderRadius: 'var(--radius-lg)',
              padding: '50px 40px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid rgba(217, 159, 89, 0.3)'
            }}
          >
            <span className="badge badge-gold" style={{ marginBottom: '16px' }}>Công Cụ Tương Tác Độc Quyền</span>
            <h2 className="heading-serif" style={{ fontSize: '2.3rem', marginBottom: '16px', maxWidth: '700px' }}>
              Bạn Đang Muốn Pha Cà Phê Bằng Cách Nào?
            </h2>
            <p style={{ color: '#d6c5b8', maxWidth: '620px', lineHeight: 1.65, marginBottom: '32px' }}>
              Sử dụng ngay <strong>Bộ tính tỉ lệ nước và cà phê (Brew Calculator)</strong> chuẩn chuyên gia kèm đồng hồ bấm giờ thông minh cho Phin Việt Nam, Pour Over V60, Cold Brew hay French Press.
            </p>

            <Link href="/brew-guide" className="btn btn-gold" style={{ padding: '14px 34px', fontSize: '1.05rem' }}>
              Mở Công Cụ Tính Tỉ Lệ Pha Chế <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BLOG / ARTICLES TEASER */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Góc Chuyên Gia</span>
              <h2 className="heading-serif" style={{ fontSize: '2.1rem', color: 'var(--color-espresso-950)' }}>
                Tạp Chí Cà Phê & Cẩm Nang
              </h2>
            </div>
            <Link href="/blog" className="btn btn-outline">
              Xem tất cả bài viết <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
            {articles.map(article => (
              <div
                key={article.id}
                style={{
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                  <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(18, 10, 6, 0.8)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <div style={{ padding: '22px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    {article.publishDate} • {article.readTime}
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--color-espresso-950)',
                        marginBottom: '10px',
                        lineHeight: 1.35
                      }}
                    >
                      {article.title}
                    </h3>
                  </Link>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--color-roast-amber)'
                    }}
                  >
                    Đọc tiếp <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

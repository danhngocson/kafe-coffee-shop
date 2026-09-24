import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Compass, Heart, Mountain, Sparkles, Users, Coffee, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* 1. Hero Header */}
      <section
        style={{
          position: 'relative',
          padding: '100px 0 80px',
          background: 'linear-gradient(135deg, var(--color-espresso-950), #23130a)',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>Hành Trình KAFÉ</span>
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>
            Tôn Vinh Hạt Cà Phê <br />
            <span style={{ color: 'var(--color-gold-warm)' }}>Đậm Tình Đất Mẹ Việt Nam</span>
          </h1>
          <p style={{ color: '#d6c5b8', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Chúng tôi bắt đầu với một ước mơ giản dị: đưa hạt cà phê Robusta và Arabica trồng trên đất đỏ bazan và sương mù cao nguyên bước lên bản đồ Specialty Coffee thế giới.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Vision */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Khởi Nguồn Từ Đam Mê</span>
              <h2 className="heading-serif" style={{ fontSize: '2.2rem', color: 'var(--color-espresso-950)', marginBottom: '20px', lineHeight: 1.3 }}>
                Không Thể Tiếp Tục Bán Rẻ Một Thứ Quý Giá Như Vàng Nâu
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                Việt Nam đứng thứ hai thế giới về sản lượng xuất khẩu cà phê, nhưng trong suốt nửa thế kỷ, phần lớn sản lượng ấy chỉ được dùng làm cà phê hòa tan giá rẻ. Nông dân dãi dầu mưa nắng vẫn chật vật mưu sinh.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '26px' }}>
                KAFÉ ra đời vào năm 2020 tại TP. Hồ Chí Minh. Chúng tôi quyết định đi ngược dòng: <strong>liên kết trực tiếp cùng các hộ nông dân</strong> tại Krông Năng và Cầu Đất, thu mua với giá cao hơn thị trường 35 - 50% với cam kết chỉ hái những trái cà phê chín đỏ 100%.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '18px', background: 'var(--color-cream-100)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-roast-amber)', marginBottom: '4px' }}>50+</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Hộ nông dân liên kết bền vững tại Đắk Lắk & Lâm Đồng</p>
                </div>
                <div style={{ padding: '18px', background: 'var(--color-cream-100)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-roast-amber)', marginBottom: '4px' }}>100%</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Rang mộc nguyên chất, nói KHÔNG với bắp nướng & bơ tẩm</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', height: '480px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
                alt="Coffee plantation and farmer"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 3 Coffee Terroirs */}
      <section style={{ padding: '80px 0', background: 'var(--color-cream-100)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Vùng Đất & Thổ Nhưỡng</span>
            <h2 className="heading-serif" style={{ fontSize: '2.2rem', color: 'var(--color-espresso-950)', marginBottom: '14px' }}>
              Ba Miền Vùng Trồng Đặc Trưng
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Mỗi vùng đất, mỗi độ cao và mỗi giống vi khí hậu tạo nên một bản hòa âm hương vị độc bản không thể hòa lẫn.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* Card 1 */}
            <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80"
                  alt="Buon Ma Thuot"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-roast-amber)', fontWeight: 700, textTransform: 'uppercase' }}>Độ cao: 850m • Đất đỏ bazan</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-espresso-950)', margin: '8px 0 10px' }}>Buôn Ma Thuột, Đắk Lắk</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Thủ phủ của hạt Robusta trứ danh. Khí hậu nắng gió Tây Nguyên hun đúc nên vị đậm đà, nồng nàn socola đen và mật ong rừng nguyên chất.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                  alt="Cau Dat Da Lat"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-roast-amber)', fontWeight: 700, textTransform: 'uppercase' }}>Độ cao: 1.650m • Sương mờ quanh năm</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-espresso-950)', margin: '8px 0 10px' }}>Cầu Đất, Lâm Đồng</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Thiên đường Arabica của Việt Nam. Biên độ nhiệt ngày đêm lớn giúp hạt tích lũy axit citric thanh nhã, thơm mùi hoa nhài và vị ngọt cam đào.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=600&q=80"
                  alt="Son La Tay Bac"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-roast-amber)', fontWeight: 700, textTransform: 'uppercase' }}>Độ cao: 900m • Thung lũng Tây Bắc</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-espresso-950)', margin: '8px 0 10px' }}>Chiềng Ban, Sơn La</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Vùng đất mộng mơ được ví như Tây Bắc thu nhỏ với những mẻ cà phê lên men yếm khí men rượu vang độc nhất vô nhị.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Roasters & Q-Graders */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Đội Ngũ Nghệ Nhân</span>
            <h2 className="heading-serif" style={{ fontSize: '2.1rem', color: 'var(--color-espresso-950)' }}>
              Những Con Người Thổi Hồn Vào Từng Mẻ Rang
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ textAlign: 'center', background: '#fff', padding: '30px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 18px', border: '3px solid var(--color-gold-warm)' }}>
                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Master Roaster" fill style={{ objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '4px' }}>Trần Khang Minh</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-roast-amber)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Master Roaster & Q-Grader SCA</span>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                10 năm kinh nghiệm nghiên cứu biểu đồ nhiệt rang mộc, người kiểm định chất lượng cho từng mẻ hạt xuất xưởng tại KAFÉ.
              </p>
            </div>

            <div style={{ textAlign: 'center', background: '#fff', padding: '30px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 18px', border: '3px solid var(--color-gold-warm)' }}>
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Head Barista" fill style={{ objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '4px' }}>Lê Thảo Vy</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-roast-amber)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Head Barista & Trainer</span>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Quán quân Vietnam AeroPress Championship 2024, phụ trách nghiên cứu các công thức pha chế sáng tạo và workshop nếm thử.
              </p>
            </div>

            <div style={{ textAlign: 'center', background: '#fff', padding: '30px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 18px', border: '3px solid var(--color-gold-warm)' }}>
                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" alt="Agronomist" fill style={{ objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '4px' }}>Y-Bliêk Niê</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-roast-amber)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Chuyên Gia Nông Nghiệp Vùng Trồng</span>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Người con Ê-Đê gắn bó trọn đời với đất đỏ Buôn Ma Thuột, đồng hành hướng dẫn bà con nông dân kỹ thuật lên men tự nhiên.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="container" style={{ marginTop: '20px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-espresso-900), var(--color-espresso-950))',
            padding: '50px 30px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            color: '#fff',
            border: '1px solid rgba(217, 159, 89, 0.3)'
          }}
        >
          <h3 className="heading-serif" style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--color-gold-light)' }}>
            Sẵn Sàng Thưởng Thức Hương Vị Cà Phê Mộc Đích Thực?
          </h3>
          <p style={{ color: '#d6c5b8', maxWidth: '600px', margin: '0 auto 26px', fontSize: '1.02rem' }}>
            Mỗi túi cà phê bạn mua là một sự sẻ chia và đồng hành cùng người nông dân vùng cao nguyên Việt Nam.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn btn-gold">
              Khám Phá Cửa Hàng <ArrowRight size={16} />
            </Link>
            <Link href="/booking" className="btn btn-outline-white">
              Đăng Ký Tham Quan Xưởng Rang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

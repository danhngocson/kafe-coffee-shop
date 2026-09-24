'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, Clock, Sparkles, CheckCircle2, Flame, Droplets, Coffee, ArrowRight } from 'lucide-react';

interface BrewMethod {
  id: string;
  name: string;
  ratio: number; // e.g. 1:15
  grindSize: string;
  waterTemp: string;
  brewTimeSec: number;
  bloomSec: number;
  bloomWaterRatio: number;
  description: string;
  steps: string[];
}

const BREW_METHODS: BrewMethod[] = [
  {
    id: 'phin',
    name: 'Phin Truyền Thống Việt Nam',
    ratio: 4.5,
    grindSize: 'Xay vừa - thô (như hạt đường cát)',
    waterTemp: '92°C - 95°C',
    brewTimeSec: 270, // 4.5 mins
    bloomSec: 90,
    bloomWaterRatio: 1.2,
    description: 'Nét văn hóa cà phê kinh điển của người Việt. Cho ra giọt cà phê đen sánh đậm đà, lý tưởng để pha cùng sữa đặc Ông Thọ.',
    steps: [
      'Tráng phin và ly qua nước sôi để khử khuẩn và giữ nhiệt.',
      'Cho cà phê vào thân phin, lắc nhẹ cho phẳng mặt, đặt lưỡi gà (nén nhẹ tay vừa phải).',
      'Rót khoảng 25-30ml nước sôi vào đĩa đáy phin và mặt trên để ủ nở trong 90 giây.',
      'Châm tiếp 60-70ml nước sôi còn lại, đậy nắp và chờ từng giọt cà phê vàng ươm chảy xuống (4-5 phút).'
    ]
  },
  {
    id: 'v60',
    name: 'Pour Over (Hario V60)',
    ratio: 15,
    grindSize: 'Xay vừa (Medium Coarse)',
    waterTemp: '90°C - 93°C',
    brewTimeSec: 180, // 3 mins
    bloomSec: 35,
    bloomWaterRatio: 2.5,
    description: 'Phương pháp chiết xuất tinh khiết nhất giúp khai phóng trọn vẹn tầng hương hoa quả, cam bưởi và vị chua thanh tao của hạt Arabica.',
    steps: [
      'Gấp giấy lọc, đặt vào phễu V60 và tráng nước sôi để loại bỏ mùi giấy.',
      'Cho bột cà phê vào phễu, tạo một lỗ nhỏ ở giữa tâm bột.',
      'Rót lượng nước ủ (Bloom) gấp 2.5 lần cà phê từ trong ra ngoài theo vòng xoắn ốc, chờ 35 giây.',
      'Rót tiếp dòng nước đều đặn thành 2 đợt cho đến khi đủ định lượng nước, kết thúc trong 3 phút.'
    ]
  },
  {
    id: 'coldbrew',
    name: 'Cold Brew (Cà Phê Ủ Lạnh)',
    ratio: 8,
    grindSize: 'Xay thô (Coarse như muối biển)',
    waterTemp: 'Nước lọc mát (Room temp / 4°C)',
    brewTimeSec: 64800, // 18 hours
    bloomSec: 0,
    bloomWaterRatio: 0,
    description: 'Ủ chậm với nước lạnh trong 18-24 giờ. Vị cà phê mượt mà như lụa, độ axit giảm 67%, không đắng gắt, cực tốt cho dạ dày.',
    steps: [
      'Cho bột cà phê xay thô vào bình thủy tinh hoặc túi lọc vải chuyên dụng.',
      'Rót nước lọc tinh khiết vào theo đúng tỉ lệ 1:8, dùng thìa khuấy nhẹ cho ngấm đều.',
      'Đậy kín nắp bình và bảo quản trong ngăn mát tủ lạnh từ 18 đến 24 giờ.',
      'Nhấc túi bã cà phê ra, rót cốt cà phê ra ly cùng vài viên đá và lát cam vàng tươi.'
    ]
  },
  {
    id: 'frenchpress',
    name: 'French Press (Bình Ép Pit-tông)',
    ratio: 12,
    grindSize: 'Xay rất thô (Extra Coarse)',
    waterTemp: '92°C - 94°C',
    brewTimeSec: 240, // 4 mins
    bloomSec: 60,
    bloomWaterRatio: 2,
    description: 'Phương pháp ngâm chiết xuất toàn phần giúp giữ lại các loại dầu tự nhiên (coffee oils), cho cảm giác miệng tròn đầy và béo ngậy.',
    steps: [
      'Tráng nóng bình French Press với nước sôi rồi đổ bỏ.',
      'Cho cà phê xay thô vào đáy bình, rót một nửa lượng nước để ủ trong 1 phút.',
      'Rót nốt phần nước còn lại, khuấy nhẹ bề mặt rồi đặt nắp pit-tông lên trên (chưa ấn xuống).',
      'Đúng phút thứ 4, từ từ ấn pit-tông thẳng đứng xuống đáy và rót thưởng thức ngay.'
    ]
  }
];

export default function BrewGuidePage() {
  const [selectedMethodId, setSelectedMethodId] = useState('phin');
  const [coffeeGrams, setCoffeeGrams] = useState<number>(20);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentMethod = BREW_METHODS.find(m => m.id === selectedMethodId) || BREW_METHODS[0];

  // Calculated values
  const totalWaterMl = Math.round(coffeeGrams * currentMethod.ratio);
  const bloomWaterMl = Math.round(coffeeGrams * (currentMethod.bloomWaterRatio || 1.5));
  const mainWaterMl = totalWaterMl - bloomWaterMl;

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
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
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} /> Barista Lab Calculator
          </span>
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', color: '#fff', marginBottom: '16px' }}>
            Công Cụ Tính Tỉ Lệ Pha Cà Phê
          </h1>
          <p style={{ color: '#d6c5b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Độ ngon của một tách cà phê nằm ở tỉ lệ vàng giữa lượng bột và nước. Chọn phương pháp pha dưới đây để nhận định lượng chiết xuất chính xác nhất.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Method selector buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '40px'
          }}
        >
          {BREW_METHODS.map(method => (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethodId(method.id);
                handleResetTimer();
              }}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                border: selectedMethodId === method.id ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                background: selectedMethodId === method.id ? 'var(--color-espresso-900)' : '#fff',
                color: selectedMethodId === method.id ? '#fff' : 'var(--color-espresso-950)',
                boxShadow: selectedMethodId === method.id ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: selectedMethodId === method.id ? 'var(--color-gold-warm)' : 'var(--color-roast-amber)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                Tỉ lệ 1:{method.ratio}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{method.name}</h4>
            </button>
          ))}
        </div>

        {/* Calculator Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', alignItems: 'start' }}>
          {/* Left: Input & Dynamic Output */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: 'var(--color-espresso-950)', marginBottom: '8px' }}>
              Máy Tính Định Lượng
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              {currentMethod.description}
            </p>

            {/* Coffee input slider & number */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-espresso-950)' }}>
                  Lượng bột cà phê (Gram):
                </label>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-roast-amber)' }}>
                  {coffeeGrams}g
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={coffeeGrams}
                onChange={e => setCoffeeGrams(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-roast-amber)', height: '8px', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                <span>10g (1 tách)</span>
                <span>25g (chuẩn phin)</span>
                <span>50g (bình lớn)</span>
                <span>100g (cold brew)</span>
              </div>
            </div>

            {/* Calculated Breakdown Box */}
            <div
              style={{
                background: 'var(--color-cream-100)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                marginBottom: '26px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  Tổng lượng nước cần rót:
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-espresso-950)' }}>
                  {totalWaterMl} ml
                </span>
              </div>

              {currentMethod.bloomWaterRatio > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>• Nước ủ nở cà phê (Bloom):</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-roast-amber)' }}>{bloomWaterMl} ml ({currentMethod.bloomSec}s)</span>
                </div>
              )}

              {currentMethod.bloomWaterRatio > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>• Nước chiết xuất chính:</span>
                  <span style={{ fontWeight: 700 }}>{mainWaterMl} ml</span>
                </div>
              )}
            </div>

            {/* Brewing Specs Tags */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'var(--color-cream-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', textTransform: 'uppercase' }}>Cỡ Xay</span>
                <strong style={{ fontSize: '0.88rem' }}>{currentMethod.grindSize}</strong>
              </div>
              <div style={{ padding: '12px', background: 'var(--color-cream-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', textTransform: 'uppercase' }}>Nhiệt Độ Nước</span>
                <strong style={{ fontSize: '0.88rem' }}>{currentMethod.waterTemp}</strong>
              </div>
            </div>
          </div>

          {/* Right: Stopwatch Timer & Step Guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Stopwatch Widget */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--color-espresso-900), var(--color-espresso-950))',
                color: '#fff',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(217, 159, 89, 0.3)',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-warm)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                <Clock size={16} /> Đồng Hồ Bấm Giờ Pha Chế
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '3.6rem',
                  fontWeight: 800,
                  color: isTimerRunning ? 'var(--color-gold-light)' : '#fff',
                  letterSpacing: '2px',
                  margin: '10px 0 20px'
                }}
              >
                {formatTimer(timerSeconds)}
              </div>

              {/* Timer Controls */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="btn btn-gold"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause size={18} /> Tạm Dừng
                    </>
                  ) : (
                    <>
                      <Play size={18} fill="#fff" /> Bắt Đầu Pha
                    </>
                  )}
                </button>
                <button
                  onClick={handleResetTimer}
                  className="btn btn-outline-white"
                  style={{ padding: '12px 20px' }}
                  title="Đặt lại từ đầu"
                >
                  <RotateCcw size={16} /> Đặt lại
                </button>
              </div>
            </div>

            {/* Step-by-step brewing guide */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '18px' }}>
                Các Bước Thực Hiện ({currentMethod.name})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {currentMethod.steps.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: 'var(--color-roast-amber)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
                <Link href="/shop?category=coffee-beans" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-roast-amber)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Mua ngay hạt cà phê phù hợp với phương pháp này <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

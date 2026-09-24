'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { Clock, Calendar, ArrowRight, User, BookOpen, Sparkles } from 'lucide-react';

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        if (data.success) {
          setArticles(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả bài viết' },
    { id: 'Kiến Thức Cà Phê', name: 'Kiến Thức Cà Phê' },
    { id: 'Cẩm Nang Pha Chế', name: 'Cẩm Nang Pha Chế' },
    { id: 'Phong Cách Sống', name: 'Phong Cách Sống' }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const featured = articles[0];

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
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
            <BookOpen size={14} /> Tạp Chí KAFÉ
          </span>
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', color: '#fff', marginBottom: '16px' }}>
            Kiến Thức & Văn Hóa Cà Phê
          </h1>
          <p style={{ color: '#d6c5b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Nơi chia sẻ những câu chuyện về hạt cà phê đặc sản, bí quyết pha chế của các Barista chuyên nghiệp và phong cách sống hiện đại.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '9px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: selectedCategory === cat.id ? '1.5px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                background: selectedCategory === cat.id ? 'var(--color-espresso-900)' : '#fff',
                color: selectedCategory === cat.id ? 'var(--color-gold-light)' : 'var(--color-text-secondary)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Article Banner */}
        {featured && selectedCategory === 'all' && (
          <div
            style={{
              background: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              marginBottom: '50px'
            }}
          >
            <div style={{ position: 'relative', minHeight: '340px' }}>
              <Image src={featured.image} alt={featured.title} fill style={{ objectFit: 'cover' }} />
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'var(--color-espresso-900)',
                  color: 'var(--color-gold-light)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                Bài Viết Tiêu Điểm
              </span>
            </div>

            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {featured.publishDate}
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {featured.readTime}
                </span>
              </div>

              <Link href={`/blog/${featured.slug}`}>
                <h2 className="heading-serif" style={{ fontSize: '1.7rem', color: 'var(--color-espresso-950)', marginBottom: '14px', lineHeight: 1.3 }}>
                  {featured.title}
                </h2>
              </Link>

              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '22px', fontSize: '0.95rem' }}>
                {featured.excerpt}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
                    <Image src={featured.author.avatar} alt={featured.author.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block' }}>{featured.author.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{featured.author.role}</span>
                  </div>
                </div>

                <Link href={`/blog/${featured.slug}`} className="btn btn-outline btn-sm">
                  Đọc tiếp <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredArticles.map(article => (
            <div
              key={article.id}
              style={{
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(26, 16, 10, 0.75)',
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

              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                  {article.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--color-cream-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    Bởi {article.author.name}
                  </span>
                  <Link href={`/blog/${article.slug}`} style={{ color: 'var(--color-roast-amber)', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Chi tiết <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

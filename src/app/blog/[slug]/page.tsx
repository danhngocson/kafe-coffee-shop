'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Article } from '@/types';
import { ArrowLeft, Clock, Calendar, Share2, Coffee, ArrowRight } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const res = await fetch(`/api/articles/${slug}`);
        const data = await res.json();
        if (data.success) {
          setArticle(data.data);

          // Related
          const allRes = await fetch('/api/articles');
          const allData = await allRes.json();
          if (allData.success) {
            setRelated(allData.data.filter((a: Article) => a.slug !== slug).slice(0, 2));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '90px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p>Đang tải bài viết...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container" style={{ padding: '90px 0', textAlign: 'center' }}>
        <h2>Không tìm thấy bài viết này.</h2>
        <Link href="/blog" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Quay lại tạp chí
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-cream-100)', padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-roast-amber)' }}>
            <ArrowLeft size={14} /> Tạp chí KAFÉ
          </Link>
          <span style={{ color: 'var(--color-text-muted)' }}>/</span>
          <span style={{ color: 'var(--color-text-muted)' }}>{article.category}</span>
        </div>
      </div>

      <article className="container" style={{ maxWidth: '820px', marginTop: '40px' }}>
        {/* Title & Metadata */}
        <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
          {article.category}
        </span>
        <h1 className="heading-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--color-espresso-950)', marginBottom: '18px', lineHeight: 1.25 }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden' }}>
              <Image src={article.author.avatar} alt={article.author.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block' }}>{article.author.name}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{article.author.role}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {article.publishDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '36px', boxShadow: 'var(--shadow-md)' }}>
          <Image src={article.image} alt={article.title} fill priority style={{ objectFit: 'cover' }} />
        </div>

        {/* Article Body Content */}
        <div style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--color-text-primary)' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-espresso-900)', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>
            &ldquo;{article.excerpt}&rdquo;
          </p>

          <div style={{ whiteSpace: 'pre-line' }}>
            {article.content}
          </div>
        </div>

        {/* Author box */}
        <div
          style={{
            marginTop: '50px',
            padding: '28px',
            background: 'var(--color-cream-100)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image src={article.author.avatar} alt={article.author.name} fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>{article.author.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>{article.author.role}</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Chuyên gia thẩm định cà phê, người đồng hành cùng nông dân cao nguyên để tạo ra những hạt Robusta và Arabica đạt chuẩn quốc tế.
            </p>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div style={{ marginTop: '70px', paddingTop: '40px', borderTop: '1px solid var(--color-border)' }}>
            <h3 className="heading-serif" style={{ fontSize: '1.6rem', marginBottom: '24px', color: 'var(--color-espresso-950)' }}>
              Bài Viết Liên Quan
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {related.map(r => (
                <div key={r.id} style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', padding: '18px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-roast-amber)', fontWeight: 700 }}>{r.category}</span>
                  <Link href={`/blog/${r.slug}`}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '8px 0', lineHeight: 1.35 }}>{r.title}</h4>
                  </Link>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {r.excerpt.slice(0, 90)}...
                  </p>
                  <Link href={`/blog/${r.slug}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-roast-amber)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Đọc bài <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

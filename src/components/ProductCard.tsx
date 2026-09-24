'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.weightOptions[0] || 250, product.grindOptions[0] || 'Nguyên hạt');
  };

  const getRoastBadgeColor = (level: Product['roastLevel']) => {
    switch (level) {
      case 'Light': return { bg: '#e8f5e9', text: '#2e7d32', label: 'Rang Sáng (Light)' };
      case 'Medium': return { bg: '#fff3e0', text: '#e65100', label: 'Rang Vừa (Medium)' };
      case 'Dark': return { bg: '#3e2723', text: '#d7ccc8', label: 'Rang Đậm (Dark)' };
      default: return { bg: '#efebe9', text: '#4e342e', label: level };
    }
  };

  const roastBadge = getRoastBadgeColor(product.roastLevel);

  return (
    <div className="product-card">
      <Link href={`/shop/${product.slug}`} className="product-card-img-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="product-card-img"
          style={{ objectFit: 'cover' }}
        />
        
        {/* Floating Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product.bestSeller && (
            <span className="badge badge-gold">
              Bán chạy
            </span>
          )}
          <span
            className="badge"
            style={{ backgroundColor: roastBadge.bg, color: roastBadge.text, fontSize: '0.7rem' }}
          >
            <Flame size={12} /> {roastBadge.label}
          </span>
        </div>

        {/* Rating pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(26, 16, 10, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            borderRadius: 'var(--radius-full)',
            padding: '3px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}
        >
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <span>{product.rating.toFixed(1)}</span>
          <span style={{ color: '#aaa', fontSize: '0.7rem' }}>({product.reviewCount})</span>
        </div>
      </Link>

      <div className="product-card-body">
        <span className="product-origin">{product.origin}</span>
        
        <Link href={`/shop/${product.slug}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        {/* Tasting Notes */}
        <div className="product-tags">
          {product.tastingNotes.slice(0, 3).map((note, idx) => (
            <span key={idx} className="product-tag">
              {note}
            </span>
          ))}
        </div>

        {/* Price and Action */}
        <div className="product-price-row">
          <div>
            <span className="product-price">{product.price.toLocaleString('vi-VN')}₫</span>
            {product.originalPrice && (
              <span className="product-old-price">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="btn btn-primary btn-sm"
            style={{ padding: '8px 12px' }}
            title="Thêm nhanh vào giỏ hàng"
          >
            <ShoppingBag size={16} />
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
}

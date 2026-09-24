'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Search, Filter, SlidersHorizontal, Coffee, X } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRoast, setSelectedRoast] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm' },
    { id: 'coffee-beans', name: 'Hạt Cà Phê Đặc Sản' },
    { id: 'ready-to-drink', name: 'Cold Brew & Muối Đóng Lon' },
    { id: 'drip-bag', name: 'Túi Lọc Drip Bag' },
    { id: 'equipment', name: 'Dụng Cụ Pha Chế' }
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedRoast !== 'all') {
      result = result.filter(p => p.roastLevel === selectedRoast);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.tastingNotes.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, selectedRoast, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedRoast !== 'all' || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRoast('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Shop Header Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-espresso-950), var(--color-espresso-900))',
          color: '#fff',
          padding: '60px 0 50px',
          borderBottom: '1px solid var(--color-border-dark)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '14px' }}>KAFÉ Collection</span>
            <h1 className="heading-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '14px' }}>
              Cửa Hàng Cà Phê Đặc Sản
            </h1>
            <p style={{ color: '#d6c5b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Khám phá trọn bộ các dòng hạt Robusta mật ong Buôn Ma Thuột, Arabica Cầu Đất cùng cà phê ủ lạnh Cold Brew đóng chai và dụng cụ pha chế thủ công cao cấp.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '40px' }}>
        {/* Category Pills Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '30px',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: selectedCategory === cat.id ? '1.5px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                background: selectedCategory === cat.id ? 'var(--color-espresso-900)' : 'var(--color-bg-card)',
                color: selectedCategory === cat.id ? 'var(--color-gold-light)' : 'var(--color-text-secondary)',
                boxShadow: selectedCategory === cat.id ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            background: 'var(--color-bg-card)',
            padding: '18px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          {/* Search box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--color-cream-50)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 18px',
              minWidth: '280px',
              flexGrow: 1,
              maxWidth: '400px'
            }}
          >
            <Search size={18} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Tìm theo tên hạt, vùng trồng, nốt hương..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem'
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: 'var(--color-text-muted)' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Right filter controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Roast Level filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Mức rang:</span>
              <select
                value={selectedRoast}
                onChange={e => setSelectedRoast(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-cream-50)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              >
                <option value="all">Tất cả mức rang</option>
                <option value="Light">Rang Sáng (Light)</option>
                <option value="Medium">Rang Vừa (Medium)</option>
                <option value="Dark">Rang Đậm (Dark)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-cream-50)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="btn btn-outline btn-sm"
                style={{ color: '#c43232', borderColor: '#fca5a5' }}
              >
                <X size={14} /> Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Product Count Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
            <Coffee size={40} className="spin-animation" style={{ marginBottom: '16px', color: 'var(--color-roast-amber)' }} />
            <p>Đang chuẩn bị danh mục cà phê...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}
          >
            <Coffee size={48} color="var(--color-cream-300)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-espresso-950)' }}>
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Hãy thử tìm kiếm từ khóa khác hoặc xóa bớt các tiêu chí lọc.
            </p>
            <button onClick={clearAllFilters} className="btn btn-primary btn-sm">
              Xóa tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '30px'
            }}
          >
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

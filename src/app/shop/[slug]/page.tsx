'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Product, Review } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { Star, ShieldCheck, Flame, Mountain, Droplets, ShoppingBag, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // User selections
  const [selectedWeight, setSelectedWeight] = useState<number>(250);
  const [selectedGrind, setSelectedGrind] = useState<string>('Nguyên hạt');
  const [quantity, setQuantity] = useState<number>(1);

  // Review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          const prod: Product = data.data;
          setProduct(prod);
          setSelectedWeight(prod.weightOptions[0] || 250);
          setSelectedGrind(prod.grindOptions[0] || 'Nguyên hạt');

          // Fetch reviews
          const revRes = await fetch(`/api/reviews?productId=${prod.id}`);
          const revData = await revRes.json();
          if (revData.success) {
            setReviews(revData.data);
          }

          // Fetch related
          const allRes = await fetch('/api/products');
          const allData = await allRes.json();
          if (allData.success) {
            setRelatedProducts(allData.data.filter((p: Product) => p.id !== prod.id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p>Đang tải thông tin hạt cà phê...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm này</h2>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // Calculate dynamic price based on weight
  const baseWeight = product.weightOptions[0] || 250;
  const weightRatio = selectedWeight / baseWeight;
  const currentPrice = Math.round(product.price * (weightRatio > 1 ? weightRatio * 0.95 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight, selectedGrind);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWeight, selectedGrind);
    router.push('/cart');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: reviewAuthor,
          rating: reviewRating,
          comment: reviewComment
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviews([data.data, ...reviews]);
        setReviewAuthor('');
        setReviewComment('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-cream-100)', padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)' }}>
            <ArrowLeft size={14} /> Cửa hàng
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span style={{ color: 'var(--color-espresso-950)', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Main Product Showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '50px', alignItems: 'start' }}>
          {/* Left: Product Image */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
              background: '#fff',
              height: '480px'
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            {product.bestSeller && (
              <span
                className="badge badge-gold"
                style={{ position: 'absolute', top: '18px', left: '18px', padding: '6px 14px' }}
              >
                Tuyển Chọn Bán Chạy Nhất
              </span>
            )}
          </div>

          {/* Right: Product Details & Config */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--color-roast-amber)', fontWeight: 700, textTransform: 'uppercase' }}>
                {product.origin}
              </span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.88rem', fontWeight: 700 }}>
                <Star size={15} fill="#f59e0b" />
                <span>{product.rating.toFixed(1)}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewCount} đánh giá)</span>
              </div>
            </div>

            <h1 className="heading-serif" style={{ fontSize: '2.2rem', color: 'var(--color-espresso-950)', marginBottom: '14px', lineHeight: 1.25 }}>
              {product.name}
            </h1>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '22px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-roast-amber)' }}>
                {currentPrice.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                  {Math.round(product.originalPrice * weightRatio).toLocaleString('vi-VN')}₫
                </span>
              )}
              <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700, background: '#dcfce7', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                Còn hàng • Sẵn sàng giao
              </span>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '26px' }}>
              {product.description}
            </p>

            {/* Tasting Notes Tags */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '10px', textTransform: 'uppercase' }}>
                Hương vị đặc trưng (Tasting Notes):
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--color-cream-100)',
                      color: 'var(--color-espresso-800)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    ✦ {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Weight selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '10px', textTransform: 'uppercase' }}>
                Chọn khối lượng đóng gói:
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.weightOptions.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      border: selectedWeight === weight ? '2px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                      background: selectedWeight === weight ? 'var(--color-espresso-900)' : 'var(--color-bg-card)',
                      color: selectedWeight === weight ? 'var(--color-gold-light)' : 'var(--color-text-primary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {weight >= 1000 ? `${weight / 1000} kg` : `${weight}g`}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind selector */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-espresso-950)', marginBottom: '10px', textTransform: 'uppercase' }}>
                Độ xay theo phương pháp pha:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                {product.grindOptions.map(grind => (
                  <button
                    key={grind}
                    onClick={() => setSelectedGrind(grind)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      textAlign: 'center',
                      border: selectedGrind === grind ? '1.5px solid var(--color-roast-amber)' : '1px solid var(--color-border)',
                      background: selectedGrind === grind ? 'var(--color-cream-100)' : 'var(--color-bg-card)',
                      color: selectedGrind === grind ? 'var(--color-roast-amber)' : 'var(--color-text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', paddingTop: '10px' }}>
              {/* Quantity counter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-cream-50)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '40px', height: '44px', fontWeight: 700, fontSize: '1.1rem' }}
                >
                  -
                </button>
                <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '40px', height: '44px', fontWeight: 700, fontSize: '1.1rem' }}
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="btn btn-outline"
                style={{ padding: '14px 28px', flexGrow: 1 }}
              >
                <ShoppingBag size={18} /> Thêm Vào Giỏ
              </button>

              {/* Buy now */}
              <button
                onClick={handleBuyNow}
                className="btn btn-gold"
                style={{ padding: '14px 32px', flexGrow: 1 }}
              >
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        {/* Origin & Cupping Spec Cards */}
        <div style={{ marginTop: '70px', padding: '36px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="heading-serif" style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--color-espresso-950)' }}>
            Hồ Sơ Hạt Cà Phê (Coffee Profile)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-cream-100)', color: 'var(--color-roast-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mountain size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Vùng Trồng & Độ Cao</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{product.origin} ({product.altitude || 'Cao nguyên'})</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-cream-100)', color: 'var(--color-roast-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplets size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Phương Pháp Sơ Chế</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{product.process}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-cream-100)', color: 'var(--color-roast-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Mức Độ Rang</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Rang {product.roastLevel} Mộc</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-cream-100)', color: 'var(--color-roast-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Tiêu Chuẩn Rang</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Trái Chín Chuẩn SCA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div style={{ marginTop: '70px' }}>
          <h3 className="heading-serif" style={{ fontSize: '1.7rem', marginBottom: '24px', color: 'var(--color-espresso-950)' }}>
            Đánh Giá Từ Khách Hàng ({reviews.length})
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
            {/* Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {reviews.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)' }}>Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên trải nghiệm!</p>
              ) : (
                reviews.map(rev => (
                  <div
                    key={rev.id}
                    style={{
                      background: 'var(--color-bg-card)',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-espresso-950)' }}>{rev.author}</span>
                        {rev.verified && (
                          <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                            ✓ Đã mua hàng
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rev.date}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < rev.rating ? '#f59e0b' : '#e5e7eb'}
                          color={i < rev.rating ? '#f59e0b' : '#e5e7eb'}
                        />
                      ))}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Review Form */}
            <div style={{ background: 'var(--color-cream-100)', padding: '26px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-espresso-950)' }}>
                Chia sẻ cảm nhận của bạn
              </h4>

              {reviewSuccess && (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Cảm ơn bạn! Đánh giá đã được ghi nhận.
                </div>
              )}

              <form onSubmit={handleReviewSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Họ và tên của bạn:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={reviewAuthor}
                    onChange={e => setReviewAuthor(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Đánh giá chất lượng:
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        style={{ padding: '4px' }}
                      >
                        <Star
                          size={22}
                          fill={star <= reviewRating ? '#f59e0b' : 'none'}
                          color={star <= reviewRating ? '#f59e0b' : '#9ca3af'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Nội dung nhận xét:
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Hương thơm, độ đậm, trải nghiệm khi pha phin hoặc máy..."
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  <Send size={15} /> {submittingReview ? 'Đang gửi...' : 'Gửi Nhận Xét'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '90px' }}>
            <h3 className="heading-serif" style={{ fontSize: '1.7rem', marginBottom: '28px', color: 'var(--color-espresso-950)' }}>
              Có Thể Bạn Cũng Thích
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

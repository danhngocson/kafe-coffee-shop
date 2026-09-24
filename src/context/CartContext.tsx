'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, weight?: number, grind?: string) => void;
  removeFromCart: (productId: string, weight: number, grind: string) => void;
  updateQuantity: (productId: string, weight: number, grind: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kafe_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kafe_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    weight: number = product.weightOptions[0] || 250,
    grind: string = product.grindOptions[0] || 'Nguyên hạt'
  ) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedWeight === weight && item.selectedGrind === grind
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedWeight: weight, selectedGrind: grind }];
      }
    });

    showToast(`Đã thêm "${product.name}" (${weight}g - ${grind}) vào giỏ hàng!`);
  };

  const removeFromCart = (productId: string, weight: number, grind: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedWeight === weight && item.selectedGrind === grind)
      )
    );
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  const updateQuantity = (productId: string, weight: number, grind: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedWeight === weight && item.selectedGrind === grind) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string, discount: number) => {
    setAppliedCoupon({ code, discount });
    showToast(`Áp dụng mã ${code} thành công: Giảm ${discount.toLocaleString('vi-VN')}₫`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Đã hủy mã giảm giá');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    // scale price with weight if multiple weights exist
    const baseWeight = item.product.weightOptions[0] || 250;
    const ratio = item.selectedWeight / baseWeight;
    const itemPrice = Math.round(item.product.price * (ratio > 1 ? ratio * 0.95 : 1));
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

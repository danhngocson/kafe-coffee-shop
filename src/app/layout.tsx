import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: 'KAFÉ - Cà Phê Thủ Công & Hạt Đặc Sản Việt Nam',
  description: 'Trải nghiệm cà phê đặc sản tuyển chọn từ Buôn Ma Thuột và Cầu Đất. 100% hạt mộc rang thủ công, chuẩn SCA, giao tận nơi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 400px)' }}>{children}</main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}

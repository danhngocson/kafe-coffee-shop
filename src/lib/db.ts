import { Product, Order, Article, Review, Booking, Branch } from '@/types';

// Mock in-memory database
class MockDatabase {
  private products: Product[] = [
    {
      id: 'prod-1',
      name: 'Fine Robusta Honey Buôn Ma Thuột',
      slug: 'fine-robusta-honey-buon-ma-thuot',
      category: 'coffee-beans',
      price: 185000,
      originalPrice: 210000,
      rating: 4.9,
      reviewCount: 48,
      origin: 'Krông Năng, Đắk Lắk (850m)',
      altitude: '850m',
      process: 'Honey Process (Lên men mật ong)',
      roastLevel: 'Medium',
      tastingNotes: ['Mật ong hoa rừng', 'Socola đen', 'Quả hạch chín', 'Hậu vị ngọt sâu'],
      description: 'Dòng Robusta lên men mật thủ công tuyển chọn từ những trái chín 100%. Hương vị đậm đà truyền thống nhưng loại bỏ hoàn toàn vị chát gắt, mở ra tầng hương mật ong ngọt ngào và socola quyến rũ.',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      weightOptions: [250, 500, 1000],
      grindOptions: ['Nguyên hạt', 'Pha Phin truyền thống', 'Pha Máy Espresso', 'Pha Pour Over (V60)', 'Pha Cold Brew'],
      inStock: true,
      featured: true,
      bestSeller: true,
    },
    {
      id: 'prod-2',
      name: 'Arabica Catimor Cầu Đất Đà Lạt',
      slug: 'arabica-catimor-cau-dat-da-lat',
      category: 'coffee-beans',
      price: 245000,
      originalPrice: 280000,
      rating: 5.0,
      reviewCount: 62,
      origin: 'Cầu Đất, Đà Lạt (1650m)',
      altitude: '1650m',
      process: 'Washed (Sơ chế ướt)',
      roastLevel: 'Light',
      tastingNotes: ['Hương hoa nhài', 'Cam vàng', 'Đường mía', 'Chua thanh tao'],
      description: 'Nữ hoàng của vùng cao nguyên Cầu Đất. Hạt cà phê được nuôi dưỡng trong sương mù và khí hậu lạnh quanh năm, mang đến tách cà phê thơm ngát hương hoa nhài và vị chua thanh sang trọng của cam bưởi chín.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      weightOptions: [250, 500, 1000],
      grindOptions: ['Nguyên hạt', 'Pha Pour Over (V60)', 'Pha Cold Brew', 'Pha Phin', 'Pha Máy Espresso'],
      inStock: true,
      featured: true,
      bestSeller: true,
    },
    {
      id: 'prod-3',
      name: 'KAFÉ Signature Blend (70% Robusta - 30% Arabica)',
      slug: 'kafe-signature-blend',
      category: 'coffee-beans',
      price: 195000,
      rating: 4.8,
      reviewCount: 95,
      origin: 'Blend Đắk Lắk & Lâm Đồng',
      process: 'Natural & Washed',
      roastLevel: 'Medium',
      tastingNotes: ['Socola sữa', 'Caramel cháy', 'Hạnh nhân nướng', 'Crema dày mịn'],
      description: 'Tỉ lệ vàng độc quyền tại KAFÉ Roastery, phối trộn hoàn hảo giữa độ đậm bốc của Robusta Krông Năng và hương thơm ngát của Arabica Cầu Đất. Lý tưởng cho cả cà phê sữa đá lẫn Americano hiện đại.',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
      weightOptions: [250, 500, 1000],
      grindOptions: ['Nguyên hạt', 'Pha Phin truyền thống', 'Pha Máy Espresso', 'Pha Moka Pot'],
      inStock: true,
      featured: true,
      bestSeller: true,
    },
    {
      id: 'prod-4',
      name: 'Fine Robusta Wine Natural Sơn La',
      slug: 'fine-robusta-wine-natural-son-la',
      category: 'coffee-beans',
      price: 230000,
      rating: 4.7,
      reviewCount: 31,
      origin: 'Chiềng Ban, Sơn La (900m)',
      altitude: '900m',
      process: 'Wine Yeast Anaerobic Fermentation',
      roastLevel: 'Medium',
      tastingNotes: ['Rượu vang đỏ', 'Trái cây mọng', 'Gỗ sồi', 'Vị men ngọt ngào'],
      description: 'Phương pháp lên men kỵ khí cùng men rượu vang kéo dài 72 giờ tạo nên nốt hương say đắm lòng người. Tách cà phê ấm áp như một ly vang Tây Bắc giữa tiết trời sương lạnh.',
      image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
      weightOptions: [250, 500],
      grindOptions: ['Nguyên hạt', 'Pha Pour Over (V60)', 'Pha Cold Brew', 'Pha Phin'],
      inStock: true,
      featured: false,
    },
    {
      id: 'prod-5',
      name: 'Chai Cold Brew Cam Vàng Đào Mọng (250ml)',
      slug: 'chai-cold-brew-cam-vang-dao-mong',
      category: 'ready-to-drink',
      price: 65000,
      originalPrice: 75000,
      rating: 4.9,
      reviewCount: 112,
      origin: 'KAFÉ Cold Brew Lab',
      process: 'Ủ chậm 18 tiếng ở 4°C',
      roastLevel: 'Light',
      tastingNotes: ['Cam vàng mọng nước', 'Hương đào dịu nhẹ', 'Trà đen thanh mát', 'Vị ngọt thanh tự nhiên'],
      description: 'Chiết xuất từ 100% hạt Arabica Cầu Đất ủ lạnh suốt 18 giờ trong môi trường vô trùng, kết hợp tinh chất cam vàng hữu cơ và đào tươi. Thức uống mát lạnh bừng tỉnh mọi giác quan.',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      weightOptions: [250, 500],
      grindOptions: ['Pha sẵn đóng chai tiệt trùng'],
      inStock: true,
      featured: true,
      bestSeller: true,
    },
    {
      id: 'prod-6',
      name: 'Cà Phê Muối Hoàng Gia Đóng Lon (6 Lon/Lốc)',
      slug: 'ca-phe-muoi-hoang-gia-dong-lon',
      category: 'ready-to-drink',
      price: 155000,
      rating: 4.8,
      reviewCount: 78,
      origin: 'Công thức Cố Đô Huế',
      process: 'Ủ lạnh kết hợp kem muối béo mặn',
      roastLevel: 'Medium',
      tastingNotes: ['Cà phê Robusta đậm', 'Kem béo mặn nhẹ', 'Hậu vị bơ caramen'],
      description: 'Sự hoà quyện huyền thoại giữa cốt cà phê pha phin truyền thống và lớp kem bơ muối tinh biển Tuy Hòa. Đóng lon tiện lợi mở nắp là thưởng thức ngay.',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
      weightOptions: [250],
      grindOptions: ['Lon uống liền 240ml'],
      inStock: true,
      featured: true,
    },
    {
      id: 'prod-7',
      name: 'Hộp Cà Phê Túi Lọc Drip Bag Khám Phá (10 Túi)',
      slug: 'hop-ca-phe-tui-loc-drip-bag-kham-pha',
      category: 'drip-bag',
      price: 135000,
      originalPrice: 160000,
      rating: 4.9,
      reviewCount: 140,
      origin: 'Tuyển tập 5 vùng trồng Việt Nam',
      process: 'Đóng gói màng lọc Nhật Bản có khí Nitơ bảo quản',
      roastLevel: 'Medium',
      tastingNotes: ['Đa tầng hương vị', 'Đậm đà phin', 'Thanh thoát V60'],
      description: 'Thưởng thức cà phê đặc sản chuẩn gu mọi lúc mọi nơi chỉ với 1 phút rót nước sôi. Hộp gồm 5 loại hạt đặc trưng từ Đắk Lắk, Đà Lạt, Sơn La, Điện Biên và Quảng Trị.',
      image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80',
      weightOptions: [150],
      grindOptions: ['Túi lọc giấy tự hủy'],
      inStock: true,
      bestSeller: true,
    },
    {
      id: 'prod-8',
      name: 'Phin Nhôm Anodized Thủ Công KAFÉ (Màu Đồng Cổ)',
      slug: 'phin-nhom-anodized-thu-cong-mau-dong-co',
      category: 'equipment',
      price: 160000,
      rating: 5.0,
      reviewCount: 88,
      origin: 'Gia công thủ công tại Việt Nam',
      process: 'Mạ Anodized chống oxy hóa cao cấp',
      roastLevel: 'Medium',
      tastingNotes: ['Giữ nhiệt đều', 'Chiết xuất giọt vàng', 'Độ bền vĩnh cửu'],
      description: 'Chiếc phin nhôm chuẩn tỉ lệ lỗ dập laser siêu mịn giúp dòng chảy đều đặn, không lọt cặn và giữ trọn độ nóng ấm cho giọt cà phê đậm đà khó quên.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
      weightOptions: [100],
      grindOptions: ['Phụ kiện pha chế'],
      inStock: true,
      featured: false,
    },
    {
      id: 'prod-9',
      name: 'Bình Pha Cà Phê Pour Over V60 Kính Borosilicate',
      slug: 'binh-pha-ca-phe-pour-over-v60',
      category: 'equipment',
      price: 320000,
      originalPrice: 380000,
      rating: 4.9,
      reviewCount: 45,
      origin: 'Chịu nhiệt Borosilicate cao cấp',
      process: 'Thổi thuỷ tinh thủ công chịu nhiệt 150°C',
      roastLevel: 'Light',
      tastingNotes: ['Chiết xuất sáng trong', 'Tôn vinh tầng hương hoa quả'],
      description: 'Dụng cụ không thể thiếu cho những tín đồ yêu thích cà phê thủ công Pour Over. Thiết kế gân xoắn ốc bên trong phễu giúp đối lưu khí hoàn hảo.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      weightOptions: [500],
      grindOptions: ['Dụng cụ pha chế kèm phễu'],
      inStock: true,
    },
    {
      id: 'prod-10',
      name: 'Ấm Rót Nước Cổ Ngỗng KAFÉ Gooseneck Kettle (600ml)',
      slug: 'am-rot-nuoc-co-ngong-gooseneck',
      category: 'equipment',
      price: 490000,
      rating: 4.8,
      reviewCount: 39,
      origin: 'Thép không gỉ 304 phủ sơn tĩnh điện nhám',
      process: 'Đầu vòi công thái học 90 độ',
      roastLevel: 'Medium',
      tastingNotes: ['Kiểm soát dòng nước siêu mượt', 'Cân bằng tay cầm tuyệt hảo'],
      description: 'Vòi cổ ngỗng thanh thoát cho phép bạn kiểm soát dòng nước chảy thẳng đứng 90° với tốc độ hoàn hảo, giúp ủ cà phê nở đều và chiết xuất trọn vẹn hương vị tinh tế.',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      weightOptions: [600],
      grindOptions: ['Dụng cụ pha chế'],
      inStock: true,
    }
  ];

  private categories = [
    { id: 'all', name: 'Tất cả sản phẩm', count: 10 },
    { id: 'coffee-beans', name: 'Hạt Cà Phê Đặc Sản', count: 4 },
    { id: 'ready-to-drink', name: 'Cà Phê Đóng Chai & Lon', count: 2 },
    { id: 'drip-bag', name: 'Cà Phê Túi Lọc Tiện Lợi', count: 1 },
    { id: 'equipment', name: 'Dụng Cụ & Phụ Kiện Pha', count: 3 }
  ];

  private orders: Order[] = [
    {
      id: 'KAFE-89214',
      createdAt: '2026-09-21T10:30:00Z',
      customerName: 'Nguyễn Văn An',
      phone: '0912345678',
      email: 'an.nguyen@gmail.com',
      address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22',
      city: 'Bình Thạnh, TP. Hồ Chí Minh',
      note: 'Giao giờ hành chính giúp em ạ',
      items: [
        {
          productId: 'prod-1',
          productName: 'Fine Robusta Honey Buôn Ma Thuột',
          productImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
          price: 185000,
          quantity: 2,
          weight: 500,
          grind: 'Pha Phin truyền thống'
        },
        {
          productId: 'prod-8',
          productName: 'Phin Nhôm Anodized Thủ Công KAFÉ (Màu Đồng Cổ)',
          productImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
          price: 160000,
          quantity: 1,
          weight: 100,
          grind: 'Phụ kiện pha chế'
        }
      ],
      subtotal: 530000,
      shippingFee: 0,
      discount: 30000,
      total: 500000,
      paymentMethod: 'vietqr',
      paymentStatus: 'paid',
      status: 'shipping',
      trackingCode: 'VNP-89214710-HCM'
    },
    {
      id: 'KAFE-89215',
      createdAt: '2026-09-22T08:15:00Z',
      customerName: 'Trần Thị Mai',
      phone: '0988776655',
      email: 'mai.tran@outlook.com',
      address: 'Số 45 Tràng Tiền, Quận Hoàn Kiếm',
      city: 'Hà Nội',
      items: [
        {
          productId: 'prod-2',
          productName: 'Arabica Catimor Cầu Đất Đà Lạt',
          productImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
          price: 245000,
          quantity: 1,
          weight: 250,
          grind: 'Pha Pour Over (V60)'
        }
      ],
      subtotal: 245000,
      shippingFee: 25000,
      discount: 0,
      total: 270000,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status: 'roasting',
      trackingCode: 'VNP-89215882-HN'
    }
  ];

  private articles: Article[] = [
    {
      id: 'art-1',
      title: 'Hành Trình Đổi Đời Của Hạt Robusta Việt Nam: Từ Bình Dân Lên Tầm Thế Giới',
      slug: 'hanh-trinh-robusta-viet-nam-len-tam-the-gioi',
      category: 'Kiến Thức Cà Phê',
      readTime: '6 phút đọc',
      publishDate: '15/09/2026',
      excerpt: 'Robusta Việt Nam từng bị gắn mác là rẻ tiền và đắng gắt. Giờ đây, làn sóng Fine Robusta lên men thủ công đang khiến các chuyên gia thế giới phải kinh ngạc.',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Trần Khang Minh',
        role: 'Master Roaster & Q-Grader',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      content: `Việt Nam tự hào là quốc gia xuất khẩu cà phê Robusta số 1 thế giới. Thế nhưng trong suốt nhiều thập kỷ, hình ảnh hạt cà phê của chúng ta thường bị gắn liền với cụm từ "giá rẻ", "nguyên liệu công nghiệp", "vị đắng khét".

### Làn sóng cà phê thứ tư và sự trỗi dậy của Fine Robusta
Những người nông dân trẻ tại Buôn Ma Thuột, Krông Năng và Pleiku đã bắt đầu thay đổi tư duy: hái chín chọn lọc 100%, kiểm soát quá trình lên men yếm khí kéo dài, phơi giàn trong nhà màng khử tia UV. Kết quả là những hạt Fine Robusta đạt trên 80 điểm theo chuẩn SCA quốc tế, mang dải hương thơm ngát của mật ong rừng, mứt đào và chocolate đen bùi béo.

### Tương lai của cà phê Việt
Tại KAFÉ Roastery, chúng tôi tin rằng Robusta không hề kém cạnh Arabica, mà là một bản sắc độc tôn đầy kiêu hãnh của đất trời Tây Nguyên đất đỏ bazan.`
    },
    {
      id: 'art-2',
      title: 'Bí Quyết Pha Phin Đậm Đà Chuẩn Vị Mà Không Bị Đắng Gắt',
      slug: 'bi-quyet-pha-phin-dam-da-khong-dang-gat',
      category: 'Cẩm Nang Pha Chế',
      readTime: '4 phút đọc',
      publishDate: '18/09/2026',
      excerpt: 'Chỉ cần một vài thay đổi nhỏ về nhiệt độ nước và thời gian ủ bột, tách cà phê phin của bạn sẽ thơm bốc, sánh quyện và ngọt hậu kéo dài.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Lê Thảo Vy',
        role: 'Head Barista tại KAFÉ',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      content: `Pha phin là nét văn hóa ăn sâu vào tiềm thức của người Việt. Nhưng bạn đã bao giờ tự hỏi vì sao cà phê phin pha ở nhà đôi khi lại bị khét, chát và đắng nghẹt cổ?

### 1. Nhiệt độ nước lý tưởng: 90°C - 93°C
Đừng bao giờ đổ nước sôi 100°C trực tiếp lên bột cà phê mộc. Nhiệt độ quá cao sẽ làm cháy các hợp chất thơm dễ bay hơi và kéo theo vị đắng chát khó chịu.

### 2. Giai đoạn ủ cà phê (Bloom)
Rót khoảng 25ml nước sôi vào đáy đĩa phin và mặt trên của phin, đậy nắp trong 1.5 - 2 phút. Bột cà phê sẽ hấp thụ nhiệt, nở đều và giải phóng khí CO2 tích tụ, tạo tiền đề cho dòng chảy chiết xuất vàng ươm.

### 3. Tốc độ chảy chuẩn
Một tách phin chuẩn sẽ nhỏ giọt đều đặn trong khoảng 4 đến 5 phút. Nếu chảy quá nhanh, cà phê sẽ nhạt; nếu nhỏ giọt quá chậm, bột bị nén quá chặt gây tắc nghẽn.`
    },
    {
      id: 'art-3',
      title: 'Cold Brew: Nghệ Thuật Chiết Xuất Cà Phê Bằng Thời Gian Và Nước Lạnh',
      slug: 'cold-brew-nghe-thuat-chiet-xuat-bang-thoi-gian',
      category: 'Phong Cách Sống',
      readTime: '5 phút đọc',
      publishDate: '20/09/2026',
      excerpt: 'Không qua nhiệt độ cao, Cold Brew đem lại tách cà phê mượt mà, hàm lượng axit thấp hơn 67%, cực kỳ êm dịu cho dạ dày trong những ngày hè oi bức.',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Trần Khang Minh',
        role: 'Master Roaster & Q-Grader',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      content: `Cold brew không đơn thuần là cà phê pha xong rồi cho đá vào. Đó là một phương pháp ngâm ủ bột cà phê xay thô trong nước lạnh ở nhiệt độ 4°C - 8°C trong thời gian dài từ 16 đến 24 giờ.

### Vì sao Cold Brew được yêu thích toàn cầu?
- **Hương vị êm dịu:** Không bị oxy hóa bởi nhiệt, Cold Brew loại bỏ gần như toàn bộ vị chua gắt và vị đắng chát.
- **Tốt cho dạ dày:** Lượng axit tự nhiên giảm đáng kể, giúp người có dạ dày nhạy cảm vẫn có thể thưởng thức thoải mái.
- **Tiện lợi:** Có thể bảo quản trong ngăn mát tủ lạnh lên tới 2 tuần mà hương vị vẫn tươi nguyên.`
    }
  ];

  private reviews: Review[] = [
    {
      id: 'rev-1',
      productId: 'prod-1',
      author: 'Nguyễn Thành Nam',
      rating: 5,
      date: '19/09/2026',
      comment: 'Hạt rang rất đều màu, mở túi ra mùi thơm ngào ngạt như socola và mật ong. Mình pha phin sữa đá thấy đậm đà và hậu vị ngọt rất lâu, hoàn toàn không có mùi khét bắp đậu.',
      verified: true
    },
    {
      id: 'rev-2',
      productId: 'prod-2',
      author: 'Hoàng Lan Hương',
      rating: 5,
      date: '20/09/2026',
      comment: 'Catimor Cầu Đất của shop quá tuyệt vời khi pha Pour Over V60! Nốt hương cam hoa nhài rất thanh thoát, uống buổi sáng tinh thần sảng khoái hẳn. Đóng gói túi zip van 1 chiều xịn sò.',
      verified: true
    },
    {
      id: 'rev-3',
      productId: 'prod-3',
      author: 'Bảo Long',
      rating: 5,
      date: '21/09/2026',
      comment: 'Blend này dùng cho máy pha espresso tại nhà ra lớp Crema vàng óng ánh cực dày. Vị đậm vừa phải, uống Americano rất hợp gu.',
      verified: true
    }
  ];

  private branches: Branch[] = [
    {
      id: 'branch-1',
      name: 'KAFÉ Flagship Roastery Thảo Điền',
      address: '68 Xuân Thủy, Phường Thảo Điền',
      district: 'Thành phố Thủ Đức',
      city: 'TP. Hồ Chí Minh',
      phone: '028 3822 9988',
      hours: '07:00 - 22:30 (Mỗi ngày)',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      features: ['Xưởng rang trực tiếp', 'Workshop Cupping Room', 'Sân vườn nhiệt đới', 'Chỗ đỗ ô tô']
    },
    {
      id: 'branch-2',
      name: 'KAFÉ Heritage Nhà Cổ Hoàn Kiếm',
      address: '12 Phố Nhà Thờ, Hàng Trống',
      district: 'Quận Hoàn Kiếm',
      city: 'Hà Nội',
      phone: '024 3933 6677',
      hours: '07:00 - 23:00 (Mỗi ngày)',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      features: ['Không gian biệt thự cổ', 'View ngắm Nhà Thờ Lớn', 'Phục vụ Cà Phê Trứng', 'Bar pha chế Slow Bar']
    },
    {
      id: 'branch-3',
      name: 'KAFÉ Farmhouse Cầu Đất',
      address: 'Đồi Trà Cầu Đất, Xã Xuân Trường',
      district: 'TP. Đà Lạt',
      city: 'Lâm Đồng',
      phone: '0263 388 1234',
      hours: '06:30 - 18:00 (Mỗi ngày)',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
      features: ['Ngay giữa nông trại cà phê', 'Trải nghiệm hái quả chín', 'Săn mây ngắm hoàng hôn', 'Cắm trại Glamping']
    }
  ];

  private bookings: Booking[] = [
    {
      id: 'BOOK-101',
      fullName: 'Phạm Quỳnh Anh',
      phone: '0903123456',
      email: 'quynhanh@gmail.com',
      date: '2026-09-25',
      timeSlot: '09:30 - 11:30',
      guestCount: 2,
      workshopType: 'Khám Phá Hương Vị Cà Phê Đặc Sản (Cupping Session)',
      branch: 'KAFÉ Flagship Roastery Thảo Điền',
      status: 'confirmed',
      createdAt: '2026-09-21T14:00:00Z'
    }
  ];

  private vouchers: Record<string, { discountPercent?: number; discountAmount?: number; minSpend: number }> = {
    'KAFE20': { discountPercent: 20, minSpend: 200000 },
    'BANME': { discountAmount: 30000, minSpend: 150000 },
    'FREESHIP': { discountAmount: 25000, minSpend: 100000 }
  };

  // Methods
  getProducts(category?: string, search?: string, roastLevel?: string, sort?: string): Product[] {
    let result = [...this.products];
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.origin.toLowerCase().includes(q) ||
        p.tastingNotes.some(t => t.toLowerCase().includes(q))
      );
    }
    if (roastLevel && roastLevel !== 'all') {
      result = result.filter(p => p.roastLevel === roastLevel);
    }
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products.find(p => p.slug === slug || p.id === slug);
  }

  getCategories() {
    return this.categories;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id || o.trackingCode === id);
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'trackingCode' | 'status'>): Order {
    const id = `KAFE-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingCode = `VNP-${Math.floor(10000000 + Math.random() * 90000000)}-VN`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString(),
      trackingCode,
      status: 'pending'
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status'], paymentStatus?: Order['paymentStatus']): Order | null {
    const order = this.getOrderById(id);
    if (!order) return null;
    order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    return order;
  }

  getArticles(): Article[] {
    return this.articles;
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.articles.find(a => a.slug === slug || a.id === slug);
  }

  getReviews(productId?: string): Review[] {
    if (productId) {
      return this.reviews.filter(r => r.productId === productId);
    }
    return this.reviews;
  }

  addReview(reviewData: Omit<Review, 'id' | 'date'>): Review {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN')
    };
    this.reviews.unshift(newReview);
    return newReview;
  }

  getBranches(): Branch[] {
    return this.branches;
  }

  getBookings(): Booking[] {
    return this.bookings;
  }

  createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
    const newBooking: Booking = {
      ...data,
      id: `BOOK-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  validateVoucher(code: string, subtotal: number) {
    const voucher = this.vouchers[code.toUpperCase()];
    if (!voucher) {
      return { valid: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
    }
    if (subtotal < voucher.minSpend) {
      return { 
        valid: false, 
        message: `Đơn hàng tối thiểu để áp dụng mã này là ${voucher.minSpend.toLocaleString('vi-VN')}₫.` 
      };
    }
    let discount = 0;
    if (voucher.discountPercent) {
      discount = Math.round((subtotal * voucher.discountPercent) / 100);
    } else if (voucher.discountAmount) {
      discount = voucher.discountAmount;
    }
    return { valid: true, discount, message: 'Áp dụng mã giảm giá thành công!' };
  }

  getStats() {
    const totalRevenue = this.orders.reduce((acc, o) => acc + o.total, 0);
    const totalOrders = this.orders.length;
    const totalProducts = this.products.length;
    const totalBookings = this.bookings.length;
    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalBookings,
      recentOrders: this.orders.slice(0, 5)
    };
  }
}

// Global singleton instance
const globalDb = (global as unknown as { mockDb?: MockDatabase });
if (!globalDb.mockDb) {
  globalDb.mockDb = new MockDatabase();
}
export const db = globalDb.mockDb;

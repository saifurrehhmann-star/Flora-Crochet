import { Product, Category, Coupon, FaqItem, Banner } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'amigurumi',
    name: 'Amigurumi & Toys',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=600&auto=format&fit=crop',
    description: 'Adorably soft plushies, handmade with love and super-soft hypoallergenic yarn.',
    count: 3
  },
  {
    id: 'bags-accessories',
    name: 'Bags & Accessories',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop',
    description: 'Chic tote bags, aesthetic hair clips, and cozy beanies to elevate your style.',
    count: 3
  },
  {
    id: 'wearables',
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    description: 'Beautiful cardigans, custom vests, and head-turning statement sweaters.',
    count: 2
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop',
    description: 'Cozy coasters, decorative hangers, and warm blankets for a snuggly home.',
    count: 2
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Clover the Chubby Frog Plushie',
    description: 'Meet Clover! This chubby little frog is the absolute perfect desk buddy or emotional support plush. Made from premium ultra-soft chenille blanket yarn, Clover is squishy, soft, and completely hypoallergenic. He fits perfectly in your palms and is guaranteed to make you smile every single day. 100% safety eyes are securely locked in place.',
    category: 'amigurumi',
    price: 24.99,
    discountPrice: 19.99,
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewsCount: 18,
    variants: [
      { name: 'Yarn Color', options: ['Sage Green', 'Mint Green', 'Soft Yellow'] },
      { name: 'Hat Style', options: ['Strawberry Hat', 'No Hat', 'Tiny Crown'] }
    ],
    stock: 12,
    tags: ['Featured', 'Best Seller', 'New Arrival', 'Sale'],
    sku: 'AM-FROG-001',
    reviews: [
      { id: 'r1_1', userName: 'Amina R.', rating: 5, comment: 'Oh my goodness, Clover is even cuter in person! So soft and squidgy. Will definitely buy another!', date: '2026-06-15' },
      { id: 'r1_2', userName: 'Sam K.', rating: 5, comment: 'Excellent quality, stitch work is incredibly clean. Worth every cent.', date: '2026-06-20' },
      { id: 'r1_3', userName: 'Leah T.', rating: 4.8, comment: 'Super cute! My daughter is obsessed with the strawberry hat variant.', date: '2026-07-02' }
    ]
  },
  {
    id: 'p2',
    name: 'Retro Daisy Square Tote Bag',
    description: 'Carry your daily essentials in style with our Retro Daisy Square Tote Bag! Masterfully crocheted with sturdy, premium 100% combed cotton yarn, this shoulder bag is robust yet incredibly lightweight. Each daisy granny square is meticulously hand-stitched together, completed with a beautifully woven strap that holds its shape under weight. Fits a standard tablet, novel, and all your absolute daily essentials.',
    category: 'bags-accessories',
    price: 45.00,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewsCount: 12,
    variants: [
      { name: 'Base Color', options: ['Creamy Beige', 'Lilac Dream', 'Pastel Sage'] }
    ],
    stock: 5,
    tags: ['Best Seller', 'Featured'],
    sku: 'BG-DAISY-002',
    reviews: [
      { id: 'r2_1', userName: 'Elena P.', rating: 5, comment: 'Extremely sturdy structure. It holds its shape perfectly and I get compliments everywhere I go.', date: '2026-05-18' },
      { id: 'r2_2', userName: 'Nisha M.', rating: 4, comment: 'Beautiful stitching! Took a bit to arrive but totally handmade so expected.', date: '2026-06-05' }
    ]
  },
  {
    id: 'p3',
    name: 'Strawberry Fields Cloud Cardigan',
    description: 'Wrap yourself in absolute coziness with our best-selling Strawberry Fields Cloud Cardigan. Modeled with a relaxed, chunky balloon-sleeve design, this premium cardigan features charming hand-crocheted strawberries and daisies scattered over white cloud-like soft yarn. It feels like wearing a warm hug! Made from thick, premium acrylic yarn that stays wonderfully soft and cozy, resisting pilling over time.',
    category: 'wearables',
    price: 89.99,
    discountPrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviewsCount: 24,
    variants: [
      { name: 'Size', options: ['XS/S (Oversized)', 'M/L (Oversized)', 'XL/XXL (Oversized)'] },
      { name: 'Base Color', options: ['Cream White', 'Soft Pink', 'Lavender Sky'] }
    ],
    stock: 3,
    tags: ['Featured', 'Sale'],
    sku: 'WR-CARD-003',
    reviews: [
      { id: 'r3_1', userName: 'Sophia W.', rating: 5, comment: 'Its like wearing a marshmallow! The hand-crocheted strawberries are so cute and puffy.', date: '2026-07-10' },
      { id: 'r3_2', userName: 'Chloe L.', rating: 5, comment: 'Absolutely stunning. I wear this everywhere and everyone keeps asking where I bought it!', date: '2026-07-12' }
    ]
  },
  {
    id: 'p4',
    name: 'Sunbeam Blossom Mug Rug Set (4pcs)',
    description: 'Transform your coffee breaks into a joyful ritual with our Sunbeam Blossom Mug Rug Set! Expertly hand-knotted and fringed, these daisy coasters provide the most charming, aesthetic resting spot for your hot mugs, matcha glasses, or candles. Handcrafted using double-thick cotton thread, they are highly absorbent, washable, and completely heat-resistant, keeping your tabletop safe and beautiful.',
    category: 'home-decor',
    price: 18.00,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewsCount: 8,
    variants: [
      { name: 'Color Theme', options: ['Sunshine Yellow', 'Boho Terracotta', 'Mixed Pastel'] }
    ],
    stock: 15,
    tags: ['New Arrival'],
    sku: 'HD-COAS-004',
    reviews: [
      { id: 'r4_1', userName: 'Maria S.', rating: 5, comment: 'Beautiful and highly absorbent! They add such a lovely warm touch to my coffee table.', date: '2026-04-12' }
    ]
  },
  {
    id: 'p5',
    name: 'Barnaby the Boba Milk Tea Bear',
    description: 'Meet Barnaby! He is a darling chubby teddy bear who absolutely loves his bubble tea. Sitting at a cute 6 inches tall, he holds a tiny handcrafted cup of boba complete with a miniature felt straw and tiny embroidered tapioca pearls. Crafted with ultra-soft velvet milk-cotton yarn and premium polyester fiberfill, Barnaby is a superb bedside guardian and a dream gift for any boba lover.',
    category: 'amigurumi',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewsCount: 14,
    variants: [
      { name: 'Boba Flavor', options: ['Classic Milk Tea', 'Taro Purple', 'Matcha Green'] }
    ],
    stock: 8,
    tags: ['Best Seller'],
    sku: 'AM-BEAR-005',
    reviews: [
      { id: 'r5_1', userName: 'Kevin J.', rating: 5, comment: 'Bought this as a gift for my partner. They cried, it was so incredibly adorable. High quality work.', date: '2026-06-25' }
    ]
  },
  {
    id: 'p6',
    name: 'Aesthetic Tulip Fields Hair Claw Clip',
    description: 'Accessorize gracefully with these gorgeous handmade Tulip fields claw clips! Each lightweight clip features highly detailed hand-woven crochet tulip flowers and leaves, securely mounted onto a strong-hold pastel pink or sage green hair claw. Holds both thick and thin hair securely without slipping, giving you a perfect whimsical cottagecore crown.',
    category: 'bags-accessories',
    price: 12.50,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.6,
    reviewsCount: 9,
    variants: [
      { name: 'Tulip Color', options: ['Sunset Peach', 'Graceful Lavender', 'Blush Pink'] }
    ],
    stock: 20,
    tags: ['New Arrival', 'Sale'],
    sku: 'AC-CLIP-006',
    reviews: [
      { id: 'r6_1', userName: 'Zara D.', rating: 5, comment: 'Incredibly cute. Holds my thick hair really well and looks so dainty!', date: '2026-07-01' }
    ]
  },
  {
    id: 'p7',
    name: 'Cottagecore Pastel Tulip Bouquet',
    description: 'Flowers that live forever! These beautiful, hand-crocheted everlasting tulips are the perfect centerpieces, nursery decoration, or anniversary gift. Carefully woven with hypoallergenic soft cotton yarn, each flower contains a sturdy interior wire that lets you bend and pose the stem to fit perfectly into any vase. Pack of 5 stems in premium wrapping.',
    category: 'home-decor',
    price: 34.00,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewsCount: 20,
    variants: [
      { name: 'Bouquet Mix', options: ['Spring Pastel (Mix)', 'Romantic Rose & Peach', 'Elegant Lilac Mix'] }
    ],
    stock: 6,
    tags: ['Featured', 'Best Seller'],
    sku: 'HD-TULI-007',
    reviews: [
      { id: 'r7_1', userName: 'Fiona M.', rating: 5, comment: 'Absolutely breathtaking! They came beautifully packaged and smell faintly of lavender. Perfect gift!', date: '2026-07-05' }
    ]
  },
  {
    id: 'p8',
    name: 'Sage Meadow Cropped Sweater Vest',
    description: 'Add a cute vintage layer to your outfits with our Sage Meadow Cropped Sweater Vest. Exquisitely handcrafted with delicate grid stitching and features dainty hand-embroidered daisy blossoms along the borders. Fits beautifully over collared blouses, button-down shirts, or summer dresses. Made with breathable premium cotton-blend thread.',
    category: 'wearables',
    price: 64.00,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewsCount: 7,
    variants: [
      { name: 'Size', options: ['S', 'M', 'L'] }
    ],
    stock: 4,
    tags: ['New Arrival'],
    sku: 'WR-VEST-008',
    reviews: [
      { id: 'r8_1', userName: 'Julia B.', rating: 5, comment: 'Perfect layer! The hand embroidery is so delicate and beautiful. Fits perfectly.', date: '2026-06-30' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'CROCHETLOVE', discountType: 'percentage', value: 10, minSpend: 20, description: 'Get 10% OFF on all adorable items (minimum spend Rs. 20)' },
  { code: 'WELCOME15', discountType: 'flat', value: 15, minSpend: 60, description: 'Enjoy Rs. 15 FLAT discount on purchases above Rs. 60' },
  { code: 'FREESHIP', discountType: 'percentage', value: 100, minSpend: 50, description: 'Free shipping on orders over Rs. 50' } // handled specially or acts as free shipping
];

export const FAQS: FaqItem[] = [
  {
    question: 'How long does it take to craft a custom order?',
    answer: 'Each handmade item is individually crafted with high precision. Standard custom orders take between 7 to 14 business days, depending on the complexity of the design, size, and current order volume. Once you submit a custom order request, we will email you or contact you on WhatsApp with a precise timeline.',
    category: 'Custom Orders'
  },
  {
    question: 'What materials do you use for your amigurumi plushies?',
    answer: 'We prioritize premium safety and comfort! Most plushies are made from ultra-soft chenille blanket yarn or highly combed premium milk-cotton yarn. All stuffings are hypoallergenic premium polyester fiberfill. We use safety eyes that are locked behind double-reinforced backings. However, for children under 3, we recommend our fully embroidered-eye option which can be chosen during custom orders!',
    category: 'Care'
  },
  {
    question: 'How do I wash and take care of my crochet pieces?',
    answer: 'To ensure your crochet items last forever, we recommend hand washing in cool water with gentle baby detergent. Gently squeeze out excess water (do not wring or twist), reshape the item, and lay it flat on a clean dry towel away from direct sunlight to air dry. Please do not iron or dry clean.',
    category: 'Care'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship our handmade happiness worldwide. Domestic shipping takes 3-5 days. International shipping takes roughly 10-18 business days depending on location. Tracking numbers are sent via email as soon as the package leaves our cozy studio.',
    category: 'Shipping'
  },
  {
    question: 'Can I cancel or modify my custom order?',
    answer: 'Since custom orders are specifically handcrafted for you, cancellations can only be made within 24 hours of your order being approved and payment completed. After work has begun on your piece, we cannot offer cancellations or full refunds.',
    category: 'Custom Orders'
  },
  {
    question: 'Are payments secure?',
    answer: 'Absolutely! Our store utilizes secure checkout. We accept credit cards, PayPal, and also offer a direct "Order on WhatsApp" option where you can pay via local bank transfer or mobile wallet after checking out with our support.',
    category: 'General'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Stitched with Love, Crafted for Cozy',
    subtitle: 'Explore our custom collections of adorable hand-crocheted plushies, wearables, and cozy home decor.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
    link: 'shop',
    active: true
  },
  {
    id: 'b2',
    title: 'Have a Unique Idea in Mind?',
    subtitle: 'Our Custom Order System lets you design your dream plushie, choosing your favorite pastel colors, custom size, and exact details.',
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=1200&auto=format&fit=crop',
    link: 'custom-order',
    active: true
  }
];

export const INSTAGRAM_POSTS = [
  { id: 'ig1', image: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=300&auto=format&fit=crop', likes: 142, link: '#' },
  { id: 'ig2', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=300&auto=format&fit=crop', likes: 218, link: '#' },
  { id: 'ig3', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=300&auto=format&fit=crop', likes: 310, link: '#' },
  { id: 'ig4', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop', likes: 185, link: '#' },
  { id: 'ig5', image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=300&auto=format&fit=crop', likes: 254, link: '#' },
  { id: 'ig6', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&auto=format&fit=crop', likes: 198, link: '#' }
];

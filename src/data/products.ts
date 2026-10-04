export const categories = [
  'Semua',
  'Sports',
  'Casual',
  'Dressmaker',
  'Hangers',
  'Racks',
] as const;
export type Category = (typeof categories)[number];
export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  material: string;
  finish: string;
  dimensions: { label: string; value: number }[];
};
export const products: Product[] = [
  {
    id: 'SP-01',
    name: 'The Sprinter',
    category: 'Sports',
    description: 'Pose lari untuk menampilkan gerak dan potongan activewear.',
    image: '/images/sports-sprint.svg',
    material: 'Fiberglass Reinforced',
    finish: 'Matte Noir',
    dimensions: [
      { label: 'Height', value: 185 },
      { label: 'Bust', value: 96 },
      { label: 'Waist', value: 76 },
      { label: 'Hips', value: 94 },
      { label: 'Shoulder', value: 46 },
    ],
  },
  {
    id: 'SP-02',
    name: 'The Balance',
    category: 'Sports',
    description: 'Siluet seimbang untuk koleksi yoga dan athleisure.',
    image: '/images/sports-gym.svg',
    material: 'Fiberglass Reinforced',
    finish: 'Gloss White',
    dimensions: [
      { label: 'Height', value: 178 },
      { label: 'Bust', value: 84 },
      { label: 'Waist', value: 64 },
      { label: 'Hips', value: 89 },
      { label: 'Shoulder', value: 39 },
    ],
  },
  {
    id: 'CS-01',
    name: 'The Muse',
    category: 'Casual',
    description: 'Postur tenang dengan proporsi untuk fashion boutique.',
    image: '/images/boutique-muse.svg',
    material: 'Fiberglass Reinforced',
    finish: 'Warm Sand',
    dimensions: [
      { label: 'Height', value: 180 },
      { label: 'Bust', value: 84 },
      { label: 'Waist', value: 62 },
      { label: 'Hips', value: 88 },
      { label: 'Shoulder', value: 38 },
    ],
  },
  {
    id: 'CS-02',
    name: 'The Essential',
    category: 'Casual',
    description: 'Bentuk tegak serbaguna untuk layering dan menswear.',
    image: '/images/boutique-essential.svg',
    material: 'Polyethylene',
    finish: 'Matte Noir',
    dimensions: [
      { label: 'Height', value: 186 },
      { label: 'Bust', value: 98 },
      { label: 'Waist', value: 80 },
      { label: 'Hips', value: 96 },
      { label: 'Shoulder', value: 47 },
    ],
  },
  {
    id: 'DR-01',
    name: 'The Atelier',
    category: 'Dressmaker',
    description: 'Torso berlapis linen untuk draping dan presentasi busana.',
    image: '/images/dressmaker-couture.svg',
    material: 'High-Density Foam Pinstickable',
    finish: 'Raw Linen',
    dimensions: [
      { label: 'Height torso', value: 76 },
      { label: 'Bust', value: 86 },
      { label: 'Waist', value: 66 },
      { label: 'Hips', value: 92 },
      { label: 'Shoulder', value: 38 },
    ],
  },
  {
    id: 'DR-02',
    name: 'The Sartorial',
    category: 'Dressmaker',
    description: 'Torso menswear untuk pengembangan pola dan fitting visual.',
    image: '/images/dressmaker-sartorial.svg',
    material: 'High-Density Foam Pinstickable',
    finish: 'Raw Linen',
    dimensions: [
      { label: 'Height torso', value: 80 },
      { label: 'Bust', value: 98 },
      { label: 'Waist', value: 82 },
      { label: 'Hips', value: 98 },
      { label: 'Shoulder', value: 46 },
    ],
  },
  {
    id: 'HG-01',
    name: 'The Curve',
    category: 'Hangers',
    description: 'Gantungan bahu lebar untuk koleksi dengan struktur.',
    image: '/images/hanger.svg',
    material: 'Solid Wood',
    finish: 'Natural Wood',
    dimensions: [
      { label: 'Width', value: 44 },
      { label: 'Height', value: 24 },
      { label: 'Thickness', value: 3 },
    ],
  },
  {
    id: 'RK-01',
    name: 'The Rail',
    category: 'Racks',
    description: 'Rak display berdiri untuk ritme ruang retail yang bersih.',
    image: '/images/rack.svg',
    material: 'Powder-Coated Steel',
    finish: 'Matte Noir',
    dimensions: [
      { label: 'Height', value: 160 },
      { label: 'Width', value: 120 },
      { label: 'Depth', value: 45 },
    ],
  },
];
export const finishes = [
  'Matte Noir',
  'Gloss White',
  'Warm Sand',
  'Raw Linen',
  'Brushed Gold',
  'Natural Wood',
];

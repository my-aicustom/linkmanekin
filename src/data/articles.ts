export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export const articles: Article[] = [
  {
    slug: 'cara-memilih-manekin-untuk-toko-fashion',
    category: 'Retail Display',
    title: 'Cara memilih manekin untuk toko fashion tanpa salah proporsi',
    excerpt:
      'Panduan praktis memilih pose, proporsi, material, dan finishing berdasarkan jenis busana serta karakter ruang retail.',
    date: '5 Oktober 2026',
    readingTime: '6 menit',
    image: '/images/boutique-muse.svg',
    intro:
      'Manekin yang tepat tidak harus menjadi objek paling mencolok di toko. Tugas utamanya adalah membantu busana terbaca dengan cepat, menjaga proporsi, dan memperkuat karakter visual merchandising.',
    sections: [
      {
        heading: 'Mulai dari produk, bukan dari bentuk manekin',
        paragraphs: [
          'Activewear, tailoring, modest fashion, dan casual retail membutuhkan bahasa tubuh yang berbeda. Pose dinamis dapat menguatkan sportswear, sedangkan bentuk yang lebih tenang memberi ruang pada tailoring dan koleksi formal.',
          'Karena itu, tentukan lebih dulu jenis busana yang paling sering dipajang, ukuran sampel yang digunakan, dan jarak pandang utama pelanggan sebelum memilih model manekin.',
        ],
      },
      {
        heading: 'Periksa proporsi yang benar-benar berpengaruh',
        paragraphs: [
          'Tinggi total bukan satu-satunya ukuran penting. Lingkar dada, pinggang, pinggul, lebar bahu, serta konstruksi kaki dan base akan memengaruhi bagaimana pakaian jatuh pada manekin.',
        ],
        bullets: [
          'Bandingkan ukuran manekin dengan size sample yang paling sering dipakai.',
          'Pastikan bahu tidak membuat blazer, kemeja, atau dress tertarik berlebihan.',
          'Pertimbangkan luas base terhadap ukuran podium atau area window display.',
        ],
      },
      {
        heading: 'Finishing harus mendukung pencahayaan toko',
        paragraphs: [
          'Matte cenderung tenang dan tidak banyak memantulkan lampu, sementara gloss lebih ekspresif tetapi dapat menghasilkan highlight yang kuat. Linen memberi nuansa atelier dan biasanya lebih cocok pada torso dressmaker atau konsep tertentu.',
          'Bila memungkinkan, cocokkan finishing dengan temperatur pencahayaan, warna interior, dan material fixture di toko—bukan sekadar dengan warna logo.',
        ],
      },
    ],
  },
  {
    slug: 'manekin-sports-untuk-activewear',
    category: 'Sports Mannequin',
    title: 'Memilih pose manekin sports untuk activewear dan athleisure',
    excerpt:
      'Kapan memakai pose sprint, balance, atau stance yang lebih netral untuk membuat sportswear terlihat meyakinkan.',
    date: '5 Oktober 2026',
    readingTime: '5 menit',
    image: '/images/sports-wide.svg',
    intro:
      'Pada kategori sportswear, pose adalah bagian dari storytelling produk. Gerak yang salah dapat membuat busana terlihat kaku; pose yang tepat membantu pelanggan langsung membaca fungsi koleksi.',
    sections: [
      {
        heading: 'Sprint untuk energi dan performa',
        paragraphs: [
          'Pose sprint cocok untuk running apparel, performance footwear, atau campaign yang memang ingin menonjolkan kecepatan. Pastikan area display cukup lebar karena gestur lengan dan kaki biasanya membutuhkan footprint lebih besar.',
        ],
      },
      {
        heading: 'Balance untuk yoga dan athleisure',
        paragraphs: [
          'Pose balance memberi siluet yang lebih terkendali dan dapat bekerja baik untuk yoga, training ringan, atau athleisure. Fokus utamanya bukan kecepatan, melainkan kontrol tubuh dan bentuk garment.',
        ],
      },
      {
        heading: 'Jangan mengorbankan kemudahan dressing',
        paragraphs: [
          'Pose yang dramatis tetap perlu praktis untuk tim visual merchandising. Periksa sistem sambungan, posisi tangan, bukaan kaki, stabilitas base, serta apakah garment dapat dipasang dan dilepas tanpa risiko merusak produk.',
        ],
      },
    ],
  },
  {
    slug: 'dressmaker-mannequin-untuk-atelier',
    category: 'Atelier',
    title: 'Dressmaker mannequin: apa yang perlu diperiksa sebelum membeli',
    excerpt:
      'Tidak semua torso dressmaker bekerja sama. Kenali permukaan, proporsi, sistem stand, dan kebutuhan fitting Anda.',
    date: '5 Oktober 2026',
    readingTime: '5 menit',
    image: '/images/dressmaker-couture.svg',
    intro:
      'Dressmaker mannequin adalah alat kerja, bukan hanya display. Pemilihan torso yang tepat membantu proses draping, fitting visual, penyusunan proporsi, dan presentasi hasil jahit.',
    sections: [
      {
        heading: 'Tentukan apakah kebutuhan utama Anda fitting atau display',
        paragraphs: [
          'Untuk studio jahit, kemampuan menerima jarum, konsistensi permukaan, dan proporsi torso lebih penting daripada finishing dekoratif. Untuk butik, kebutuhan visual dapat menjadi lebih dominan.',
        ],
      },
      {
        heading: 'Perhatikan stand dan stabilitas',
        paragraphs: [
          'Stand harus cukup stabil saat kain ditarik atau disematkan. Selain tampilan, periksa sambungan, tinggi kerja, dan apakah base sesuai dengan ritme kerja di atelier.',
        ],
      },
      {
        heading: 'Gunakan ukuran sebagai referensi yang dapat diverifikasi',
        paragraphs: [
          'Cocokkan dada, pinggang, dan pinggul dengan kebutuhan pattern atau size sample Anda. Jika sebuah proyek menuntut ukuran khusus, diskusikan kemungkinan custom sebelum memesan beberapa unit sekaligus.',
        ],
      },
    ],
  },
  {
    slug: 'finishing-manekin-matte-gloss-linen',
    category: 'Material & Finish',
    title: 'Matte, gloss, atau linen: memilih finishing manekin untuk ruang retail',
    excerpt:
      'Cara membaca efek cahaya dan karakter material sebelum menentukan finishing manekin dan base.',
    date: '5 Oktober 2026',
    readingTime: '4 menit',
    image: '/images/boutique-essential.svg',
    intro:
      'Finishing memengaruhi bagaimana manekin berinteraksi dengan cahaya, pakaian, dan elemen interior di sekitarnya. Pilihan terbaik bukan selalu yang paling mencolok.',
    sections: [
      {
        heading: 'Matte untuk visual yang lebih tenang',
        paragraphs: [
          'Permukaan matte membantu mengurangi pantulan dan biasanya lebih mudah dipadukan dengan berbagai koleksi. Ia cocok ketika garment harus menjadi pusat perhatian.',
        ],
      },
      {
        heading: 'Gloss untuk statement yang lebih kuat',
        paragraphs: [
          'Gloss menghasilkan refleksi lebih jelas dan dapat bekerja baik pada konsep retail yang bersih atau futuristik. Namun posisi lampu perlu diperhitungkan agar highlight tidak mengganggu tampilan produk.',
        ],
      },
      {
        heading: 'Linen untuk atmosfer atelier',
        paragraphs: [
          'Linen memberi tekstur visual dan asosiasi yang kuat dengan proses tailoring. Karakternya cocok untuk dressmaker forms, studio desain, atau area display yang ingin terasa lebih tactile.',
        ],
      },
    ],
  },
];

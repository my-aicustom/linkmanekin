/** Build a quote without trusting browser input or sending a message. */
export function buildQuote({ business, city, notes = '', items }, catalog) {
  if (!business.trim() || !city.trim())
    throw new Error('Isi nama bisnis dan kota tujuan.');
  if (!items.length) throw new Error('Tambahkan sedikitnya satu produk.');
  const lines = items.map((item) => {
    const product = catalog.find((entry) => entry.id === item.id);
    const quantity = Number(item.quantity);
    if (!product) throw new Error('Produk tidak ditemukan.');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 9999)
      throw new Error('Jumlah harus 1–9999 unit.');
    if (!item.finish || !item.finish.trim())
      throw new Error('Pilih finishing.');
    return `• ${product.id} — ${product.name}\n  ${quantity} unit · ${item.finish}`;
  });
  return [
    'Halo Link Manekin, saya ingin meminta penawaran.',
    '',
    `Bisnis: ${business.trim()}`,
    `Kota pengiriman: ${city.trim()}`,
    '',
    ...lines,
    '',
    notes.trim() ? `Catatan: ${notes.trim()}` : '',
    'Mohon informasi harga, ketersediaan, dimensi final, minimum order, dan estimasi pengiriman.',
  ]
    .filter((line) => line !== '')
    .join('\n');
}
export function whatsappUrl(message, phone = '') {
  const digits = phone.trim();
  if (digits && !/^[1-9]\d{7,14}$/.test(digits))
    throw new Error(
      'Nomor WhatsApp harus menggunakan kode negara dan 8–15 digit.',
    );
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

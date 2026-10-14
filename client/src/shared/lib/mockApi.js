// Data dummy sementara pengganti backend — disimpan di memori, reset saat reload.
// Bentuk fungsi dibuat async supaya nanti tinggal diganti ke fetch ke server.

const services = [
  { id: 1, nama_layanan: 'Full Body Massage', durasi_menit: 60, harga: 120000 },
  { id: 2, nama_layanan: 'Foot Reflexology', durasi_menit: 45, harga: 85000 },
  { id: 3, nama_layanan: 'Aromatherapy', durasi_menit: 90, harga: 165000 },
];

function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

let nextId = 6;
let bookings = [
  { id: 1, customer_name: 'Sarah Wijaya', customer_phone: '081234567890', service_id: 1, tanggal: dateOffset(0), jam_mulai: '13:00:00', jam_selesai: '14:00:00', status: 'confirmed', alamat: 'Jl. Kemang Raya No. 10, Jakarta Selatan', link_gmaps: null, catatan: null, source: 'web_form' },
  { id: 2, customer_name: 'Budi Santoso', customer_phone: '081298765432', service_id: 2, tanggal: dateOffset(1), jam_mulai: '10:00:00', jam_selesai: '10:45:00', status: 'pending', alamat: 'Jl. Sudirman No. 5, Jakarta Pusat', link_gmaps: null, catatan: null, source: 'web_form' },
  { id: 3, customer_name: 'Rina Kartika', customer_phone: '081311122233', service_id: 3, tanggal: dateOffset(2), jam_mulai: '15:00:00', jam_selesai: '16:30:00', status: 'pending', alamat: 'Jl. Gatot Subroto No. 21, Jakarta', link_gmaps: null, catatan: 'Alergi minyak lavender', source: 'web_form' },
  { id: 4, customer_name: 'Andi Pratama', customer_phone: '081355566677', service_id: 1, tanggal: dateOffset(-1), jam_mulai: '17:00:00', jam_selesai: '18:00:00', status: 'done', alamat: 'Jl. Panglima Polim No. 3, Jakarta', link_gmaps: null, catatan: null, source: 'manual_admin' },
  { id: 5, customer_name: 'Maya Lestari', customer_phone: '081377788899', service_id: 2, tanggal: dateOffset(3), jam_mulai: '11:00:00', jam_selesai: '11:45:00', status: 'rescheduled', alamat: 'Jl. Fatmawati No. 8, Jakarta', link_gmaps: null, catatan: null, source: 'web_form' },
];

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

function withService(b) {
  return { ...b, services: services.find((s) => s.id === b.service_id) || null };
}

export async function getServices() {
  await delay();
  return [...services];
}

export async function getBookings({ statuses } = {}) {
  await delay();
  return bookings
    .filter((b) => !statuses || statuses.includes(b.status))
    .map(withService)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export async function createBooking(payload) {
  await delay();
  const booking = { id: nextId++, ...payload };
  bookings.push(booking);
  return booking;
}

export async function updateBooking(id, changes) {
  await delay();
  bookings = bookings.map((b) => (b.id === id ? { ...b, ...changes } : b));
}

// Bentrok jika ada booking aktif di tanggal sama yang jamnya beririsan.
export async function checkConflict({ tanggal, jamMulai, jamSelesai, excludeId = null }) {
  await delay(50);
  return bookings.some(
    (b) =>
      b.id !== excludeId &&
      b.tanggal === tanggal &&
      ['pending', 'confirmed', 'rescheduled'].includes(b.status) &&
      b.jam_mulai < jamSelesai &&
      jamMulai < b.jam_selesai
  );
}

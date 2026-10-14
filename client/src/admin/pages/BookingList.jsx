import { useState, useEffect } from 'react';
import { getBookings, getServices, updateBooking, checkConflict } from '../../shared/lib/mockApi';
import BookingModal from './BookingModal';
import styles from './BookingList.module.css';

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'rejected', 'rescheduled', 'done', 'cancelled'];
const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#22c55e',
  rejected: '#ef4444',
  rescheduled: '#3b82f6',
  done: '#6b7280',
  cancelled: '#9ca3af',
};

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  async function fetchServices() {
    setServices(await getServices());
  }

  async function fetchBookings() {
    setLoading(true);
    setBookings(await getBookings());
    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    if (newStatus === 'confirmed') {
      const booking = bookings.find((b) => b.id === id);
      const conflict = await checkConflict({
        tanggal: booking.tanggal,
        jamMulai: booking.jam_mulai,
        jamSelesai: booking.jam_selesai,
        excludeId: id,
      });
      if (conflict) {
        alert('Tidak bisa confirm — jadwal bentrok dengan booking lain!');
        return;
      }
    }

    await updateBooking(id, { status: newStatus });
    fetchBookings();
  }

  function openEdit(booking) {
    setEditBooking(booking);
    setModalOpen(true);
  }

  function openNew() {
    setEditBooking(null);
    setModalOpen(true);
  }

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.customer_name.toLowerCase().includes(q) ||
        b.customer_phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Daftar Booking</h1>
        <button className={styles.addBtn} onClick={openNew}>
          + Tambah Booking
        </button>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          className={styles.search}
          placeholder="Cari nama atau no. HP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.tabs}>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              className={`${styles.tab} ${statusFilter === s ? styles.tabActive : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className={styles.empty}>Memuat data...</p>
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>Tidak ada booking ditemukan.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pelanggan</th>
                <th>Layanan</th>
                <th>Tanggal</th>
                <th>Jam</th>
                <th>Status</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className={styles.customer}>{b.customer_name}</div>
                    <div className={styles.phone}>{b.customer_phone}</div>
                  </td>
                  <td>{b.services?.nama_layanan || '-'}</td>
                  <td>{b.tanggal}</td>
                  <td>{b.jam_mulai?.slice(0, 5)} - {b.jam_selesai?.slice(0, 5)}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{ background: STATUS_COLORS[b.status] + '20', color: STATUS_COLORS[b.status] }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.address}>{b.alamat || '-'}</div>
                    {b.link_gmaps && (
                      <a href={b.link_gmaps} target="_blank" rel="noopener noreferrer" className={styles.mapsLink}>
                        Lihat Maps
                      </a>
                    )}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      {b.status === 'pending' && (
                        <>
                          <button className={styles.confirmBtn} onClick={() => updateStatus(b.id, 'confirmed')}>Confirm</button>
                          <button className={styles.rejectBtn} onClick={() => updateStatus(b.id, 'rejected')}>Reject</button>
                        </>
                      )}
                      {b.status === 'confirmed' && (
                        <button className={styles.doneBtn} onClick={() => updateStatus(b.id, 'done')}>Selesai</button>
                      )}
                      <button className={styles.editBtn} onClick={() => openEdit(b)}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <BookingModal
          booking={editBooking}
          services={services}
          onClose={() => setModalOpen(false)}
          onSaved={fetchBookings}
        />
      )}
    </div>
  );
}

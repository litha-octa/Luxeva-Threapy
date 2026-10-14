import { useState, useEffect } from 'react';
import { checkConflict as checkBookingConflict, createBooking, updateBooking } from '../../shared/lib/mockApi';
import styles from './BookingModal.module.css';

function addMinutes(timeStr, minutes) {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

export default function BookingModal({ booking, services, onClose, onSaved }) {
  const isEdit = !!booking;

  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    service_id: services[0]?.id || '',
    tanggal: '',
    jam_mulai: '10:00',
    alamat: '',
    link_gmaps: '',
    catatan: '',
    status: 'pending',
  });
  const [conflict, setConflict] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking) {
      setForm({
        customer_name: booking.customer_name,
        customer_phone: booking.customer_phone,
        service_id: booking.service_id,
        tanggal: booking.tanggal,
        jam_mulai: booking.jam_mulai?.slice(0, 5),
        alamat: booking.alamat || '',
        link_gmaps: booking.link_gmaps || '',
        catatan: booking.catatan || '',
        status: booking.status,
      });
    }
  }, [booking]);

  const selectedService = services.find((s) => s.id === Number(form.service_id));
  const durasi = selectedService?.durasi_menit || 60;
  const jamSelesai = addMinutes(form.jam_mulai, durasi);

  useEffect(() => {
    if (!form.tanggal || !form.jam_mulai) {
      setConflict(false);
      return;
    }
    checkConflict();
  }, [form.tanggal, form.jam_mulai, form.service_id]);

  async function checkConflict() {
    const conflict = await checkBookingConflict({
      tanggal: form.tanggal,
      jamMulai: form.jam_mulai + ':00',
      jamSelesai: jamSelesai + ':00',
      excludeId: booking?.id || null,
    });
    setConflict(conflict);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      service_id: Number(form.service_id),
      tanggal: form.tanggal,
      jam_mulai: form.jam_mulai + ':00',
      jam_selesai: jamSelesai + ':00',
      alamat: form.alamat || null,
      link_gmaps: form.link_gmaps || null,
      catatan: form.catatan || null,
      status: form.status,
      source: isEdit ? booking.source : 'manual_admin',
    };

    if (isEdit) {
      await updateBooking(booking.id, payload);
    } else {
      await createBooking(payload);
    }

    onSaved();
    onClose();
  }

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{isEdit ? 'Edit Booking' : 'Tambah Booking Manual'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          {conflict && (
            <div className={styles.warning}>
              Jadwal bentrok dengan booking lain!
            </div>
          )}

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nama Pelanggan</label>
              <input type="text" value={form.customer_name} onChange={update('customer_name')} required />
            </div>
            <div className={styles.field}>
              <label>No. WhatsApp</label>
              <input type="tel" value={form.customer_phone} onChange={update('customer_phone')} required />
            </div>
            <div className={styles.field}>
              <label>Layanan</label>
              <select value={form.service_id} onChange={update('service_id')}>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nama_layanan} — {s.durasi_menit} menit
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Tanggal</label>
              <input type="date" value={form.tanggal} onChange={update('tanggal')} required />
            </div>
            <div className={styles.field}>
              <label>Jam Mulai</label>
              <input type="time" value={form.jam_mulai} onChange={update('jam_mulai')} min="10:00" max="20:00" required />
            </div>
            <div className={styles.field}>
              <label>Jam Selesai (otomatis)</label>
              <input type="time" value={jamSelesai} disabled />
            </div>

            {isEdit && (
              <div className={styles.field}>
                <label>Status</label>
                <select value={form.status} onChange={update('status')}>
                  {['pending', 'confirmed', 'rejected', 'rescheduled', 'done', 'cancelled'].map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.field}>
              <label>Alamat</label>
              <input type="text" value={form.alamat} onChange={update('alamat')} placeholder="Jl. Example No. 12, Jakarta..." />
            </div>
            <div className={styles.field}>
              <label>Link Google Maps</label>
              <input type="url" value={form.link_gmaps} onChange={update('link_gmaps')} placeholder="https://maps.google.com/..." />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>Catatan</label>
              <textarea value={form.catatan} onChange={update('catatan')} rows={3} />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Batal</button>
            <button type="submit" className={styles.saveBtn} disabled={saving || conflict}>
              {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

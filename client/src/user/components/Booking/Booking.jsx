import { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import TimeSlots from './TimeSlots';
import SectionHeader from '../../../shared/components/common/SectionHeader';
import FormField from '../../../shared/components/common/FormField';
import useReveal from '../../../shared/hooks/useReveal';
import { checkConflict, createBooking } from '../../../shared/lib/mockApi';
import { timeSlots } from '../../constants/data';

const SERVICE_MAP = {
  'Full Body Massage — Rp 120K': 1,
  'Foot Reflexology — Rp 85K': 2,
  'Aromatherapy — Rp 165K': 3,
};

const SERVICE_DURATION = { 1: 60, 2: 45, 3: 90 };

const serviceOptions = Object.keys(SERVICE_MAP);

function addMinutes(timeSlot, minutes) {
  const h = parseInt(timeSlot);
  const total = h * 60 + minutes;
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

export default function Booking() {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: serviceOptions[0],
    date: '',
    time: '12.00',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [conflict, setConflict] = useState(false);

  const wrapReveal = useReveal('zoom', 100);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const isToday = formData.date === today;
  const currentHour = new Date().getHours();
  const disabledSlots = isToday
    ? timeSlots.filter((slot) => parseInt(slot) <= currentHour)
    : [];

  useEffect(() => {
    if (disabledSlots.includes(formData.time)) {
      const firstAvailable = timeSlots.find((slot) => !disabledSlots.includes(slot));
      setFormData((prev) => ({ ...prev, time: firstAvailable || '' }));
    }
  }, [formData.date]);

  // Real-time conflict check
  useEffect(() => {
    if (!formData.date || !formData.time) {
      setConflict(false);
      return;
    }

    const serviceId = SERVICE_MAP[formData.service];
    const durasi = SERVICE_DURATION[serviceId] || 60;
    const jamMulai = formData.time.replace('.', ':') + ':00';
    const jamSelesai = addMinutes(formData.time, durasi) + ':00';

    checkConflict({ tanggal: formData.date, jamMulai, jamSelesai }).then(setConflict);
  }, [formData.date, formData.time, formData.service]);

  const isFormComplete =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.date &&
    formData.time &&
    formData.address.trim() &&
    !conflict;

  async function handleBook() {
    setSubmitting(true);

    const serviceId = SERVICE_MAP[formData.service];
    const durasi = SERVICE_DURATION[serviceId] || 60;
    const jamMulai = formData.time.replace('.', ':') + ':00';
    const jamSelesai = addMinutes(formData.time, durasi) + ':00';

    await createBooking({
      customer_name: formData.name,
      customer_phone: formData.phone,
      service_id: serviceId,
      tanggal: formData.date,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      status: 'pending',
      alamat: formData.address,
      source: 'web_form',
    });

    // Redirect to WhatsApp
    const msg = encodeURIComponent(
      `Hello Luxeva Therapy! My name is ${formData.name} and I'd like to book:\n- Service: ${formData.service}\n- Date: ${formData.date}\n- Time: ${formData.time}\n- Address: ${formData.address}\n\nPlease confirm. Thank you!`
    );
    window.open(`https://wa.me/6283811410725?text=${msg}`, '_blank');
    setSubmitting(false);
  }

  return (
    <section className={styles.section} id="booking">
      <SectionHeader tag="Reservation" title="Book Now" />
      <div className={styles.wrap} {...wrapReveal}>
        <div className={styles.grid}>
          <FormField label="Full Name">
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={update('name')}
            />
          </FormField>
          <FormField label="WhatsApp Number">
            <input
              type="tel"
              className={styles.input}
              placeholder="08xx-xxxx-xxxx"
              value={formData.phone}
              onChange={update('phone')}
            />
          </FormField>
          <FormField label="Service">
            <select
              className={styles.input}
              value={formData.service}
              onChange={update('service')}
            >
              {serviceOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Date">
            <input
              type="date"
              className={styles.input}
              min={today}
              value={formData.date}
              onChange={update('date')}
            />
          </FormField>
          <FormField label="Select Time" full>
            <TimeSlots
              slots={timeSlots}
              activeSlot={formData.time}
              disabledSlots={disabledSlots}
              onSelect={(t) => setFormData((prev) => ({ ...prev, time: t }))}
            />
            {conflict && (
              <p className={styles.conflict}>
                Slot ini sudah terisi, silakan pilih jam lain.
              </p>
            )}
          </FormField>
          <FormField label="Full Address" full>
            <input
              type="text"
              className={styles.input}
              placeholder="Jl. Example No. 12, South Jakarta..."
              value={formData.address}
              onChange={update('address')}
            />
          </FormField>
        </div>
        <button
          className={styles.submit}
          onClick={handleBook}
          disabled={!isFormComplete || submitting}
        >
          {submitting ? 'Processing...' : 'Confirm Booking via WhatsApp \u2192'}
        </button>
      </div>
    </section>
  );
}

import { useState } from 'react';
import styles from './Booking.module.css';
import TimeSlots from './TimeSlots';
import SectionHeader from '../common/SectionHeader';
import FormField from '../common/FormField';
import useReveal from '../../hooks/useReveal';
import { serviceOptions, timeSlots } from '../../constants/data';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: serviceOptions[0],
    date: '',
    time: '12.00',
    address: '',
  });

  const wrapReveal = useReveal('zoom', 100);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  function handleBook() {
    const msg = encodeURIComponent(
      `Hello Luxeva Therapy! My name is ${formData.name || 'Guest'} and I'd like to book:\n- Service: ${formData.service}\n- Time: ${formData.time}\n\nPlease confirm. Thank you!`
    );
    window.open(`https://wa.me/6283811410725?text=${msg}`, '_blank');
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
              value={formData.date}
              onChange={update('date')}
            />
          </FormField>
          <FormField label="Select Time" full>
            <TimeSlots
              slots={timeSlots}
              activeSlot={formData.time}
              onSelect={(t) => setFormData((prev) => ({ ...prev, time: t }))}
            />
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
        <button className={styles.submit} onClick={handleBook}>
          Confirm Booking via WhatsApp &rarr;
        </button>
      </div>
    </section>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import id from 'date-fns/locale/id';
import { getBookings, getServices } from '../../shared/lib/mockApi';
import BookingModal from './BookingModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarView.module.css';

const locales = { id };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#22c55e',
  rejected: '#ef4444',
  rescheduled: '#3b82f6',
  done: '#6b7280',
  cancelled: '#9ca3af',
};

export default function CalendarView() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  async function fetchBookings() {
    setBookings(await getBookings({ statuses: ['pending', 'confirmed', 'rescheduled'] }));
  }

  async function fetchServices() {
    setServices(await getServices());
  }

  const events = useMemo(
    () =>
      bookings.map((b) => ({
        id: b.id,
        title: `${b.customer_name} — ${b.services?.nama_layanan || 'Layanan'}`,
        start: new Date(`${b.tanggal}T${b.jam_mulai}`),
        end: new Date(`${b.tanggal}T${b.jam_selesai}`),
        resource: b,
      })),
    [bookings]
  );

  function eventStyleGetter(event) {
    const color = STATUS_COLORS[event.resource.status] || '#6b7280';
    return {
      style: {
        backgroundColor: color + '20',
        color,
        border: `1px solid ${color}`,
        borderRadius: '8px',
        fontSize: '0.78rem',
        fontWeight: 500,
      },
    };
  }

  function handleSelectEvent(event) {
    setSelected(event.resource);
    setModalOpen(true);
  }

  return (
    <div>
      <h1 className={styles.title}>Kalender Booking</h1>

      <div className={styles.legend}>
        {Object.entries(STATUS_COLORS)
          .filter(([s]) => ['pending', 'confirmed', 'rescheduled'].includes(s))
          .map(([status, color]) => (
            <span key={status} className={styles.legendItem}>
              <span className={styles.dot} style={{ background: color }} />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          ))}
      </div>

      <div className={styles.calendarWrap}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['week', 'day', 'month']}
          min={new Date(2024, 0, 1, 10, 0)}
          max={new Date(2024, 0, 1, 21, 0)}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          style={{ height: 'calc(100vh - 180px)' }}
        />
      </div>

      {modalOpen && selected && (
        <BookingModal
          booking={selected}
          services={services}
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          onSaved={fetchBookings}
        />
      )}
    </div>
  );
}

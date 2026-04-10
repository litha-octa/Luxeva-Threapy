import styles from './TimeSlots.module.css';

export default function TimeSlots({ slots, activeSlot, onSelect }) {
  return (
    <div className={styles.slots}>
      {slots.map((slot) => (
        <div
          key={slot}
          className={`${styles.slot} ${slot === activeSlot ? styles.active : ''}`}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </div>
      ))}
    </div>
  );
}

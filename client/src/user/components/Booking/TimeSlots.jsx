import styles from './TimeSlots.module.css';

export default function TimeSlots({ slots, activeSlot, disabledSlots = [], onSelect }) {
  return (
    <div className={styles.slots}>
      {slots.map((slot) => {
        const isDisabled = disabledSlots.includes(slot);
        return (
          <div
            key={slot}
            className={`${styles.slot} ${slot === activeSlot && !isDisabled ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
            onClick={() => !isDisabled && onSelect(slot)}
          >
            {slot}
          </div>
        );
      })}
    </div>
  );
}

import { useState } from 'react';
import styles from './HeroCard.module.css';
import ServiceOption from './ServiceOption';
import { heroServices, therapistAvatars } from '../../constants/data';
import { scrollToBooking } from '../../utils';

export default function HeroCard() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className={styles.card}>
      <div className={styles.label}>Choose your treatment</div>
      {heroServices.map((svc) => (
        <ServiceOption
          key={svc.id}
          service={svc}
          isActive={svc.id === activeId}
          onClick={() => setActiveId(svc.id)}
        />
      ))}
      <div className={styles.divider} />
      <div className={styles.therapistRow}>
        <div className={styles.avatars}>
          {therapistAvatars.map((a) => (
            <div key={a.initials} className={styles.av} style={{ background: a.color }}>
              {a.initials}
            </div>
          ))}
        </div>
        <div className={styles.therapistInfo}>
          <strong>10 therapists available</strong>
          Nearest 2.4 km from you
        </div>
      </div>
      <button className={styles.bookBtn} onClick={scrollToBooking}>
        Continue Booking &rarr;
      </button>
    </div>
  );
}

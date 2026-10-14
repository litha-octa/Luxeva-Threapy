import styles from './TestimonialCard.module.css';
import useReveal from '../../../shared/hooks/useReveal';

export default function TestimonialCard({ stars, text, initials, name, location, delay }) {
  const reveal = useReveal('', delay);

  return (
    <div className={styles.card} {...reveal}>
      <div className={styles.stars}>{'★'.repeat(stars)}</div>
      <p className={styles.text}>{text}</p>
      <div className={styles.author}>
        <div className={styles.av}>{initials}</div>
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.loc}>{location}</div>
        </div>
      </div>
    </div>
  );
}

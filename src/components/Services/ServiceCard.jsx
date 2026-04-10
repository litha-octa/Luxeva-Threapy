import styles from './ServiceCard.module.css';
import useReveal from '../../hooks/useReveal';

export default function ServiceCard({ emoji, tag, name, desc, price, duration, featured, revealType, delay }) {
  const reveal = useReveal(revealType, delay);

  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`} {...reveal}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.tag}>{tag}</span>
      <div className={styles.name}>{name}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.bottom}>
        <div className={styles.price}>
          {price} <small>/ {duration}</small>
        </div>
      </div>
    </div>
  );
}

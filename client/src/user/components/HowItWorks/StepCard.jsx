import styles from './StepCard.module.css';
import useReveal from '../../../shared/hooks/useReveal';

export default function StepCard({ num, title, desc, delay }) {
  const reveal = useReveal('', delay);

  return (
    <div className={styles.card} {...reveal}>
      <div className={styles.num}>{num}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
}

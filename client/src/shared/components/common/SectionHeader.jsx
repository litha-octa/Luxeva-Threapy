import styles from './SectionHeader.module.css';
import useReveal from '../../hooks/useReveal';

export default function SectionHeader({ tag, title, dark }) {
  const reveal = useReveal();

  return (
    <div className={styles.header} {...reveal}>
      <span className={styles.tag}>{tag}</span>
      <h2 className={`${styles.title} ${dark ? styles.dark : ''}`}>{title}</h2>
    </div>
  );
}

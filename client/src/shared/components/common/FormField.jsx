import styles from './FormField.module.css';

export default function FormField({ label, full, children }) {
  return (
    <div className={`${styles.group} ${full ? styles.full : ''}`}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}

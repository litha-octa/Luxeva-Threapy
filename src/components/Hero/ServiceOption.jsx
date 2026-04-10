import styles from './ServiceOption.module.css';

export default function ServiceOption({ service, isActive, onClick }) {
  return (
    <div
      className={`${styles.service} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.icon}>{service.emoji}</div>
      <div className={styles.info}>
        <div className={styles.name}>{service.name}</div>
        <div className={styles.dur}>{service.duration}</div>
      </div>
      <div className={styles.price}>{service.price}</div>
    </div>
  );
}

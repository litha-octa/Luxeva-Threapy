import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Luxeva <span>Therapy</span></span>
      <p className={styles.tagline}>Where Luxury Meets Healing</p>
      <p>&copy; 2026 Luxeva Therapy — Premium Home Massage & Wellness Service</p>
      <p className={styles.cities}>Jakarta &middot; Tangerang &middot; Bekasi &middot; Depok &middot; Bogor</p>
    </footer>
  );
}

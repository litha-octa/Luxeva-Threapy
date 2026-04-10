import styles from './Navbar.module.css';
import { navLinks } from '../../constants/data';
import { scrollToBooking } from '../../utils';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        Luxeva <span>Therapy</span>
      </div>
      <ul className={styles.links}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        <li>
          <a href="#booking" className={styles.cta} onClick={(e) => { e.preventDefault(); scrollToBooking(); }}>
            Book Now
          </a>
        </li>
      </ul>
    </nav>
  );
}

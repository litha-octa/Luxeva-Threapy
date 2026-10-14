import styles from './Hero.module.css';
import HeroCard from './HeroCard';
import Button from '../../../shared/components/common/Button';
import useReveal from '../../../shared/hooks/useReveal';
import { heroStats } from '../../constants/data';
import { scrollToBooking } from '../../utils';

export default function Hero() {
  const badgeReveal = useReveal('', 0);
  const h1Reveal = useReveal('', 100);
  const descReveal = useReveal('', 200);
  const actionsReveal = useReveal('', 300);
  const statsReveal = useReveal('', 400);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.badge} {...badgeReveal}>Available 24/7 in Jakarta</div>
        <h1 className={styles.h1} {...h1Reveal}>
          Where <em>Luxury</em><br />Meets<br />Healing
        </h1>
        <p className={styles.desc} {...descReveal}>
          Certified professional therapists arrive at your doorstep within 60
          minutes. Massage, reflexology, and premium body treatments — without
          leaving home.
        </p>
        <div className={styles.actions} {...actionsReveal}>
          <Button onClick={scrollToBooking}>Book Now</Button>
          <Button variant="outline">View Packages</Button>
        </div>
        <div className={styles.stats} {...statsReveal}>
          {heroStats.map((s) => (
            <div key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.floatBadge}>
          <div className={styles.floatTop}>Book Today</div>
          <div className={styles.floatVal}>Rp 85K</div>
          <div className={styles.floatSub}>Starting from</div>
        </div>
        <HeroCard />
      </div>
    </section>
  );
}

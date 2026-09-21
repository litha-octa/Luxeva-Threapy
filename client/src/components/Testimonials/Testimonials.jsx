import styles from './Testimonials.module.css';
import TestimonialCard from './TestimonialCard';
import SectionHeader from '../common/SectionHeader';
import { testimonials } from '../../constants/data';

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <SectionHeader tag="Client Reviews" title="What Our Clients Say" />
      <div className={styles.grid}>
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} {...t} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}

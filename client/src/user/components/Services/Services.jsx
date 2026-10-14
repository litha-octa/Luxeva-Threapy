import styles from './Services.module.css';
import ServiceCard from './ServiceCard';
import SectionHeader from '../../../shared/components/common/SectionHeader';
import { services } from '../../constants/data';

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <SectionHeader tag="Our Services" title="Curated Packages" dark />
      <div className={styles.grid}>
        {services.map((svc, i) => (
          <ServiceCard key={svc.name} {...svc} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}

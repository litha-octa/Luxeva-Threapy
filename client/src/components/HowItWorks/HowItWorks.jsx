import styles from './HowItWorks.module.css';
import StepCard from './StepCard';
import SectionHeader from '../common/SectionHeader';
import { steps } from '../../constants/data';

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <SectionHeader tag="How It Works" title="Simple as 4 Steps" />
      <div className={styles.grid}>
        {steps.map((step, i) => (
          <StepCard key={step.num} {...step} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}

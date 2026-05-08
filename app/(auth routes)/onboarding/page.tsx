import Image from 'next/image';
import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';
import styles from './page.module.css';

export default function OnboardingPage() {
  return (
    <main className={styles.container}>
      <Image 
        src="/Plant.jpg" 
        alt="Plant Decoration" 
        width={200} 
        height={300}
        className={styles.plantImage}
        priority
      />

      <div className={styles.header}>
        <h2 className={styles.title}>  <span className={styles.titleLine}>Давайте</span>  <span className={styles.titleLine}>познайомимось ближче</span></h2>
      </div>

      <OnboardingForm />
    </main>
  );
};

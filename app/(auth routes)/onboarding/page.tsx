import Image from 'next/image';
import { OnboardingForm } from '@/components/OnboardingForm/OnboardingForm';
import styles from './page.module.css';

export default function OnboardingPage() {
  return (
    <main className={styles.container}>
      <Image 
        src="/Plant.jpg" 
        alt="Plant Decoration" 
        width={150} 
        height={150} 
        className={styles.plantImage}
        priority
      />

      <div className={styles.header}>
        <h1 className={styles.title}>Давайте знайомитись ближче</h1>
      </div>

      <OnboardingForm />
    </main>
  );
}
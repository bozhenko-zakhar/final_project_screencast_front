'use client';

import Image from 'next/image';
import styles from './PregnancyLoader.module.css';

interface PregnancyLoaderProps {
  imageUrl?: string; // babyWeek.image
}

const PregnancyLoader = ({ imageUrl }: PregnancyLoaderProps) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderCircle}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Малюк сьогодні"
            width={24}
            height={24}
            className={styles.loaderImage}
          />
        ) : (
          <span className={styles.loaderEmoji}>🥑</span>
        )}
      </div>
      <p className={styles.loaderText}>Завантажуємо завдання…</p>
    </div>
  );
};

export default PregnancyLoader;
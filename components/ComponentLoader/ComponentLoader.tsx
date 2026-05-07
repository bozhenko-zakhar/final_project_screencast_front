"use client";

import styles from "./ComponentLoader.module.css";

interface ComponentLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const ComponentLoader = ({ isLoading, children }: ComponentLoaderProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default ComponentLoader;

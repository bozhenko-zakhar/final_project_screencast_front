"use client";

import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import styles from "./GlobalLoader.module.css";

const GlobalLoader = () => {
  const { isLoading } = useGlobalLoading();

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default GlobalLoader;

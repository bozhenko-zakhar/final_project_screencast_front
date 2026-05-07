"use client";

import styles from "./FormError.module.css";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <div className={styles.error}>{message}</div>;
};

export default FormError;

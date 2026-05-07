import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.loader}>
          <span className={styles.emoji}>🤰</span>
          <span className={styles.ring}></span>
        </div>

        <p className={styles.text}>Завантажуємо...</p>
      </div>
    </div>
  );
};

export default Loading;
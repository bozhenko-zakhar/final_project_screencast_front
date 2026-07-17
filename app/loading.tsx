"use client"

import styles from './loading.module.css';

const Loading = () => {
	return (
		<div className={styles.overlay}>
			<div className={styles.spinner} />
		</div>
	)
};

export default Loading;
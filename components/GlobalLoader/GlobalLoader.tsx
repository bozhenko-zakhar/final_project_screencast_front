"use client";

import { useEffect, useState } from "react";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import styles from "./GlobalLoader.module.css";

const messages = [
	{
		delay: 2000,
		text: "🔄 Підключаємося до сервера...",
	},
	{
		delay: 8000,
		text: "⏳ Сервер ще запускається після простою. Це нормально і може зайняти до 30 секунд.",
	},
	{
		delay: 15000,
		text: "✨ Майже готово. Дякуємо за терпіння!",
	},
];

const GlobalLoader = () => {
	const { isLoading } = useGlobalLoading();
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!isLoading) return;

		const timers = messages.map(({ delay, text }) =>
			setTimeout(() => setMessage(text), delay)
		);

		return () => {
			timers.forEach(clearTimeout);
			setMessage("");
		};
	}, [isLoading]);


	if (!isLoading) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.spinner} />

			{message && (
				<p className={styles.message}>
					{message}
				</p>
			)}
		</div>
	);
};

export default GlobalLoader;
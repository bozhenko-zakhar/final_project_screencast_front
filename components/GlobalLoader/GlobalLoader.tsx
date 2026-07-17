"use client";

import { useEffect, useState } from "react";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import styles from "./GlobalLoader.module.css";
import { useLoadingStore } from "@/lib/store/loadingStore";

const messages = [
	{
		delay: 3000,
		text: "🔄 Підключаємося до сервера...",
	},
	{
		delay: 10000,
		text: "⏳ Сервер ще запускається після простою. Це нормально і може зайняти до 30 секунд.",
	},
	{
		delay: 17000,
		text: "✨ Майже готово. Дякуємо за терпіння!",
	},
];

const GlobalLoader = () => {
	const { isLoading } = useGlobalLoading();
	const isBlockingUi = useLoadingStore(state => state.isBlockingUi);
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
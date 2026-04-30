import css from "./page.module.css";

const LoginPage = () => {
	return (
		<section className={css.container}>
			<h1 className={css.title}>Увійти</h1>
			<p className={css.text}>Сторінка логіну.</p>
		</section>
	);
};

export default LoginPage;

'use client';

import Link from "next/link";
import css from "./Header.module.css"

interface Props {
	setBarActive: () => void;
}

const Header = ({ setBarActive }: Props) => {

	return (
		<>
			<header className={css.header}>
				<nav>
					<Link href="/">
						<svg className={css.logo}>
							<use href="/logo.svg#icon-alternate-false"></use>
						</svg>
					</Link>
				</nav>

				<button className={css.burger_button} onClick={setBarActive}>
					<svg className={css.burger_icon}>
						<use href="/sprite.svg#menu"></use>
					</svg>
				</button>
			</header>
		</>
	)
}

export default Header;
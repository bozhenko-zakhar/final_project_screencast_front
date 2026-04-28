'use client';

import { useState } from "react";
import Link from "next/link";
import SideBar from "../SideBar/SideBar";
import css from "./Header.module.css"

const Header = () => {
	const [isActiveBar, setActiveBar] = useState(true);

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

				<button className={css.burger_button} onClick={() => setActiveBar(true)}>
					<svg className={css.burger_icon}>
						<use href="/sprite.svg#menu"></use>
					</svg>
				</button>
			</header>

			{ isActiveBar ? <SideBar /> : null}
		</>
	)
}

export default Header;
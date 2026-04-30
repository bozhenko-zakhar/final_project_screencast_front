'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";

const titleMap: Record<string, string> = {
	auth: "Авторизація",
	login: "Увійти",
	register: "Зареєструватися",
	profile: "Профіль",
	edit: "Редагування",
	diary: "Щоденник",
	journey: "Подорож"
};

const Breadcrumbs = () => {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

	const crumbs = [
		{ href: "/", label: "Мій день" },
		...segments.map((segment, index) => ({
			href: `/${segments.slice(0, index + 1).join("/")}`,
			label: titleMap[segment] ?? segment
		}))
	];

	return (
		<nav aria-label="Breadcrumbs" className={css.nav}>
			<ul className={css.list}>
				{crumbs.map((crumb, index) => {
					const isLast = index === crumbs.length - 1;

					return (
						<li key={crumb.href} className={css.item}>
							{isLast ? (
								<span className={css.current}>{crumb.label}</span>
							) : (
								<Link className={css.link} href={crumb.href}>
									{crumb.label}
								</Link>
							)}
							{!isLast ? <span className={css.separator}>/</span> : null}
						</li>
					);
				})}
			</ul>
		</nav>
	)
}

export default Breadcrumbs;
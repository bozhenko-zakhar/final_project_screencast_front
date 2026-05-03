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
	journey: "Подорож",
	new: "Новий запис"
};

const Breadcrumbs = () => {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

	const formatSegmentLabel = (segment: string) => {
		if (titleMap[segment]) {
			return titleMap[segment];
		}

		// Hide raw ids/slugs in breadcrumbs and show a stable human label.
		const isIdLikeSegment = /^[a-f0-9-]{8,}$/i.test(segment) || /^\d+$/.test(segment);
		if (isIdLikeSegment) {
			return "Запис";
		}

		return decodeURIComponent(segment)
			.replace(/-/g, " ")
			.replace(/^\p{L}/u, (letter) => letter.toUpperCase());
	};

	const crumbs = [
		{ href: "/", label: "Мій день" },
		...segments.map((segment, index) => ({
			href: `/${segments.slice(0, index + 1).join("/")}`,
			label: formatSegmentLabel(segment)
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
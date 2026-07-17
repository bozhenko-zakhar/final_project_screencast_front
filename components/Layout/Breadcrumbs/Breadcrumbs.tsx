'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";

const titleMap: Record<string, string> = {
	my_day: "Мій день",
	profile: "Профіль",
	diary: "Щоденник",
	journey: "Подорож",
};

const Breadcrumbs = () => {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

	const formatSegmentLabel = (segment: string) => {
		if (titleMap[segment]) {
			return titleMap[segment];
		}

		return decodeURIComponent(segment)
			.replace(/-/g, " ")
			.replace(/^\p{L}/u, (letter) => letter.toUpperCase());
	};

	const crumbs = [{ href: "/", label: "Лелека" }];

	if (pathname === "/") {
		crumbs.push({ href: "/", label: "Мій день" });
	} else if (/^\/journey\/[^/]+$/.test(pathname)) {
		crumbs.push({ href: "/journey", label: "Подорож" });
	} else if (/^\/diary\/[^/]+$/.test(pathname)) {
		crumbs.push({ href: "/diary", label: "Щоденник" });
	} else {
		crumbs.push(
			...segments.map((segment, index) => ({
				href: `/${segments.slice(0, index + 1).join("/")}`,
				label: formatSegmentLabel(segment),
			}))
		);
	}

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
							{!isLast ? <span className={css.separator}>
								<svg className={css.chevron}>
									<use href="/sprite.svg#keyboard_arrow_right"></use>
								</svg>
							</span> : null}
						</li>
					);
				})}
			</ul>
		</nav>
	)
}

export default Breadcrumbs;
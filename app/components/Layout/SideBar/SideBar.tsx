'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthBar from "../AuthBar/AuthBar";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import UserBar from "../UserBar/UserBar";
import { useAuth } from "@/app/providers/AuthProvider";
import css from "./SideBar.module.css";

interface Props {
	setBarInactive: () => void;
	isOpen: boolean;
}

const SideBar = ({ setBarInactive, isOpen }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const { isAuthenticated, user, clearUser } = useAuth();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	

	const navItems = [
		{ href: "/", label: "Мій день" },
		{ href: "/journey", label: "Подорож" },
		{ href: "/diary", label: "Щоденник" },
		{ href: "/profile", label: "Профіль" }
	];

	const closeMenu = () => {
		setBarInactive();
	};

	const isNavItemActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}

		return pathname === href || pathname.startsWith(`${href}/`);
	};

	const handleLogout = async () => {
		setIsLoading(true);

		try {
			await fetch("/api/auth/logout", { method: "POST" });
			clearUser();
			setIsConfirmationOpen(false);
			router.push("/");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") {
				return;
			}

			if (isConfirmationOpen) {
				setIsConfirmationOpen(false);
				return;
			}

			if (isOpen) {
				setBarInactive();
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isConfirmationOpen, isOpen, setBarInactive]);

	return (
		<>
			{isOpen ? <div className={css.backdrop} onClick={closeMenu}></div> : null}
			<aside className={`${css.sidebar} ${isOpen ? css.open : ""}`}>
				<div className={css.top}>
					<Link href="/" className={css.logoLink} onClick={closeMenu}>
						<svg className={css.logo}>
							<use href="/logo.svg#icon-alternate-false"></use>
						</svg>
					</Link>
					<button className={css.close} onClick={closeMenu} aria-label="Close menu">
						×
					</button>
				</div>

				<nav className={css.nav}>
					<ul className={css.list}>
						{navItems.map((item) => {
							const targetHref = isAuthenticated ? item.href : "/auth/login";
							const isActive = isAuthenticated && isNavItemActive(item.href);

							return (
								<li key={item.href}>
									<Link
										className={`${css.link} ${isActive ? css.active : ""}`}
										href={targetHref}
										onClick={closeMenu}
										aria-current={isActive ? "page" : undefined}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className={css.bottom}>
					{isAuthenticated && user ? (
						<UserBar
							name={user.name}
							email={user.email}
							avatar={user.avatar}
							onLogout={() => setIsConfirmationOpen(true)}
							isLoading={isLoading}
						/>
					) : (
						<AuthBar />
					)}
				</div>
			</aside>

			<ConfirmationModal
				isOpen={isConfirmationOpen}
				onCancel={() => setIsConfirmationOpen(false)}
				onConfirm={handleLogout}
				isLoading={isLoading}
			/>
		</>
	)
}

export default SideBar;
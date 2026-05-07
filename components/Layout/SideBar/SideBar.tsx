'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthBar from "../AuthBar/AuthBar";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import UserBar from "../UserBar/UserBar";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SideBar.module.css";
import { getCurrentWeek } from "@/lib/services/getCurrentWeek";

interface Props {
	setBarInactive: () => void;
	isOpen: boolean;
}

const SideBar = ({ setBarInactive, isOpen }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const user = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.user);
	const isAuthenticated = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.isAuthenticated);
	const clearUser = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.clearUser);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [logoutError, setLogoutError] = useState<string | null>(null);
	//  const { user } = useAuthStore();

	const userCurrentWeek = getCurrentWeek(user);

	const navItems = [
		{ href: "/", label: "Мій день" },
		{ href: `/journey/${userCurrentWeek}`, label: "Подорож" },
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
		setLogoutError(null);

		try {
			const response = await fetch("/api/auth/logout", { method: "POST" });
			if (!response.ok) {
				throw new Error("Logout request failed");
			}

			clearUser();
			setIsConfirmationOpen(false);
			router.push("/");
		} catch {
			setLogoutError("Не вдалося вийти. Спробуйте ще раз.");
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
						<svg className={css.svg_close}>
							<use href="/sprite.svg#close"></use>
						</svg>
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
							avatar={user.avatar ?? user?.name?.slice(0, 2).toUpperCase()}
							onLogout={() => {
								setLogoutError(null);
								setIsConfirmationOpen(true);
							}}
							isLoading={isLoading}
						/>
					) : (
						<AuthBar />
					)}
				</div>
			</aside>

			<ConfirmationModal
				isOpen={isConfirmationOpen}
				onCancel={() => {
					setLogoutError(null);
					setIsConfirmationOpen(false);
				}}
				onConfirm={handleLogout}
				isLoading={isLoading}
				errorMessage={logoutError ?? undefined}
			/>
		</>
	)
}

export default SideBar;
"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import Header from "../components/Layout/Header/Header";
import { useAuthStore } from "@/lib/store/authStore";

import css from "./layout.module.css"
import SideBar from "../components/Layout/SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

export default function LehlehkaLayout({
	children
}: Props) {
	const router = useRouter();
	const isAuthenticated = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.isAuthenticated);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace("/auth/login");
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return (
			<div className={css.shell}>
				<div className={css.content}>
					<div className={css.container}>
						<p>Перенаправлення на сторінку входу...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={css.shell}>
			<SideBar isOpen={isMobileMenuOpen} setBarInactive={() => setIsMobileMenuOpen(false)} />
			<div className={css.content}>
				<div className={css.container}>
					<Header setBarActive={() => setIsMobileMenuOpen(true)} />
					<Breadcrumbs />
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
}
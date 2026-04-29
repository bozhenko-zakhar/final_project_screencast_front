"use client"

import { useState } from "react";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import Header from "../components/Layout/Header/Header";

import css from "./layout.module.css"
import SideBar from "../components/Layout/SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

export default function LehlehkaLayout({
	children
}: Props) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
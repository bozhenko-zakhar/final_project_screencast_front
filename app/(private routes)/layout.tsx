"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Breadcrumbs from "@/components/Layout/Breadcrumbs/Breadcrumbs";
import Header from "@/components/Layout/Header/Header";
import SideBar from "@/components/Layout/SideBar/SideBar";
import GlobalLoader from "@/components/GlobalLoader/GlobalLoader";

import css from "./layout.module.css"
type Props = {
  children: React.ReactNode;
}

export default function LehlehkaLayout({ children }: Props) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
  	<>
			<Toaster position="top-right" />
			<div className={css.shell}>
				<SideBar isOpen={isMobileMenuOpen} setBarInactive={() => setIsMobileMenuOpen(false)} />
				<div className={css.content}>
					<div className={css.container}>
						<Header setBarActive={() => setIsMobileMenuOpen(true)} />
						<Breadcrumbs />
						<main>
							{children}
          		<GlobalLoader />
						</main>
					</div>
				</div>
			</div>
	 	</>
  );
}
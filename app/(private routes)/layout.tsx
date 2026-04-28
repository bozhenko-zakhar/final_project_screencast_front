"use client"

import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import Header from "../components/Layout/Header/Header";

import css from "./layout.module.css"

type Props = {
  children: React.ReactNode;
};

export default function LehlehkaLayout({
	children
}: Props) {

	return (
		<div className={css.container}>
			<Header />
			{/* <SideBar /> */}
			<Breadcrumbs />
			{children}
		</div>
	);
}
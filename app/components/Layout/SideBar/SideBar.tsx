'use client';

import css from "./SideBar.module.css";

interface Props {
	setBarInactive: () => void;
	isOpen: boolean;
}

const SideBar = ({ setBarInactive, isOpen }: Props) => {
	return (
		<div className={`${css.sidebar} ${isOpen ? css.open : ''}`}>
			<button onClick={setBarInactive}>button</button>
		</div>
	)
}

export default SideBar;
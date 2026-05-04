import css from "./UserBar.module.css";

type UserBarProps = {
	name: string | undefined;
	email: string | undefined;
	avatar: string | undefined;
	onLogout: () => void;
	isLoading: boolean;
};

const UserBar = ({ name, email, avatar, onLogout, isLoading }: UserBarProps) => {
	return (
		<div className={css.container}>
			<div className={css.identity}>
				<div className={css.avatar}>{avatar}</div>
				<div>
					<p className={css.name}>{name}</p>
					<p className={css.email}>{email}</p>
				</div>
			</div>

			<button className={css.logoutButton} onClick={onLogout} disabled={isLoading}>
				{isLoading ? "Вихід..." : "Вихід"}
			</button>
		</div>
	);
};

export default UserBar;

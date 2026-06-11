import Link from "next/link";
import css from "./AuthBar.module.css";
import { Button } from "@/components/Button/Button";

const AuthBar = () => {
  return (
		<div className={css.container}>
			<Link className={css.registerLink} href="/auth/register">
				<Button>
					Зареєструватися
				</Button>
			</Link>
			<Link className={css.loginLink} href="/auth/login">
				<Button isNeutral={true}>
					Увійти
				</Button>
			</Link>
    </div>
  );
};

export default AuthBar;

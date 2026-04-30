import Link from "next/link";
import css from "./AuthBar.module.css";

const AuthBar = () => {
  return (
    <div className={css.container}>
      <Link className={css.registerLink} href="/auth/register">
        Зареєструватися
      </Link>
      <Link className={css.loginLink} href="/auth/login">
        Увійти
      </Link>
    </div>
  );
};

export default AuthBar;

import css from "./UserBar.module.css";
import Image from "next/image";

type UserBarProps = {
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  onLogout: () => void;
  isLoading: boolean;
};

const UserBar = ({
  name,
  email,
  avatar,
  onLogout,
  isLoading,
}: UserBarProps) => {
  return (
    <div className={css.container}>
      <div className={css.identity}>
        <Image
          className={css.avatar}
          src={avatar || "/Avatar-def.jpg"}
          alt={name || "User avatar"}
          width={40}
          height={40}
        />

        <div>
          <p className={css.name}>{name}</p>
          <p className={css.email}>{email}</p>
        </div>
      </div>

      <button
        className={css.logoutButton}
        onClick={onLogout}
        disabled={isLoading}
      >
        <svg className={css.logoutIcon}>
          <use href="/icons/sprite.svg#logout" />
        </svg>
      </button>
    </div>
  );
};

export default UserBar;

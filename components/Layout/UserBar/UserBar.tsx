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
  const imageSrc =
    avatar && (avatar.startsWith("/") || avatar.startsWith("http"))
      ? avatar
      : "/Avatar-def.jpg";

  return (
    <div className={css.container}>
      <div className={css.identity}>
        <div className={css.userInfo}>
          <Image
            className={css.avatar}
            src={imageSrc}
            alt={name || "User avatar"}
            width={40}
            height={40}
          />

          <div className={css.textBlock}>
            <p className={css.name}>{name}</p>
            <p className={css.email}>{email}</p>
          </div>
        </div>

        <button
          type="button"
          className={css.logoutButton}
          onClick={onLogout}
          disabled={isLoading}
          aria-label="Logout"
        >
          <svg className={css.logoutIcon}>
            <use href="/icons/sprite.svg#logout" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserBar;
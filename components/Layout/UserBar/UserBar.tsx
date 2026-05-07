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
        <Image
          className={css.avatar}
          src={imageSrc}
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
        {isLoading ? "Вихід..." : "Вихід"}
      </button>
    </div>
  );
};

export default UserBar;
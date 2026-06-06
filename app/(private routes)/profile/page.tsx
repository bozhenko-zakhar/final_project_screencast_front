import css from "./profilePage.module.css";
import type { User } from "@/types/user";
import { getServerUser } from "@/lib/api/serverApi/users";
import ProfileAvatar from "@/components/Profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/Profile/ProfileEditForm/ProfileEditForm";

const ProfilePage = async () => {
  const user: User = await getServerUser();

  return (
    <main className={css.main}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </main>
  );
};

export default ProfilePage;

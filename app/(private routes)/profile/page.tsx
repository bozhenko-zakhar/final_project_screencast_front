import css from "./profilePage.module.css";
import type { User } from "@/types/user";
import { getServerUser } from "@/lib/api/serverApi/users";
import ProfileAvatar from "@/components/Profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/Profile/ProfileEditForm/ProfileEditForm";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  let user: User | null = null;

  try {
    user = await getServerUser();
  } catch {
    redirect("/auth/login");
  }

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className={css.main}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </main>
  );
};

export default ProfilePage;

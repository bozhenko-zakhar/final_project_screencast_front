// import css from "./profilePage.module.css";
// import type { User } from "@/app/types/user";
// import { getUser } from "@/lib/api/serverApi";
// import ProfileAvatar from "@/app/components/Profile/ProfileAvatar/ProfileAvatar";
// import ProfileEditForm from "@/app/components/Profile/ProfileEditForm/ProfileEditForm";
// import { redirect } from "next/navigation";

// const ProfilePage = async () => {
//   let user: User | null = null;

//   try {
//     user = await getUser();
//   } catch {
//     redirect("/sign-in");
//   }

//   if (!user) {
//     redirect("/sign-in");
//   }

//   return (
//     <main className={css.main}>
//       <ProfileAvatar user={user} />
//       <ProfileEditForm user={user} />
//     </main>
//   );
// };

// export default ProfilePage;

import css from "./profilePage.module.css";
import type { User } from "@/app/types/user";
import ProfileAvatar from "@/app/components/Profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/app/components/Profile/ProfileEditForm/ProfileEditForm";

const ProfilePage = async () => {
  const user: User = {
    id: "1",
    username: "Test User",
    email: "test@test.com",
    gender: "boy",
    dueDate: "2026-06-01",
    avatar: "",
    createdAt: "",
    updatedAt: "",
  };

  return (
    <main className={css.main}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </main>
  );
};

export default ProfilePage;

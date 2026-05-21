"use client";

import { useEffect } from "react";

import { getMe } from "@/lib/api/clientApi/users";
// import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";
import { useAuthStore } from "@/lib/store/authStore";
// import { useWeekStore } from "@/lib/store/babyDataStore";
import { User } from "@/types/user";
import { setThemeByGender } from "@/lib/theme/setThemeByGender";
import { useDiaryStore } from "@/lib/store/diaryStore";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const user: User = await getMe();
        setUser(user);

        setThemeByGender(user.gender);

        document.body.dataset.theme =
          user.gender === "boy" || user.gender === "girl" ?
            user.gender
          : "neutral";
      } catch (err) {
        console.warn("Not authenticated", err);
        clearUser();

        setThemeByGender("girl");

        document.body.dataset.theme = "girl";

        /* try {
          const publicWeeks = await fetchPublicWeeks();

          setBabyData({
            babyState: publicWeeks.babyState,
            daysLeft: publicWeeks.daysLeft,
          });
        } catch (publicErr) {
          console.error(
            "Помилка при завантаженні публічних тижнів:",
            publicErr,
          );
        }

        return; */
      }

      /* try {
        const weeks = await fetchPrivateWeeks();

        setBabyData({
          babyState: weeks.babyState,
          daysLeft: weeks.daysLeft,
        });
      } catch (weeksErr) {
        console.error("Помилка при завантаженні приватних тижнів:", weeksErr);
      } */
    };

    fetchUser();
  }, [setUser, clearUser /*, setBabyData*/]);

  return children;
};

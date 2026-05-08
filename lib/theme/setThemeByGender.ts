import type { User } from "@/types/user";

export const setThemeByGender = (gender: User["gender"] | null | undefined) => {
  document.body.dataset.theme =
    gender === "boy" || gender === "girl" ? gender : "neutral";
};

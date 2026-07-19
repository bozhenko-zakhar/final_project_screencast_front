import { api } from "@/app/api/api";

export const refreshServerSession = async (cookieHeader: string) => {
  return api.post(
    '/auth/refresh',
    {},
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );
};
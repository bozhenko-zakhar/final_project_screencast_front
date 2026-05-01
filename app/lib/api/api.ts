import axios from "axios";

export const nextServer = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "/api",
  withCredentials: true,  //додаються cookies до запитів
});




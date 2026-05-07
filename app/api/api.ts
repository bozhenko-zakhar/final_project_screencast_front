import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.BACKEND_API_URL ||
    "https://final-project-screencast-back.onrender.com/api",
  withCredentials: true,
});
import axios from "axios";

export const api = axios.create({
  baseURL: "https://final-project-screencast-back.onrender.com/api",
  withCredentials: true,
});
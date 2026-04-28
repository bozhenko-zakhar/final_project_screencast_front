import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.RENDER_PUBLIC_API_URL}`,
  withCredentials: true,
});
// utils/api.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 배포시 확인

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  }
});

export const fetcher = (path: string, options?: RequestInit) => {
  return fetch(`${API_BASE_URL}${path}`, options);
};

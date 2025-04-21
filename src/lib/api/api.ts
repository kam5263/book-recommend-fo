// utils/api.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 배포시 확인
//const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // 필요 시 true
});

export const fetcher = (path: string, options?: RequestInit) => {
  return fetch(`${API_BASE_URL}${path}`, options);
};

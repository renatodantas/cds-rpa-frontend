import axios, { type AxiosInstance } from 'axios';

export type HttpClient = AxiosInstance;

export const httpClient: HttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
  // timeout: 3000
});

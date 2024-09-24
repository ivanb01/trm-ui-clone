import axios from 'axios';

export const baseURL = import.meta.env.VITE_CLICKER_API;

export const axiosClickerInstance = axios.create({
  baseURL
});

export const axiosClickerV3Instance = axios.create({
  baseURL: import.meta.env.VITE_CLICKER_URL
});

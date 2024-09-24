import axios, { AxiosError, AxiosResponse } from 'axios';

import { ResponseCode } from '../../model/enum/service/ResponseCode.ts';

export const baseURL = import.meta.env.VITE_API_URL;
export const url = `${baseURL}/rest/`;
export const axiosInstance = axios.create({
  baseURL: url
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config?.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  function (config: AxiosResponse) {
    return config;
  },
  function (error: AxiosError) {
    if (error.response?.status === ResponseCode.UNAUTHORIZED) {
      localStorage.removeItem('accessToken');
      if (!window.location.pathname.includes('login'))
        window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

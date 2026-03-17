import axios from 'axios';
import Config from '@/configs/config';

export const client = axios.create({
  baseURL: Config.getServerUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = (apiBase: string) => {
  console.log(`API Client initialized with base URL: ${apiBase}`);
  return ({
    method = 'GET',
    route,
    data,
  }: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    route: string;
    data?: any;
  }) => {
    console.log(
      `Making ${method} request to ${apiBase}${route} with data:`,
      data,
    );
    return client[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](
      `${apiBase}${route}`,
      data && method === 'GET' ? { params: data } : data,
    );
  };
};

import { apiClient } from './client';

const itemsApi = apiClient('/items');

export const getItems = async () => {
  const response = await itemsApi({
    method: 'GET',
    route: '/',
  });
  console.log('getItems response:', response.data);
  return response.data;
};

export const getItemsByUserId = async (id: string | number) => {
  const response = await itemsApi({
    method: 'GET',
    route: `/user/${id}`,
  });
  console.log('getItemsById response: ', response.data);
  return response.data;
};

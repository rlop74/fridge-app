import { apiClient } from './client';

const authApi = apiClient('/auth');

export const authenticate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return authApi({
    route: '/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
};

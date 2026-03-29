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

export const register = ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return authApi({
    method: 'POST',
    route: '/signup',
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
};

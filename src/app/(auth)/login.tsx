import { router } from 'expo-router';
import { Alert } from 'react-native';

import { AuthForm } from '@/components/auth/AuthForm';
import { authenticate } from '@/services/api/auth';
import { useAuthContext } from '@/contexts/auth';

export default function Login() {
  const { login, session } = useAuthContext();

  const loginHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await authenticate({
        email,
        password,
      });

      if (response.status === 200) {
        // handle redirect
        const refreshToken = response.data.tokens.refreshToken;
        const user = response.data.user;
        login(refreshToken, user);
        router.replace('/(tabs)');
        return 'success';
      }

      throw new Error('Login failed');
    } catch (err) {
      Alert.alert('Error', 'Email or password is incorrect');
      // throw new Error('Login failed');
    }
  };

  return <AuthForm mode="login" onSubmit={loginHandler} />;
}

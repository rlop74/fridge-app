import { useRouter } from 'expo-router';
import { AuthForm } from '@/components/auth/AuthForm';
import { register } from '@/services/api/auth';
import { useAuthContext } from '@/contexts/auth';

export default function Signup() {
  const router = useRouter();
  const { login } = useAuthContext();

  const signupHandler = async ({
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
    try {
      const response = await register({
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 200) {
        // handle redirect
        console.log('dudong');
        console.log(response);
      }
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
  };

  return <AuthForm mode="signup" onSubmit={signupHandler} />;
}

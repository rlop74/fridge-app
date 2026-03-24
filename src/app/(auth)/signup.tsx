import { AuthForm } from '@/components/auth/AuthForm';

export default function Signup() {
  const signupHandler = (data: any) => {
    console.log('signup', data);
  };

  return <AuthForm mode="signup" onSubmit={signupHandler} />;
}

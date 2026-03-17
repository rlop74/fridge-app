import { AuthScreen } from '@/components/auth/AuthForm';

export default function Signup() {
  const signupHandler = (data: any) => {
    console.log('signup', data);
  };

  return <AuthScreen mode="signup" onSubmit={signupHandler} />;
}

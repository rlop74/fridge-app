import { SplashScreen } from 'expo-router';
import { useAuthContext } from '@/contexts/auth';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
  const { isLoading } = useAuthContext();

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}
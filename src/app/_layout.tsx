// https://docs.expo.dev/router/installation/
// https://docs.expo.dev/router/advanced/native-tabs/
// https://docs.expo.dev/router/advanced/stack/

import { Stack } from 'expo-router';
import AuthContextProvider from '@/contexts/auth'; // https://docs.expo.dev/router/advanced/authentication/
import SplashScreenController from '@/app/splash';

export default function Layout() {
  return (
    <AuthContextProvider>
      <SplashScreenController />
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContextProvider>

    // <Stack screenOptions={{ animation: 'slide_from_right' }}>
    //   <Stack.Screen
    //     name="(tabs)"
    //     options={{
    //       headerShown: false,
    //     }}
    //   />
    // </Stack>
  );
}

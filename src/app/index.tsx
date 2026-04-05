import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { useAuthContext } from '@/contexts/auth';

const index = () => {
  const router = useRouter();
  const { session, isLoading } = useAuthContext();

  useEffect(() => {
    setTimeout(() => {
      if (session) {
        router.replace('/(tabs)');
        return;
      }
      router.replace('/(auth)/welcome');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('@assets/splashImage.png')}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:
  },
  logo: {
    height: '30%',
  },
});

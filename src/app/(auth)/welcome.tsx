import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

// components
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import FullButton from '@/components/CustomButton';

//
import { spacingX, spacingY } from '@/constants/styles';
import { verticalScale } from '@/utils/styling';
import { useAuthContext } from '@/contexts/auth';

const Welcome = () => {
  const router = useRouter();
  const { session } = useAuthContext();

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
      return;
    }
  }, [session]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            style={styles.signInButton}
          >
            <Typo fontWeight={500}>Sign in</Typo>
          </TouchableOpacity>

          <Image
            source={require('@assets/welcome.png')}
            style={styles.welcomeImage}
          />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Typo size={30} fontWeight={800}>
              Always take control
            </Typo>
            <Typo size={30} fontWeight={800}>
              of your kitchen
            </Typo>
          </View>
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Typo size={17}>Organize your fridge today for a smarter</Typo>
            <Typo size={17}>kitchen tomorrow</Typo>
          </View>
          <View style={styles.buttonContainer}>
            <FullButton onPress={() => router.push('/(auth)/signup')}>
              <Typo size={20} fontWeight={600} color="white">
                Get started
              </Typo>
            </FullButton>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  signInButton: {
    alignSelf: 'flex-end',
    marginRight: spacingX._20,
  },
  welcomeImage: {
    width: '100%',
    height: verticalScale(300),
    alignSelf: 'center',
    marginTop: verticalScale(100),
  },
  footer: {
    // backgroundColor: colors.neutral900,
    alignItems: 'center',
    // paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX._25,
  },
});

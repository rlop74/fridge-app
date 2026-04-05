import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// components
import { IconButton } from '@/components/IconButton';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import CustomButton from '@/components/CustomButton';

import { colors } from '@/constants/colors';
import { verticalScale } from '@/utils/styling';
import { AuthFormProps } from '@/types/userTypes';

export const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const router = useRouter();
  const isSignup = mode === 'signup';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [authState, setAuthState] = useState({
    email: '',
    password: '',
  });

  const submitHandler = () => {
    if (isSignup) {
      if (
        authState.email === '' ||
        authState.password === '' ||
        firstName === '' ||
        lastName === ''
      ) {
        return Alert.alert('Error', 'All fields are required');
      }

      onSubmit({
        ...authState,
        firstName,
        lastName,
      });
    } else {
      if (authState.email === '' || authState.password === '')
        return Alert.alert('Error', 'Email and password are required');

      onSubmit({
        ...authState,
      });
    }
  };

  return (
    <ScreenWrapper>
      <IconButton name="chevron-left" onPress={() => router.back()} size={36} />
      <View style={styles.container}>
        <Text style={styles.title}>
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </Text>

        {isSignup && (
          <>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          value={authState.email}
          onChangeText={(text) =>
            setAuthState((prev) => ({ ...prev, email: text }))
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={authState.password}
          onChangeText={(text) =>
            setAuthState((prev) => ({ ...prev, password: text }))
          }
        />

        <CustomButton onPress={submitHandler}>
          <Text style={styles.buttonText}>
            {isSignup ? 'Sign Up' : 'Login'}
          </Text>
        </CustomButton>

        {isSignup ? (
          <View style={styles.switchContainer}>
            <Typo size={15} style={styles.switchText}>
              Already have an account?
            </Typo>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Typo size={15} color={colors.primary500} fontWeight={600}>
                Login
              </Typo>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.switchContainer}>
            <Typo size={15} style={styles.switchText}>
              Don't have an account?
            </Typo>
            <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
              <Typo size={15} color={colors.primary500} fontWeight={600}>
                Sign up
              </Typo>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: verticalScale(120),
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  switchText: {
    // fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#4CAF50',
  },
});

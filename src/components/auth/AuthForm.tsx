import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

type Props = {
  mode: 'login' | 'signup';
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
};

export const AuthForm = ({ mode, onSubmit }: Props) => {
  const isSignup = mode === 'signup';

  const [name, setName] = useState('');
  const [authState, setAuthState] = useState({
    email: '',
    password: '',
  });

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const submitHandler = () => {
    if (authState.email === '' || authState.password === '')
      return Alert.alert('Error', 'Email and password are required');

    onSubmit({
      ...authState,
      ...(isSignup && { name }),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </Text>

      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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

      <Pressable style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      </Pressable>

      <View style={styles.switchContainer}>
        {isSignup ? (
          <Text style={styles.switchText}>
            Already have an account?{' '}
            <Link href="/login" style={styles.link}>
              Login
            </Link>
          </Text>
        ) : (
          <Text style={styles.switchText}>
            Don't have an account?{' '}
            <Link href="/signup" style={styles.link}>
              Sign up
            </Link>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
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

  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

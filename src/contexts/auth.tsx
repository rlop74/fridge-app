// https://docs.expo.dev/router/advanced/authentication/

import React, { createContext, useContext, useMemo, useState } from 'react';

import { useStorageState } from './useStorageState';
import {
  AuthContextType,
  IAuthContextProvider,
} from '@/types/authContextTypes';
// import appLogger from '~/utils/log/logger'

// const logger = appLogger.extend('src/contexts/auth-context.tsx')

// const AuthContext = createContext<{
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
//   session?: string | null;
//   isLoading: boolean;
// }>({
//   isLoggedIn: false,
//   login: () => {},
//   logout: () => {},
//   session: null,
//   isLoading: false,
// });

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: IAuthContextProvider) {
  const [[isSessionLoading, session], setSession] = useStorageState('session');
  const [[isUserLoading, userState], setUser] = useStorageState('user');

  const isLoading = isSessionLoading || isUserLoading;

  const user = useMemo(() => {
    try {
      return userState ? JSON.parse(userState) : null;
    } catch {
      return null;
    }
  }, [userState]);

  return (
    <AuthContext.Provider
      value={{
        login: (token, userInfo) => {
          setSession(token);
          setUser(JSON.stringify(userInfo));
        },
        logout: () => {
          setSession(null);
          setUser(null);
        },
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// use this hook to access the user info
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error(
      'useAuthContext must be used within a <AuthContextProvider>',
    );

  // const { isLoggedIn, login, logout, session, isLoading } = context;

  // return {
  //   isLoggedIn,
  //   login,
  //   logout,
  //   session,
  //   isLoading,
  // };

  return context;
}

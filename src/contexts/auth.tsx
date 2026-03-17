// https://docs.expo.dev/router/advanced/authentication/

import React, { createContext, useContext, useState } from 'react';
import { useStorageState } from './useStorageState';
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

type AuthContextType = {
  // isLoggedIn: boolean;
  login: (response: string) => void;
  logout: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

interface IAuthContextProvider {
  children: React.ReactNode | React.ReactNode[];
}

export default function AuthContextProvider({
  children,
}: IAuthContextProvider) {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        // isLoggedIn,
        login: (token) => {
          // setIsLoggedIn(true);
          setSession(token);
        },
        logout: () => {
          // setIsLoggedIn(false);
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

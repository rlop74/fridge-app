import { User } from '@/types/userTypes';

export type AuthContextType = {
  // isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  session: string | null;
  isLoading: boolean;
  user: User | null ;
};

export interface IAuthContextProvider {
  children: React.ReactNode | React.ReactNode[];
}

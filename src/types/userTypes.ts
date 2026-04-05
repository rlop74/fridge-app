type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthFormProps =
  | {
      mode: 'login';
      onSubmit: (data: LoginData) => void;
    }
  | {
      mode: 'signup';
      onSubmit: (data: SignupData) => void;
    };

export type User = {
  created_at: string;
  deleted_at: string | null;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password_hash: string;
  preferred_expiry_within_seconds: number;
  updated_at: string;
}
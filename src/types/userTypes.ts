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
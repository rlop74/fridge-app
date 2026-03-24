import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  children?: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

export type IconButtonProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color?: string;
  size?: number;
  onPress: () => void;
};

export type AuthFormProps = {
  mode: 'login' | 'signup';
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
};

export interface FullButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

import {
  ActivityIndicatorComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { colors } from '@/constants/colors';
import { FullButtonProps } from '@/types/styling';
import { verticalScale } from '@/utils/styling';
import { radius } from '@/constants/styles';

const CustomButton = ({
  style,
  loading = false,
  onPress,
  children,
}: FullButtonProps) => {
  if (loading) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary700,
    height: verticalScale(52),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
  },
});

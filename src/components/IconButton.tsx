import { Pressable, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButtonProps } from '@/types/styling';
import { colors } from '@/constants/colors';
import { radius, spacingX } from '@/constants/styles';

export const IconButton = ({
  name,
  color = colors.gray700,
  size = 26,
  onPress,
}: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons name={name} color={color} size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // backgroundColor: colors.gray200,
    padding: 5,
    borderRadius: radius._12,
    alignSelf: 'flex-start',
    // marginLeft: spacingX._12,
  },
  pressed: {
    opacity: 0.75,
  },
});

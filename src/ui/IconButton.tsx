import { Pressable, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconButtonProps {
  name: string;
  color: string;
  size: number;
}

export const IconButton = ({ name, color, size, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <MaterialCommunityIcons name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});

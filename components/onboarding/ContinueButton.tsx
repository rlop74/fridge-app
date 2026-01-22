// components/onboarding/ContinueButton.tsx
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  text?: string;
  onPress: () => void;
};

export default function ContinueButton({ text = "Continue", onPress }: Props) {
  return (
    <View className="px-6 pb-8">
      <TouchableOpacity
        onPress={onPress}
        className="bg-blue-500 py-4 rounded-full"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

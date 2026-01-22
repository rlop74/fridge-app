// components/onboarding/steps/MeetStep.tsx
import { Text, View } from "react-native";
import PotatoSprite from "@/components/potato/PotatoAnimate";

export default function MeetStep() {
  return (
    <View className="flex-1 justify-center items-center px-8">
      <View className="mb-8">
        <PotatoSprite />
      </View>
      <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
        Meet Potate
      </Text>
      <Text className="text-base text-gray-500 text-center px-4">
        Stay focused and make sure Potate stays alive
      </Text>
    </View>
  );
}

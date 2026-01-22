// components/onboarding/steps/NotificationsStep.tsx
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PotatoSprite from "@/components/potato/PotatoAnimate";

type Props = {
  name: string;
};

export default function NotificationsStep({ name }: Props) {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
        One last thing, {name}!
      </Text>

      <View className="bg-gray-50 p-6 rounded-2xl border border-gray-200 w-full max-w-sm mb-6">
        <Text className="text-lg font-semibold text-gray-900 text-center mb-2">
          &quot;Potate&quot; Would Like to Send You Notifications
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          Notifications remind you to stay focused if you leave the app.
        </Text>
      </View>

      <View className="items-center mb-4">
        <Ionicons name="arrow-up" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 mt-1">Tap Allow</Text>
      </View>

      <View className="mt-4">
        <PotatoSprite />
      </View>
    </View>
  );
}

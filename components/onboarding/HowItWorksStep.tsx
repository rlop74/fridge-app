// components/onboarding/steps/HowItWorksStep.tsx
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { HowItWorksItem } from "../constants";

type Props = {
  name: string;
  items: HowItWorksItem[];
};

export default function HowItWorksStep({ name, items }: Props) {
  return (
    <View className="flex-1 px-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
          Hey {name}!
        </Text>
        <Text className="text-base text-gray-400 text-center mb-10">
          Here&apos;s how we&apos;ll work together
        </Text>

        <View className="gap-6">
          {items.map((item, index) => (
            <View key={index} className="flex-row items-center">
              <View className="w-14 h-14 bg-orange-100 rounded-2xl items-center justify-center mr-4">
                <Ionicons name={item.icon} size={28} color="#F97316" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

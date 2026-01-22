// components/onboarding/ProgressBar.tsx
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  step: number;
  totalSteps: number;
  onBack: () => void;
};

export default function ProgressBar({ step, totalSteps, onBack }: Props) {
  const progress = step / totalSteps;

  return (
    <View className="flex-row items-center px-4 pt-2 pb-4">
      <TouchableOpacity
        onPress={onBack}
        className={`mr-3 ${step === 1 ? "opacity-0" : ""}`}
      >
        <Ionicons name="chevron-back" size={24} color="#3B82F6" />
      </TouchableOpacity>

      <View className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </View>

      {/* Spacer to keep bar centered */}
      <View className="ml-3 opacity-0">
        <Ionicons name="chevron-forward" size={24} color="#3B82F6" />
      </View>
    </View>
  );
}

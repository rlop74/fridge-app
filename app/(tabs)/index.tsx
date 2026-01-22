import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants & Types

// Hooks
import { useNotifications } from "@/hooks/useNotifications";

export default function App() {
  useNotifications();

  return (
    <SafeAreaView className={`flex-1 transition-colors duration-300`}>
      <Text>App</Text>
    </SafeAreaView>
  );
}

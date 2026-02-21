import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";

// Components
import { Cards } from "@/components/index/Cards";
import { Header } from "@/components/index/Header";
import { RecipeSuggestions } from "@/components/index/RecipeSuggestions";
import { Screen } from "@/app/theme/Screen";

// Constants & Types

// Hooks
import useLogger from "@/hooks/useLogger";

export default function Home() {
    const logger = useLogger("app/(tabs)/index");

    logger.debug("HEY LOGGIN FROM HOME");

    return (
        // <SafeAreaView
        //     className={`flex-1 transition-colors duration-300 p-4 gap-4 overflow-hidden`}
        // >
        <Screen>
            <Header />
            <View className="p-4">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Cards />
                    <RecipeSuggestions />
                </ScrollView>
            </View>
        </Screen>
        // </SafeAreaView>
    );
}

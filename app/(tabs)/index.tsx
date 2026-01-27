import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";

// Components
import { Cards } from "@/components/index/Cards";
import { Header } from "@/components/index/Header";
import { RecipeSuggestions } from "@/components/index/RecipeSuggestions";

// Constants & Types

// Hooks

export default function Home() {
    return (
        <SafeAreaView
            className={`flex-1 transition-colors duration-300 p-4 gap-4 overflow-hidden`}
        >
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cards />
                <RecipeSuggestions />
            </ScrollView>
        </SafeAreaView>
    );
}

import { Stack } from "expo-router";
import "@/global.css";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const myDarkTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: "#13ED5E",
        },
    };
    const myDefaultTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: "#193221",
        },
    };

    return (
        // <SafeAreaProvider className="flex-1">
        //   <Stack screenOptions={{ headerBlurEffect: "dark" }}>
        //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        //   </Stack>
        //   <StatusBar style="auto" />
        // </SafeAreaProvider>
        <ThemeProvider
            value={colorScheme === "dark" ? myDarkTheme : myDefaultTheme}
        >
            <Stack screenOptions={{ headerShown: false }} />
            {/* <Stack screenOptions={{ headerBlurEffect: "dark" }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack> */}
        </ThemeProvider>
    );
}

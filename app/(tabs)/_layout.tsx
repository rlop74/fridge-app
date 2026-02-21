import { Tabs } from "expo-router";
import { IconSymbol } from "../../components/ui/iconSymbol";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={24} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="fridge"
                options={{
                    title: "Fridge",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={24}
                            name="archivebox.fill"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "Camera",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={24}
                            name="camera.fill"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={24} name="clock.fill" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

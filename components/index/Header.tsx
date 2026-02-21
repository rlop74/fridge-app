import { Text, View, Image, Pressable } from "react-native";

// Constants & Types

// Hooks

// icons
import { IconSymbol } from "@/components/ui/iconSymbol";
import { useState } from "react";

// style
import { ThemedText } from "@/app/theme/ThemedText";
import { useTheme } from "@react-navigation/native";

export const Header = () => {
    const { colors } = useTheme();
    const [userFirstName, setUserFirstName] = useState("Russel");
    const [numberOfItems, setNumberOfItems] = useState(4);

    const handleSearch = () => {
        alert("Search button has been pressed");
    };

    const handleNotif = () => {
        alert("Notif button has been pressed");
    };

    return (
        <View className="flex gap-4 px-4">
            <View className="flex flex-row justify-between">
                <View className="flex flex-row gap-3 items-center">
                    <Image
                        className="h-[40px] w-[40px] rounded-2xl border border-green-700"
                        source={{
                            uri: "https://media.licdn.com/dms/image/v2/D4E03AQGy1OWBIfOy2A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1691031045223?e=1773273600&v=beta&t=btQ3RyoOgeXtC1bTI9sPs3RrKCPlRuSjjNWAqTXnDBg",
                        }}
                    />
                    <ThemedText className="text-3xl font-bold">DigiFridge</ThemedText>
                </View>
                <View className="flex flex-row gap-1">
                    <Pressable onPress={handleSearch}>
                        <View className="p-2">
                            <IconSymbol
                                size={30}
                                name={"magnifyingglass"}
                                color={colors.text}
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={handleNotif}>
                        <View className="p-2">
                            <IconSymbol
                                size={30}
                                name="bell.fill"
                                color={colors.text}
                            />
                        </View>
                    </Pressable>
                </View>
            </View>
            <View className="gap-2">
                <ThemedText className="text-2xl font-bold">
                    Hello, {userFirstName}! 👋🏽
                </ThemedText>
                <ThemedText>
                    You have{" "}
                    <Text className="font-bold text-green-600">
                        {numberOfItems} items
                    </Text>{" "}
                    expiring in the next 48 hours.
                </ThemedText>
            </View>
        </View>
    );
};

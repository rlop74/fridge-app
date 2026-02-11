import { Text, View, Image, Pressable } from "react-native";

// Constants & Types

// Hooks

// icons
import { IconSymbol } from "@/components/ui/iconSymbol";
import { useState } from "react";

export const Header = () => {
    const [userFirstName, setUserFirstName] = useState("Russel");
    const [numberOfItems, setNumberOfItems] = useState(4);

    const handleSearch = () => {
        alert("Search button has been pressed");
    };

    const handleNotif = () => {
        alert("Notif button has been pressed");
    };

    return (
        <View className="flex gap-4">
            <View className="flex flex-row justify-between">
                <View className="flex flex-row gap-3 items-center">
                    <Image
                        className="h-10 w-10 rounded-2xl border border-green-700"
                        source={{
                            uri: "https://media.licdn.com/dms/image/v2/D4E03AQGy1OWBIfOy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691031045223?e=1770854400&v=beta&t=UuksQybvmXBAE0idRQ6-VJMul-9OMHmnvQrjCaMvJ4I",
                        }}
                    />
                    <Text className="text-xl font-bold">DigiFridge</Text>
                </View>
                <View className="flex flex-row gap-2">
                    <Pressable onPress={handleSearch}>
                        <View className="border border-gray-300 rounded-full p-1">
                            <IconSymbol
                                size={24}
                                name={"magnifyingglass"}
                                color="black"
                            />
                        </View>
                    </Pressable>
                    <Pressable onPress={handleNotif}>
                        <View className="border border-gray-300 rounded-full p-1">
                            <IconSymbol
                                size={24}
                                name="bell.fill"
                                color="black"
                            />
                        </View>
                    </Pressable>
                </View>
            </View>
            <View>
                <Text className="text-2xl font-bold">
                    Hello, {userFirstName}! 👋🏽
                </Text>
                <Text>
                    You have{" "}
                    <Text className="font-bold text-green-600">
                        {numberOfItems} items
                    </Text>{" "}
                    expiring in the next 48 hours.
                </Text>
            </View>
        </View>
    );
};

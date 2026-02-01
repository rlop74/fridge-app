import { IconSymbol } from "@/components/ui/icon-symbol";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants & Types

// Hooks
import { useFridgeStore } from "@/hooks/useFridgeItems";

// api
import { getFridgeItems } from "@/api/fridge";

export default function Fridge() {
    const [search, setSearch] = useState("");
    // const { fridgeItems, setFridgeItems } = useFridgeStore((state) => state);
    const fridgeItems = useFridgeStore((state) => state.fridgeItems);
    const setFridgeItems = useFridgeStore((state) => state.setFridgeItems);

    const handleCamera = () => {
        alert("Camera has been pressed");
    };

    useEffect(() => {
        const fetchFridgeItems = async () => {
            try {
                const items = await getFridgeItems();
                setFridgeItems(items);
            } catch (err) {
                console.error("Failed to get Fridge Items: ", err);
                alert("Something went wrong");
            }
        };

        fetchFridgeItems();
    }, []);

    return (
        <SafeAreaView className={`flex-1 transition-colors duration-300 gap-1`}>
            <View className="flex-row justify-between p-3">
                <View className="flex-row gap-3">
                    <View className="bg-[#114924] p-2 rounded-lg">
                        <IconSymbol
                            size={27}
                            name="refrigerator.fill"
                            color="#14EC5C"
                        />
                    </View>
                    <Text className="text-2xl">Fridge Inventory</Text>
                </View>
                <Pressable
                    onPress={handleCamera}
                    className="p-1 justify-center bg-[#14EC5C] rounded-lg"
                >
                    <IconSymbol
                        size={24}
                        name="camera.viewfinder"
                        color="black"
                    />
                </Pressable>
            </View>
            <View className="relative mx-3 justify-center">
                <TextInput
                    placeholder="Search food items..."
                    className="border border-gray-400 p-2 pl-12 rounded-xl text-lg"
                    value={search}
                />
                <IconSymbol
                    size={24}
                    name="magnifyingglass"
                    color="gray"
                    style={{
                        position: "absolute",
                        left: 12,
                    }}
                />
            </View>

            <ScrollView>
                {fridgeItems?.map((item) => {
                    return (
                        <View
                            key={item.id}
                            className="flex-row gap-2 p-2 items-center"
                        >
                            <View className="border rounded-xl p-2 h-20 w-20 justify-center items-center">
                                <Text>logo</Text>
                            </View>
                            <View className="gap-1">
                                <Text className="capitalize text-xl">
                                    {item.name}
                                </Text>
                                <Text>{item.quantity}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

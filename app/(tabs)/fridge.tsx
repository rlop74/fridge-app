import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants & Types

// Hooks

export default function Fridge() {
    const [search, setSearch] = useState("");
    const foodList = [
        {
            id: 1,
            name: "carrots",
            quantity: 2,
            type: "vegetable",
        },
        {
            id: 2,
            name: "chicken",
            quantity: 4,
            type: "meat",
        },
        {
            id: 3,
            name: "sprite zero",
            quantity: 3,
            type: "drink",
        },
        {
            id: 4,
            name: "apples",
            quantity: 2,
            type: "fruit",
        },
        {
            id: 5,
            name: "ground beef",
            quantity: 4,
            type: "meat",
        },
        {
            id: 6,
            name: "ground pork",
            quantity: 3,
            type: "meat",
        },
        {
            id: 7,
            name: "cabbage",
            quantity: 2,
            type: "vegetable",
        },
        {
            id: 8,
            name: "ribeye",
            quantity: 4,
            type: "meat",
        },
        {
            id: 9,
            name: "coke zero",
            quantity: 3,
            type: "drink",
        },
    ];
    const handleCamera = () => {
        alert("Camera has been pressed");
    };

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
                {foodList.map((food) => {
                    return (
                        <View
                            key={food.id}
                            className="flex-row gap-2 p-2 items-center"
                        >
                            <View className="border rounded-xl p-2 h-20 w-20 justify-center items-center">
                                <Text>logo</Text>
                            </View>
                            <View className="gap-1">
                                <Text className="capitalize text-xl">
                                    {food.name}
                                </Text>
                                <Text>{food.quantity}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

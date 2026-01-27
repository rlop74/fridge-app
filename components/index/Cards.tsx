import { View, Pressable, Text, Image } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

export const Cards = () => {
    const handleViewList = () => {
        alert("View List has been pressed");
    };

    return (
        <View className="flex-1 gap-5">
            {/* big card */}
            <View className="border-2 border-green-800 flex-1 rounded-xl flex justify-between overflow-hidden">
                <View className="flex h-80 w-full justify-center items-center relative">
                    <Image
                        className="h-full w-full"
                        source={{
                            uri: "https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg",
                        }}
                    />
                    <View className="bg-[#193221] z-index-5 rounded-xl p-4 gap-3 absolute bottom-0 w-full">
                        <View className="flex flex-row items-center justify-between">
                            <View>
                                <Text className="text-[#13ED5E] text-sm font-semibold">
                                    RECENT ACTIVITY
                                </Text>
                                <Text className="text-white text-2xl font-bold">
                                    Last Grocery Trip
                                </Text>
                            </View>
                            <View className="p-1 rounded-md bg-green-700">
                                <Text className="text-[#13ED5E]">
                                    RECEIPT SCANNED
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between">
                            <View>
                                <Text className="text-white">
                                    Oct 24th • 32 items added
                                </Text>
                                <Text className="text-white">
                                    Top categories: Produce, Dairy, Proteins
                                </Text>
                            </View>
                            <Pressable
                                onPress={handleViewList}
                                className="bg-[#13ED5E] p-2 rounded-lg"
                            >
                                <Text>View List</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            {/* 2 small cards */}
            <View className="flex-row gap-3">
                {/* make below as a component??? */}
                <View className="flex-1 border border-gray-500 rounded-lg p-3 gap-1 bg-[#193221]">
                    <IconSymbol size={24} name="tray.fill" color="green" />
                    <Text className="text-white">FRIDGE FULL</Text>
                    <Text className="text-2xl font-bold text-white">
                        78% Full
                    </Text>
                </View>
                <View className="flex-1 border border-gray-500 rounded-lg p-3 gap-1 bg-[#193221]">
                    <IconSymbol
                        size={24}
                        name="exclamationmark.triangle.fill"
                        color="orange"
                    />
                    <Text className="text-white">NEAR EXPIRY</Text>
                    <Text className="text-2xl font-bold text-white">
                        12 Items
                    </Text>
                </View>
            </View>
        </View>
    );
};

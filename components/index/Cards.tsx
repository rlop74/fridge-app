import { View, Pressable, Text, Image } from "react-native";
import { IconSymbol } from "../ui/iconSymbol";

// ui
import { statCard, cardText } from "@/styles/ui";

export const Cards = () => {
    const handleViewList = () => {
        alert("View List has been pressed");
    };


    return (
        <View className="flex-1 gap-5">
            {/* big card */}
            <View className="flex-1 rounded-xl flex justify-between overflow-hidden">
                <View className="flex h-80 w-full justify-center items-center relative border-2 border-green-800">
                    <Image
                        className="h-full w-full"
                        source={{
                            uri: "https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg",
                        }}
                    />
                    <View className={`${statCard} gap-4 absolute bottom-0 w-full`}>
                        <View className="flex flex-row items-center justify-between">
                            <View>
                                <Text className={`${cardText.subheading} text-heading`}>
                                    RECENT ACTIVITY
                                </Text>
                                <Text className={`${cardText.heading}`}>
                                    Last Grocery Trip
                                </Text>
                            </View>
                            <View className="p-1 rounded-md bg-green-700">
                                <Text className="text-heading">
                                    RECEIPT SCANNED
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between">
                            <View>
                                <Text className={`${cardText.regular}`}>
                                    Oct 24th • 32 items added
                                </Text>
                                <Text className={`${cardText.regular}`}>
                                    Top categories: Produce, Dairy, Proteins
                                </Text>
                            </View>
                            <Pressable
                                onPress={handleViewList}
                                className='bg-buttonBg p-2 rounded-lg'
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
                <View className={`${statCard} gap-1`}>
                    <IconSymbol size={24} name="refrigerator.fill" color="green" />
                    <Text className={`${cardText.regular}`}>FRIDGE FULL</Text>
                    <Text className={`${cardText.heading}`}>
                        78% Full
                    </Text>
                </View>
                <View className={`${statCard} gap-1`}>
                    <IconSymbol 
                        size={24}
                        name="exclamationmark.triangle.fill"
                        color="orange"
                    />
                    <Text className={`${cardText.regular}`}>NEAR EXPIRY</Text>
                    <Text className={`${cardText.heading}`}>
                        12 Items
                    </Text>
                </View>
            </View>
        </View>
    );
};

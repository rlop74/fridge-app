import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { IconSymbol } from "../ui/iconSymbol";

// ui
import { cardBase } from "@/styles/ui";

export const RecipeSuggestions = () => {
    const handleSeeAll = () => {
        alert("See All has been pressed");
    };

    const recipes = [
        {
            id: 1,
            name: "adobo",
            img: "https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg",
        },
        {
            id: 2,
            name: "sisig",
            img: "https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg",
        },
        {
            id: 3,
            name: "beef steak",
            img: "https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg",
        },
    ];

    return (
        <View className="mt-3 gap-2">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold">Suggested for You</Text>
                <Pressable>
                    <Pressable onPress={handleSeeAll}>
                        <Text className="text-green-500 font-bold">
                            See All
                        </Text>
                    </Pressable>
                </Pressable>
            </View>
            <ScrollView horizontal contentContainerStyle={{ gap: 16 }}>
                {recipes.map((recipe) => {
                    return (
                        <Pressable
                            key={recipe.id}
                            className={`${cardBase}`}
                        >
                            <View className="relative">
                                <Image
                                    // className="h-48 w-48"
                                    style={{
                                        height: 200,
                                        width: 200,
                                        margin: 8,
                                        borderRadius: 8,
                                    }}
                                    source={{ uri: recipe.img }}
                                />
                                <Text className="absolute bottom-0 bg-cardBg p-4 rounded-tr-lg rounded-bl-lg text-white font-bold capitalize">
                                    {recipe.name}
                                </Text>
                                {/* <IconSymbol
                                    size={24}
                                    name="heart.fill"
                                    color="white"
                                    className=""
                                /> */}
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
};

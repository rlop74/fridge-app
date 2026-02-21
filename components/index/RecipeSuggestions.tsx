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
            img: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2024-04-filipino-adobo%2Ffilipino-adobo-426",
        },
        {
            id: 2,
            name: "sisig",
            img: "https://i0.wp.com/www.Iankewks.com/wp-content/uploads/2023/02/IMG_7014.jpg?resize=800%2C1054&ssl=1",
        },
        {
            id: 3,
            name: "beef steak",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQit_dekQRDnDVxNOA4urGUPG0A3qWyEUi_kYjj_7142NPQyNlTeWcaw7MFuRga5vkG8ZdSc-SCbtuVGrFXqsWMDT-HKe105isVZKxZ_2Kl&s=10",
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
                        <Pressable key={recipe.id} className={`${cardBase}`}>
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

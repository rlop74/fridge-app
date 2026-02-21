import { IconSymbol } from "@/components/ui/iconSymbol";
import { useEffect, useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
    ScrollView,
    Modal,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants & Types
import { FridgeItem } from "@/types/fridgeTypes";

// Hooks
import { useFridgeStore } from "@/hooks/useFridgeItems";
import { useModal } from "@/hooks/useModal";

// api
import { getFridgeItems } from "@/services/fridge/repository";
import { formatDate } from "@/utils/formatDate";

// styles and components
import { itemText } from "@/styles/ui";
import { ItemModal } from "@/components/fridge/ItemModal";
import { AddItemModal } from "@/components/fridge/AddItemModal";
import { Screen } from "@/app/theme/Screen";
import { ThemedText } from "@/app/theme/ThemedText";

export default function Fridge() {
    const [search, setSearch] = useState("");
    const {
        itemModalVisible,
        setItemModalVisible,
        addItemModalVisible,
        setAddItemModalVisible,
    } = useModal((state) => state);
    const [pressedItem, setPressedItem] = useState<FridgeItem>();
    const fridgeItems = useFridgeStore((state) => state.fridgeItems);
    const setFridgeItems = useFridgeStore((state) => state.setFridgeItems);

    // const formattedDate = formatDate(pressedItem.created_at)

    // apply search
    const lowerSearch: string = search.toLowerCase();
    const filteredSearch = fridgeItems?.filter((item) => {
        return (
            item.name.toLowerCase().includes(lowerSearch) ||
            item.quantity.toString().includes(lowerSearch) ||
            item.createdAt?.toString().includes(lowerSearch)
        );
    });

    useEffect(() => {
        const fetchFridgeItems = async () => {
            try {
                const { items: fridgeItems } = await getFridgeItems();
                setFridgeItems(fridgeItems);
            } catch (err) {
                console.error("Failed to get Fridge Items: ", err);
                alert("Something went wrong");
            }
        };

        fetchFridgeItems();
    }, []);

    return (
        // <SafeAreaView className={`flex-1 transition-colors duration-300 gap-1`}>
        <Screen>
            <View className="flex-row items-center justify-between px-4 py-3">
                {/* left */}
                <View className="flex-row items-center gap-3">
                    <View className="h-11 w-11 rounded-xl bg-cardBg justify-center items-center">
                        <IconSymbol
                            size={24}
                            name="refrigerator.fill"
                            color="#14EC5C"
                        />
                    </View>

                    <ThemedText className="text-2xl font-bold">Fridge</ThemedText>
                </View>

                {/* add item button */}
                <Pressable
                    className="h-11 w-11 rounded-xl bg-buttonBg justify-center items-center"
                    onPress={() => setAddItemModalVisible(!addItemModalVisible)}
                >
                    <IconSymbol
                        size={22}
                        name="cart.fill.badge.plus"
                        color="#102215"
                    />
                </Pressable>

                {addItemModalVisible && <AddItemModal />}
            </View>
            <View className="mx-4 mb-3">
                <View className="relative flex-row items-center rounded-2xl px-4 py-3 border border-gray-500">
                    <IconSymbol
                        size={20}
                        name="magnifyingglass"
                        color="gray"
                        style={{ marginRight: 10 }}
                    />

                    <TextInput
                        placeholder="Search items"
                        className=""
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <ScrollView contentContainerClassName="flex-grow">
                {filteredSearch && filteredSearch.length > 0 ? (
                    filteredSearch.map((item) => {
                        return (
                            <Pressable
                                key={item.id || item.createdAt?.toString()}
                                onPress={() => {
                                    setPressedItem(item);
                                    setItemModalVisible(true);
                                }}
                                className="mx-3 mb-3 rounded-2xl p-4 flex-row items-center justify-between border-b border-gray-300"
                            >
                                {/* left: identity */}
                                <View className="flex-row gap-3 items-center">
                                    {/* icon / placeholder */}
                                    <View className="h-14 w-14 rounded-xl bg-cardBg justify-center items-center">
                                        <Text className="font-bold">🍽️</Text>
                                    </View>

                                    {/* text */}
                                    <View className="gap-1">
                                        <ThemedText
                                            className={`${itemText.heading}`}
                                        >
                                            {item.name}
                                        </ThemedText>
                                        <ThemedText
                                            className={`${itemText.subheading} text-[#102215]`}
                                        >
                                            Quantity: {item.quantity}
                                        </ThemedText>
                                    </View>
                                </View>

                                {/* right: metadata */}
                                <View className="items-end">
                                    <ThemedText
                                        className={`${itemText.regular} text-[#102215]`}
                                    >
                                        {formatDate(
                                            item.createdAt?.toString() || "",
                                        )}
                                    </ThemedText>
                                </View>
                            </Pressable>
                        );
                    })
                ) : (
                    <View className="flex-1 items-center justify-center mt-20">
                        <ThemedText className="text-cardBg font-bold">
                            No items yet
                        </ThemedText>
                    </View>
                )}
            </ScrollView>

            {/* modal */}
            {pressedItem && <ItemModal pressedItem={pressedItem} />}
            {/* </SafeAreaView> */}
        </Screen>
    );
}

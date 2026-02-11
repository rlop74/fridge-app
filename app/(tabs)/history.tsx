import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/format-date";
import { getUsedFridgeItems } from "@/services/fridge/repository";

// hooks
import { useFridgeStore } from "../../hooks/useFridgeItems";

// ui
import { itemText } from "@/styles/ui"

interface item {
    id: number;
    name: string;
    quantity: number;
    reason: "consume" | "discard" | "expired" | "correction";
    createdAt: string;
    // deletedAt: string;
}

export default function History() {
    const [search, setSearch] = useState("");
    const usedFridgeItems = useFridgeStore((state) => state.usedFridgeItems);
    const setUsedFridgeItems = useFridgeStore(
        (state) => state.setUsedFridgeItems,
    );

    useEffect(() => {
        const fetchUsedItems = async () => {
            try {
                const usedItems = await getUsedFridgeItems();
                setUsedFridgeItems(usedItems);
            } catch (err) {
                console.error(err);
                alert("Something went wrong");
            }
        };

        fetchUsedItems();
    });

    // apply search
    const lowerSearch = search.toLowerCase();
    const filteredSearch = usedFridgeItems?.filter((item) => {
        return (
            item.name.toLowerCase().includes(lowerSearch) ||
            item.quantity.toString().includes(lowerSearch) ||
            item.reason.includes(lowerSearch)
        );
    });

    return (
        <SafeAreaView className="flex-1 px-4 pt-4">
            {/* header */}
            <Text className="text-2xl font-bold mb-3">History</Text>

            {/* search */}
            <View className="mb-4">
                <View className="flex-row items-center rounded-2xl px-4 py-3 border border-gray-500">
                    <TextInput
                        placeholder="Search history"
                        // placeholderTextColor="#C7EAD5"
                        className="flex-1 text-white"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            {/* list */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredSearch && filteredSearch.length > 0 ? (
                    filteredSearch.map((item) => (
                        <View
                            key={item.id}
                            className="mb-3 rounded-2xl bg-cardBg p-4 gap-2"
                        >
                            {/* top: identity */}
                            <View className="flex-row justify-between items-center">
                                <Text className={`${itemText.heading} text-white`}>
                                    {item.name}
                                </Text>

                                <Text className={`${itemText.regular} text-[#C7EAD5] uppercase`}>
                                    {item.reason}
                                </Text>
                            </View>

                            {/* quantity */}
                            <Text className={`${itemText.subheading} text-sm text-[#C7EAD5]`}>
                                Quantity:{" "}
                                <Text className="font-semibold">
                                    {item.quantity}
                                </Text>
                            </Text>

                            {/* timeline */}
                            <View className="gap-1">
                                <Text className={`${itemText.regular} text-[#C7EAD5] capitalize`}>
                                    {item.reason} date:{" "}
                                    {formatDate(item.created_at)}
                                </Text>
                                {/* <Text className="text-xs text-[#C7EAD5]">
                                Removed: {item.deletedAt}
                            </Text> */}
                            </View>
                        </View>
                    ))
                ) : (
                    <View className="flex-1 items-center justify-center mt-20">
                        <Text className="text-[#114924] font-bold">
                            No items yet
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

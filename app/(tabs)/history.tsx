import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { formatDate } from "@/services/format-date";

interface item {
    id: number;
    name: string;
    quantity: number;
    reason: "consume" | "discard" | "expired" | "correction";
    createdAt: string;
    deletedAt: string;
}

const deletedItems: item[] = [
    {
        id: 1,
        name: "milk",
        quantity: 2,
        reason: "consume",
        createdAt: "Jan 1, 2026",
        deletedAt: "Jan 7, 2026",
    },
    {
        id: 2,
        name: "bagle",
        quantity: 1,
        reason: "consume",
        createdAt: "Jan 3, 2026",
        deletedAt: "Jan 8, 2026",
    },
    {
        id: 3,
        name: "tuna",
        quantity: 4,
        reason: "consume",
        createdAt: "Jan 2, 2026",
        deletedAt: "Jan 10, 2026",
    },
    {
        id: 4,
        name: "tuna",
        quantity: 1,
        reason: "consume",
        createdAt: "Jan 2, 2026",
        deletedAt: "Jan 6, 2026",
    },
];

export default function History() {
    const [search, setSearch] = useState("");

    // apply search
    const lowerSearch = search.toLowerCase();
    const filteredSearch = deletedItems.filter((item) => {
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
                {filteredSearch.map((item) => (
                    <View
                        key={item.id}
                        className="mb-3 rounded-2xl bg-[#114924] p-4 gap-3"
                    >
                        {/* top: identity */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-semibold capitalize text-white">
                                {item.name}
                            </Text>

                            <Text className="text-xs text-[#C7EAD5] uppercase">
                                {item.reason}
                            </Text>
                        </View>

                        {/* quantity */}
                        <Text className="text-sm text-[#C7EAD5]">
                            Quantity:{" "}
                            <Text className="font-semibold">
                                {item.quantity}
                            </Text>
                        </Text>

                        {/* timeline */}
                        <View className="gap-1">
                            <Text className="text-xs text-[#C7EAD5]">
                                Bought: {item.createdAt}
                            </Text>
                            <Text className="text-xs text-[#C7EAD5]">
                                Removed: {item.deletedAt}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

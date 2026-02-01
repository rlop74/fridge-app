import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useState } from "react";

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
        <SafeAreaView
            className={`flex-1 transition-colors duration-300 p-4 gap-4 overflow-hidden`}
        >
            <Text className="text-2xl font-bold">History</Text>
            <TextInput
                placeholder="Search..."
                className="border border-gray-300 p-2 rounded"
                value={search}
                onChangeText={(newText) => setSearch(newText)}
            />
            <ScrollView>
                {filteredSearch.map((item) => {
                    return (
                        <View
                            key={item.id}
                            className="border p-3 rounded-lg gap-2 justify-between mb-3"
                        >
                            <View>
                                <Text className="text-lg capitalize">
                                    {item.name}
                                </Text>
                                <Text className="text-sm uppercase">
                                    {item.quantity} - {item.reason}
                                </Text>
                            </View>
                            <View>
                                <Text>Bought on: {item.createdAt}</Text>
                                <Text>
                                    Consumed/removed on: {item.deletedAt}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

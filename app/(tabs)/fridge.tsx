import { IconSymbol } from "@/components/ui/icon-symbol";
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
import { FridgeItem } from "@/hooks/useFridgeItems";

// Hooks
import { useFridgeStore } from "@/hooks/useFridgeItems";

// api
import { getFridgeItems } from "@/api/fridge";
import { formatDate } from "@/services/format-date";

export default function Fridge() {
    const [search, setSearch] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
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
            item.created_at.includes(lowerSearch)
        );
    });

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
            <View className="flex-row items-center justify-between px-4 py-3">
                {/* left */}
                <View className="flex-row items-center gap-3">
                    <View className="h-11 w-11 rounded-xl bg-[#114924] justify-center items-center">
                        <IconSymbol
                            size={24}
                            name="refrigerator.fill"
                            color="#14EC5C"
                        />
                    </View>

                    <Text className="text-2xl font-bold">Fridge</Text>
                </View>

                {/* camera */}
                <Pressable
                    onPress={handleCamera}
                    className="h-11 w-11 rounded-xl bg-[#14EC5C] justify-center items-center"
                >
                    <IconSymbol
                        size={22}
                        name="camera.viewfinder"
                        color="#102215"
                    />
                </Pressable>
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
                        placeholderTextColor="gray"
                        className="flex-1 text-base text-white"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <ScrollView>
                {filteredSearch && filteredSearch.length > 0 ? (
                    filteredSearch.map((item) => {
                        return (
                            <Pressable
                                key={item.id}
                                onPress={() => {
                                    setPressedItem(item);
                                    setModalVisible(true);
                                }}
                                className="mx-3 mb-3 rounded-2xl p-4 flex-row items-center justify-between border-b border-gray-300"
                            >
                                {/* left: identity */}
                                <View className="flex-row gap-3 items-center">
                                    {/* icon / placeholder */}
                                    <View className="h-14 w-14 rounded-xl bg-[#102215] justify-center items-center">
                                        <Text className="text-[#14EC5C] font-bold">
                                            🍽️
                                        </Text>
                                    </View>

                                    {/* text */}
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold capitalize">
                                            {item.name}
                                        </Text>
                                        <Text className="text-sm text-[#102215]">
                                            Quantity: {item.quantity}
                                        </Text>
                                    </View>
                                </View>

                                {/* right: metadata */}
                                <View className="items-end">
                                    <Text className="text-xs text-[#102215]">
                                        {formatDate(item.created_at)}
                                    </Text>
                                </View>
                            </Pressable>
                        );
                    })
                ) : (
                    <View className="flex-1 items-center justify-center mt-20">
                        <Text className="text-[#114924] font-bold">
                            No items yet
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* modal */}
            {pressedItem && (
                <Modal transparent visible={modalVisible} animationType="fade">
                    {/* overlay */}
                    <View className="flex-1 bg-black/60 justify-center items-center px-6">
                        {/* modal surface */}
                        <View className="w-full bg-[#114924] rounded-2xl p-6 gap-6">
                            {/* header */}
                            <View className="items-center gap-1">
                                <Text className="text-2xl font-bold text-white capitalize">
                                    {pressedItem.name}
                                </Text>
                                <Text className="text-sm text-[#C7EAD5]">
                                    Bought on{" "}
                                    {/* {formatDate(pressedItem.created_at)} */}
                                    {pressedItem.created_at}
                                </Text>
                            </View>

                            {/* details */}
                            <View className="items-center">
                                <Text className="text-white text-lg">
                                    Quantity:{" "}
                                    <Text className="font-bold">
                                        {pressedItem.quantity}
                                    </Text>
                                </Text>
                            </View>

                            {/* actions */}
                            <View className="flex-row gap-3">
                                {/* primary */}
                                <Pressable className="flex-1 rounded-full bg-[#14EC5C] py-3">
                                    <Text className="text-black font-bold text-center">
                                        Consume
                                    </Text>
                                </Pressable>

                                {/* destructive */}
                                <Pressable className="flex-1 rounded-full bg-[#8B2C2C] py-3">
                                    <Text className="text-white font-bold text-center">
                                        Throw away
                                    </Text>
                                </Pressable>
                            </View>

                            {/* cancel */}
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Text className="text-center text-[#C7EAD5] font-semibold">
                                    Cancel
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
}

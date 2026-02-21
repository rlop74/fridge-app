import { Modal, View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";

// hooks
import { useModal } from "@/hooks/useModal";
import { useFridgeStore } from "@/hooks/useFridgeItems";

// style
import { modalStyle } from "@/styles/ui";

// types
import { FridgeItem } from "@/types/fridgeTypes"

// api
import { addFridgeItems } from "@/services/fridge/repository"

export const AddItemModal = () => {
    const { addItemModalVisible, setAddItemModalVisible } = useModal(
        (state) => state,
    );
    const { addFridgeItem } = useFridgeStore((state) => state);
    const [newItem, setNewItem] = useState<FridgeItem>({
        name: "",
        quantity: 0,
        createdAt: new Date(),
    });

    return (
        <Modal transparent visible={addItemModalVisible} animationType="fade">
            <View className={`${modalStyle.screen}`}>
                <View className={`${modalStyle.modal}`}>
                    <Text className={`${modalStyle.heading}`}>Add Item</Text>
                    <TextInput
                        className={`${modalStyle.input}`}
                        placeholder="Enter item name..."
                        value={newItem.name}
                        onChangeText={(input) =>
                            setNewItem({
                                ...newItem,
                                name: input,
                            })
                        }
                    />
                    <TextInput
                        className={`${modalStyle.input}`}
                        placeholder="Enter item quantity..."
                        onChangeText={(input) =>
                            setNewItem({
                                ...newItem,
                                quantity: Number(input),
                            })
                        }
                    />

                    {/* buttons */}
                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={() => {
                                addFridgeItem(newItem); // frontend ui update
                                addFridgeItems(newItem); // backend api update
                                setAddItemModalVisible(false);
                            }}
                            className="flex-1"
                        >
                            <Text
                                className={`${modalStyle.button} bg-[#14EC5C] !text-black`}
                            >
                                Add Item
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setAddItemModalVisible(false)}
                            className="flex-1"
                        >
                            <Text
                                className={`${modalStyle.button} bg-[#8B2C2C]`}
                            >
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

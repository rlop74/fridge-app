import { Modal, View, Text, Pressable } from "react-native";

// hooks
import { useModal } from "@/hooks/useModal";
import { FridgeItem } from "@/types/fridgeItem";

// style
import { modalStyle } from "@/styles/ui";

// utils
import { formatDate } from "@/utils/formatDate";

interface Props {
    pressedItem: FridgeItem;
}

export const ItemModal = ({ pressedItem }: Props) => {
    const { itemModalVisible, setItemModalVisible } = useModal(
        (state) => state,
    );

    return (
        <Modal transparent visible={itemModalVisible} animationType="fade">
            {/* overlay */}
            <View className={`${modalStyle.screen}`}>
                {/* modal surface */}
                <View className={`${modalStyle.modal}`}>
                    {/* header */}
                    <View className="items-center gap-1">
                        <Text className="text-2xl font-bold text-white capitalize">
                            {pressedItem.name}
                        </Text>
                        <Text className="text-sm text-[#C7EAD5]">
                            Bought {" "}
                            {/* {pressedItem.createdAt?.toString()} */}
                            {formatDate(
                                pressedItem.createdAt?.toString() || "",
                            ).toLowerCase()}
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
                        <Pressable className="flex-1">
                            <Text
                                className={`${modalStyle.button} bg-[#14EC5C] !text-black`}
                            >
                                Consume
                            </Text>
                        </Pressable>

                        {/* destructive */}
                        <Pressable className="flex-1">
                            <Text
                                className={`${modalStyle.button} bg-[#8B2C2C]`}
                            >
                                Throw away
                            </Text>
                        </Pressable>
                    </View>

                    {/* cancel */}
                    <Pressable onPress={() => setItemModalVisible(false)}>
                        <Text className="text-center text-[#C7EAD5] font-semibold">
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

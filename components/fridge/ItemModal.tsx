import { Modal, View, Text, Pressable } from "react-native";

// hooks
import { useModal } from "@/hooks/useModal";
import { FridgeItem } from "@/types/fridgeTypes";
import { useFridgeStore } from "@/hooks/useFridgeItems";

// style
import { modalStyle } from "@/styles/ui";

// utils
import { formatDate } from "@/utils/formatDate";

// api
import { deleteFridgeItemBackend } from "@/services/fridge/repository";

interface Props {
    pressedItem: FridgeItem;
}

export const ItemModal = ({ pressedItem }: Props) => {
    const { itemModalVisible, setItemModalVisible } = useModal(
        (state) => state,
    );
    const { deleteFridgeItem } = useFridgeStore((state) => state);

    return (
        <Modal transparent visible={itemModalVisible} animationType="slide" >
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
                            Bought {/* {pressedItem.createdAt?.toString()} */}
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
                                className={`${modalStyle.button} bg-[#FFB020] !text-black`}
                            >
                                Throw away
                            </Text>
                        </Pressable>
                    </View>

                    {/* delete don't record */}
                    <Pressable
                        onPress={() => {
                            setItemModalVisible(false);
                            deleteFridgeItem(pressedItem); // delete from frontend ui
                            deleteFridgeItemBackend(pressedItem);
                        }}
                    >
                        <Text className={`${modalStyle.button} bg-[#8B2C2C]`}>
                            Delete Permanently
                        </Text>
                    </Pressable>

                    {/* cancel */}
                    <Pressable onPress={() => setItemModalVisible(false)}>
                        <Text className={`${modalStyle.button} bg-cardBg !text-[#C7EAD5]`}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

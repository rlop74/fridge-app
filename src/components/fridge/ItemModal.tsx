import { Modal, View, Text, Pressable } from 'react-native';

// hooks
import { useModal } from '@/hooks/useModal';
import { FridgeItem } from '@/types/fridgeTypes';
import { useFridgeStore } from '@/hooks/useFridgeItems';

// style
import { GlobalStyles } from '@/constants/styles';

// utils
import { formatDate } from '@/utils/formatDate';

// api
import { deleteFridgeItemBackend } from '@/services/fridge/repository';

interface Props {
  pressedItem: FridgeItem;
}

export const ItemModal = ({ pressedItem }: Props) => {
  const { itemModalVisible, setItemModalVisible } = useModal((state) => state);
  const { deleteFridgeItem } = useFridgeStore((state) => state);

  return (
    <Modal transparent visible={itemModalVisible} animationType="slide">
      {/* overlay */}
      <View>
        {/* modal surface */}
        <View>
          {/* header */}
          <View>
            <Text>{pressedItem.name}</Text>
            <Text>
              Bought
              {formatDate(
                pressedItem.createdAt?.toString() || '',
              ).toLowerCase()}
            </Text>
          </View>

          {/* details */}
          <View>
            <Text>
              Quantity: <Text>{pressedItem.quantity}</Text>
            </Text>
          </View>

          {/* actions */}
          <View>
            {/* primary */}
            <Pressable>
              <Text>Consume</Text>
            </Pressable>

            {/* destructive */}
            <Pressable>
              <Text>Throw away</Text>
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
            <Text>Delete Permanently</Text>
          </Pressable>

          {/* cancel */}
          <Pressable onPress={() => setItemModalVisible(false)}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

import { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useModal } from '@/hooks/useModal';
import { styles } from '@/app/(tabs)/listStyle';
import { formatDate } from '@/utils/formatDate';
import { FridgeItem } from '@/types/fridgeTypes';

type ListItemChildren = {
  item: FridgeItem;
  setPressedItem: Dispatch<SetStateAction<FridgeItem | undefined>>;
  setItemModalVisible: (value: boolean) => void;
};

export const ListItem = ({
  item,
  setPressedItem,
  setItemModalVisible,
}: ListItemChildren) => {
  return (
    <Pressable
      onPress={() => {
        setPressedItem(item);
        setItemModalVisible(true);
      }}
      style={styles.listItem}
    >
      {/* left */}
      <View style={styles.leftSection}>
        <View style={styles.iconBox}>
          <Text>🍽️</Text>
        </View>

        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>Qty: {item.quantityCurrent}</Text>
        </View>
      </View>

      {/* right */}
      <View style={styles.rightSection}>
        <Text style={styles.dateText}>
          {formatDate(item.createdAt)}
          {/* {item.createdAt} */}
        </Text>
      </View>
    </Pressable>
  );
};

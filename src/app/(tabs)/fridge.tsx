import { useState } from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';

// Constants & Types
import { FridgeItem } from '@/types/fridgeTypes';

// Hooks
import { useFridgeStore } from '@/hooks/useFridgeItems';
import { useModal } from '@/hooks/useModal';

// api
import { useAuthContext } from '@/contexts/auth';

// styles and components
import { Header } from '@/components/home/Header';
import { IconButton } from '@/components/IconButton';
import { ItemModal } from '@/components/fridge/ItemModal';
import { AddItemModal } from '@/components/fridge/AddItemModal';
import { styles } from './listStyle';
import { ListItem } from '@/components/ListItem';

export default function FridgeScreen() {
  const [search, setSearch] = useState('');
  const {
    itemModalVisible,
    setItemModalVisible,
    addItemModalVisible,
    setAddItemModalVisible,
  } = useModal((state) => state);
  const [pressedItem, setPressedItem] = useState<FridgeItem>();
  const fridgeItems = useFridgeStore((state) => state.fridgeItems);

  // filter items to show only past two weeks and apply search
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const lowerSearch: string = search.toLowerCase();

  const filteredSearch = fridgeItems.filter((item) => {
    if (!item.createdAt) return false;

    const itemDate = new Date(item.createdAt);

    // only keep items created within the past 14 days
    if (itemDate < twoWeeksAgo) return false;

    return (
      item.name.toLowerCase().includes(lowerSearch) ||
      item.quantityCurrent.toString().includes(lowerSearch) ||
      item.createdAt?.toString().includes(lowerSearch)
    );
  });

  return (
    <>
      <Header
        title="Inventory"
        titleIcon="fridge"
        firstIcon="cart-plus"
        firstOnPress={() => setAddItemModalVisible(!addItemModalVisible)}
      />

      <View style={styles.searchContainer}>
        <IconButton size={20} name="magnify" color="gray" />
        <TextInput
          placeholder="Search items"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.listContainer}>
        <ScrollView>
          {filteredSearch && filteredSearch.length > 0 ? (
            filteredSearch
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((item) => {
                return (
                  <ListItem
                    key={item.id || item.createdAt?.toString()}
                    item={item}
                    setPressedItem={setPressedItem}
                    setItemModalVisible={setItemModalVisible}
                  />
                );
              })
          ) : (
            <View>
              <Text style={styles.noItemsText}>No items yet</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* modals */}
      {addItemModalVisible && (
        <View style={styles.modalOverlay}>
          <AddItemModal />
        </View>
      )}

      {pressedItem && itemModalVisible && (
        <View style={styles.modalOverlay}>
          <ItemModal pressedItem={pressedItem} page="fridge" />
        </View>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Constants & Types
import { FridgeItem } from '@/types/fridgeTypes';

// Hooks
import { useFridgeStore } from '@/hooks/useFridgeItems';
import { useModal } from '@/hooks/useModal';

// api
import { getItemsByUserId } from '@/services/api/items';
import { useAuthContext } from '@/contexts/auth';

// styles and components
import { Header } from '@/components/home/Header';
import { IconButton } from '@/components/IconButton';
import { ItemModal } from '@/components/fridge/ItemModal';
import { AddItemModal } from '@/components/fridge/AddItemModal';
import { styles } from './listStyle';
import { ListItem } from '@/components/ListItem';

export default function HistoryScreen() {
  const { user } = useAuthContext();

  const [search, setSearch] = useState('');
  const { itemModalVisible, setItemModalVisible, addItemModalVisible } =
    useModal((state) => state);
  const [pressedItem, setPressedItem] = useState<FridgeItem>();
  const fridgeItems = useFridgeStore((state) => state.fridgeItems);
  const setFridgeItems = useFridgeStore((state) => state.setFridgeItems);

  useEffect(() => {
    const fetchFridgeItems = async () => {
      try {
        if (!user) {
          setFridgeItems([]);
          return;
        }
        const data = await getItemsByUserId(user.id);
        setFridgeItems(data.items);
      } catch (err: any) {
        console.error('Failed to get Fridge Items: ', err);
        // console.error('error message: ', err.message);
        alert('Something went wrong');
      }
    };

    fetchFridgeItems();
  }, [user]);

  // apply search
  const lowerSearch: string = search.toLowerCase();

  // define cutoff (14 days ago)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const filteredSearch =
    fridgeItems.length > 0 &&
    fridgeItems.filter((item) => {
      if (!item.createdAt) return false;

      const itemDate = new Date(item.createdAt);

      // only keep items older than 14 days
      if (itemDate > twoWeeksAgo) return false;

      // apply search
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.quantityCurrent.toString().includes(lowerSearch) ||
        item.createdAt.toString().includes(lowerSearch)
      );
    });

  return (
    <>
      <Header title="History" titleIcon="fridge" />

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
          <ItemModal pressedItem={pressedItem} page="history" />
        </View>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants & Types
import { FridgeItem } from '@/types/fridgeTypes';

// Hooks
import { useFridgeStore } from '@/hooks/useFridgeItems';
import { useModal } from '@/hooks/useModal';

// api
import { getFridgeItems } from '@/services/fridge/repository';
import { formatDate } from '@/utils/formatDate';
import { getItems } from '@/services/api/items';

// styles and components
import { Header } from '@/components/home/Header';
import { IconButton } from '@/ui/IconButton';
import { ItemModal } from '@/components/fridge/ItemModal';
import { AddItemModal } from '@/components/fridge/AddItemModal';
import { GlobalStyles } from '@/constants/styles';

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
  const setFridgeItems = useFridgeStore((state) => state.setFridgeItems);

  // const formattedDate = formatDate(pressedItem.created_at)

  // apply search
  const lowerSearch: string = search.toLowerCase();
  const filteredSearch =
    fridgeItems.length > 0 &&
    fridgeItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.quantity.toString().includes(lowerSearch) ||
        item.createdAt?.toString().includes(lowerSearch)
      );
    });

  useEffect(() => {
    const fetchFridgeItems = async () => {
      try {
        const data = await getItems();
        console.log(data);
        setFridgeItems(data);
      } catch (err) {
        console.error('Failed to get Fridge Items: ', err);
        alert('Something went wrong');
      }
    };

    fetchFridgeItems();
  }, []);

  return (
    <>
      <Header
        title="Inventory"
        titleIcon="fridge"
        firstIcon="cart-plus"
        firstOnPress={() => setAddItemModalVisible(!addItemModalVisible)}
      />
      {addItemModalVisible && <AddItemModal />}

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
                  <Pressable
                    key={item.id || item.createdAt?.toString()}
                    onPress={() => {
                      setPressedItem(item);
                      setItemModalVisible(true);
                    }}
                    className="mx-3 mb-3 rounded-2xl p-4 flex-row items-center justify-between border-b border-gray-300"
                  >
                    {/* left: identity */}
                    <View className="flex-row gap-3 items-center">
                      {/* icon / placeholder */}
                      <View className="h-14 w-14 rounded-xl bg-cardBg justify-center items-center">
                        <Text className="font-bold">🍽️</Text>
                      </View>

                      {/* text */}
                      <View className="gap-1">
                        <Text>{item.name}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </View>
                    </View>

                    {/* right: metadata */}
                    <View>
                      <Text>
                        {formatDate(item.createdAt?.toString() || '')}
                      </Text>
                    </View>
                  </Pressable>
                );
              })
          ) : (
            <View>
              <Text style={styles.title}>No items yet</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* modal */}
      {pressedItem && <ItemModal pressedItem={pressedItem} />}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    borderColor: GlobalStyles.colors.gray300,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
    marginTop: 24,
  },
});

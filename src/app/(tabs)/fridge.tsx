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

// Constants & Types
import { FridgeItem } from '@/types/fridgeTypes';

// Hooks
import { useFridgeStore } from '@/hooks/useFridgeItems';
import { useModal } from '@/hooks/useModal';

// api
import { getFridgeItems } from '@/services/fridge/repository';
import { formatDate } from '@/utils/formatDate';
import { getItems, getItemsByUserId } from '@/services/api/items';
import { useAuthContext } from '@/contexts/auth';

// styles and components
import { Header } from '@/components/home/Header';
import { IconButton } from '@/components/IconButton';
import { ItemModal } from '@/components/fridge/ItemModal';
import { AddItemModal } from '@/components/fridge/AddItemModal';
import { GlobalStyles } from '@/constants/styles';

export default function FridgeScreen() {
  const { user } = useAuthContext();

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
  const filteredSearch =
    fridgeItems.length > 0 &&
    fridgeItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.quantity.toString().includes(lowerSearch) ||
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
                    style={styles.listItem}
                  >
                    {/* left */}
                    <View style={styles.leftSection}>
                      <View style={styles.iconBox}>
                        <Text>🍽️</Text>
                      </View>

                      <View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemMeta}>
                          Qty: {item.quantity}
                        </Text>
                      </View>
                    </View>

                    {/* right */}
                    <View style={styles.rightSection}>
                      <Text style={styles.dateText}>
                        {formatDate(item.createdAt?.toString() || '')}
                      </Text>
                    </View>
                  </Pressable>
                );
              })
          ) : (
            <View>
              <Text style={styles.noItemsText}>No items yet</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* modal */}
      {pressedItem && itemModalVisible && (
        <View style={styles.modalOverlay}>
          <ItemModal pressedItem={pressedItem} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    borderColor: GlobalStyles.colors.gray300,
  },
  noItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
    marginTop: 24,
    alignSelf: 'center',
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // elevation (Android)
    elevation: 2,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  itemMeta: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  dateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
});

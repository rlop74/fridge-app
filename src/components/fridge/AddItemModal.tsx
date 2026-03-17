import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';

// hooks
import { useModal } from '@/hooks/useModal';
import { useFridgeStore } from '@/hooks/useFridgeItems';

// style
import { GlobalStyles } from '@/constants/styles';

// types
import { FridgeItem } from '@/types/fridgeTypes';

// api
import { addFridgeItems } from '@/services/fridge/repository';

export const AddItemModal = () => {
  const { addItemModalVisible, setAddItemModalVisible } = useModal(
    (state) => state,
  );
  const { addFridgeItem } = useFridgeStore((state) => state);
  const [newItem, setNewItem] = useState<FridgeItem>({
    name: '',
    quantity: 0,
    createdAt: new Date(),
  });

  return (
    <Modal transparent visible={addItemModalVisible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Add Item</Text>
          <TextInput
            style={styles.input}
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
            style={styles.input}
            placeholder="Enter item quantity..."
            onChangeText={(input) =>
              setNewItem({
                ...newItem,
                quantity: Number(input),
              })
            }
          />

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                addFridgeItem(newItem); // frontend ui update
                addFridgeItems(newItem); // backend api update
                setAddItemModalVisible(false);
              }}
            >
              <View style={[styles.button, styles.addButton]}>
                <Text style={styles.buttonText}>Add Item</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => setAddItemModalVisible(false)}>
              <View style={[styles.button, styles.cancelButton]}>
                <Text style={styles.cancelText}>Cancel</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray200,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
  cancelButton: {
    backgroundColor: GlobalStyles.colors.gray300,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
});

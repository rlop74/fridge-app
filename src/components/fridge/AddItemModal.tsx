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
import { useAuthContext } from '@/contexts/auth';

export const AddItemModal = () => {
  const { addItemModalVisible, setAddItemModalVisible } = useModal(
    (state) => state,
  );
  const { addFridgeItem } = useFridgeStore((state) => state);
  const { user } = useAuthContext();

  const getDefaultExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  };

  const [newItem, setNewItem] = useState<FridgeItem>({
    name: '',
    userId: user!.id,
    quantityCurrent: 0,
    createdAt: new Date().toISOString(), // returns UTC <string>
    expiryDate: getDefaultExpiryDate(),
    // expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  });

  return (
    <Modal transparent visible={addItemModalVisible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* handle */}
          <View style={styles.handle} />

          {/* header */}
          <Text style={styles.title}>Add Item</Text>

          {/* inputs */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Item name"
              placeholderTextColor="#9ca3af"
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
              placeholder="Quantity"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              onChangeText={(input) =>
                setNewItem({
                  ...newItem,
                  quantityCurrent: Number(input),
                })
              }
            />
          </View>

          {/* actions */}
          <View style={styles.actions}>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                addFridgeItem(newItem); // update frontend
                addFridgeItems(newItem); // update backend
                setAddItemModalVisible(false);
              }}
            >
              <Text style={styles.primaryText}>Add Item</Text>
            </Pressable>

            <Pressable
              style={styles.cancelBtn}
              onPress={() => setAddItemModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  inputContainer: {
    gap: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actions: {
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: GlobalStyles.colors.primary800,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  cancelBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#6b7280',
    fontWeight: '500',
  },
});

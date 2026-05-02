import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Header } from '@/components/home/Header';

import { EditableReceiptItem, ParsedReceiptItem } from '@/types/receiptTypes';
import { FridgeItem } from '@/types/fridgeTypes';

import { useAuthContext } from '@/contexts/auth';
import { useFridgeStore } from '@/hooks/useFridgeItems';
import { scanReceiptImage } from '@/services/receipts/repository';

const createEditableReceiptItems = (
  items: ParsedReceiptItem[],
): EditableReceiptItem[] => {
  return items.map((item, index) => ({
    ...item,
    localId: `${Date.now()}-${index}`,
    selected: true,
  }));
};

export default function CameraScreen() {
  const [receiptImageUri, setReceiptImageUri] = useState<string | null>(null);
  const [reviewItems, setReviewItems] = useState<EditableReceiptItem[]>([]);
  const { user } = useAuthContext();
  const addFridgeItem = useFridgeStore((state) => state.addFridgeItem);
  const [isScanning, setIsScanning] = useState(false);

  const updateReviewItem = (
    localId: string,
    changes: Partial<EditableReceiptItem>,
  ) => {
    setReviewItems((currentItems) =>
      currentItems.map((item) =>
        item.localId === localId ? { ...item, ...changes } : item,
      ),
    );
  };

  const removeReviewItem = (localId: string) => {
    setReviewItems((currentItems) =>
      currentItems.filter((item) => item.localId !== localId),
    );
  };

  const saveSelectedItemsToFridge = () => {
    if (!user) {
      Alert.alert(
        'Login required',
        'Please log in before saving fridge items.',
      );
      return;
    }

    const selectedItems = reviewItems.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Select at least one item to save.');
      return;
    }

    selectedItems.forEach((item, index) => {
      const fridgeItem: FridgeItem = {
        userId: user.id,
        name: item.name.trim(),
        quantityCurrent: item.quantityPurchased,
        createdAt: new Date(Date.now() + index).toISOString(),
        expiryDate: getDefaultExpiryDate(),
      };

      addFridgeItem(fridgeItem);
    });

    setReviewItems([]);
    Alert.alert('Saved', 'Selected items were added to your fridge.');
  };

  const getDefaultExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  };

  const scanSelectedReceipt = async () => {
    if (!receiptImageUri) {
      Alert.alert('No receipt image', 'Take or upload a receipt image first.');
      return;
    }

    try {
      setIsScanning(true);

      const result = await scanReceiptImage(receiptImageUri);
      setReviewItems(createEditableReceiptItems(result.items));
    } catch (error) {
      console.error('Failed to scan receipt:', error);
      Alert.alert(
        'Scan failed',
        'Something went wrong while scanning the receipt.',
      );
    } finally {
      setIsScanning(false);
    }
  };

  const takeReceiptPhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Camera permission needed',
          'Please allow camera access to scan receipts.',
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled) {
        setReceiptImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Failed to open camera: ', error);

      Alert.alert(
        'Camera unavailable',
        'The simulator does not have a camera. Use Upload Receipt Image in the simulator, or test the camera on a physical device.',
      );
    }
  };

  const pickReceiptImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Photo permission needed',
        'Please allow photo access to upload receipts.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setReceiptImageUri(result.assets[0].uri);
    }
  };

  return (
    <>
      <Header title="Camera" titleIcon="camera" />

      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={takeReceiptPhoto}>
            <Text style={styles.buttonText}>Take Receipt Photo</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={pickReceiptImage}>
            <Text style={styles.secondaryButtonText}>Upload Receipt Image</Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              (!receiptImageUri || isScanning) && styles.disabledButton,
            ]}
            disabled={!receiptImageUri || isScanning}
            onPress={scanSelectedReceipt}
          >
            <Text style={styles.buttonText}>
              {isScanning ? 'Scanning...' : 'Scan Receipt'}
            </Text>
          </Pressable>
        </View>

        {receiptImageUri && (
          <Image source={{ uri: receiptImageUri }} style={styles.preview} />
        )}
        {reviewItems.length > 0 && (
          <View style={styles.reviewSection}>
            <Text style={styles.reviewTitle}>Review Items</Text>

            <View style={styles.reviewList}>
              {reviewItems.map((item) => (
                <View key={item.localId} style={styles.reviewRow}>
                  <Switch
                    value={item.selected}
                    onValueChange={(selected) =>
                      updateReviewItem(item.localId, { selected })
                    }
                  />

                  <View style={styles.reviewInputs}>
                    <TextInput
                      style={styles.itemNameInput}
                      value={item.name}
                      onChangeText={(name) =>
                        updateReviewItem(item.localId, { name })
                      }
                      placeholder="Item name"
                    />

                    <View style={styles.itemMetaRow}>
                      <TextInput
                        style={styles.quantityInput}
                        value={String(item.quantityPurchased)}
                        keyboardType="numeric"
                        onChangeText={(input) =>
                          updateReviewItem(item.localId, {
                            quantityPurchased: Number(input),
                          })
                        }
                      />

                      <Text style={styles.itemTypeText}>
                        {item.itemTypeName}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeReviewItem(item.localId)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              ))}
            </View>

            <Pressable
              style={styles.button}
              onPress={saveSelectedItemsToFridge}
            >
              <Text style={styles.buttonText}>Save Selected Items</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // page layout
  screenScroll: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 20,
    paddingBottom: 40,
  },
  actions: {
    gap: 12,
  },
  button: {
    backgroundColor: '#166534',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#166534',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#166534',
    fontWeight: '700',
  },
  preview: {
    width: '100%',
    height: 420,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: '#f3f4f6',
  },

  // fridge items
  reviewSection: {
    gap: 12,
  },
  reviewList: {
    gap: 8,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  reviewInputs: {
    flex: 1,
    gap: 8,
  },
  itemNameInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityInput: {
    width: 64,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  itemTypeText: {
    color: '#4b5563',
    fontWeight: '600',
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  removeButtonText: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

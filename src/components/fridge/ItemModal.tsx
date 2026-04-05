import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

// hooks
import { useModal } from '@/hooks/useModal';
import { FridgeItem } from '@/types/fridgeTypes';
import { useFridgeStore } from '@/hooks/useFridgeItems';

// utils
import { formatDate } from '@/utils/formatDate';

// api
import { deleteFridgeItemBackend } from '@/services/fridge/repository';
import { GlobalStyles } from '@/constants/styles';

interface Props {
  pressedItem: FridgeItem;
}

export const ItemModal = ({ pressedItem }: Props) => {
  const { itemModalVisible, setItemModalVisible } = useModal((state) => state);
  const { deleteFridgeItem } = useFridgeStore((state) => state);

  return (
    <Modal transparent visible={itemModalVisible} animationType="slide">
      {/* overlay */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* sheet */}
        <View style={styles.sheet}>
          {/* handle */}
          <View style={styles.handle} />

          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title}>{pressedItem.name}</Text>
            <Text style={styles.subtitle}>
              Bought{' '}
              {formatDate(
                pressedItem.createdAt?.toString() || '',
              ).toLowerCase()}
            </Text>
          </View>

          {/* details */}
          <View style={styles.details}>
            <Text style={styles.detailText}>
              Quantity: <Text style={styles.bold}>{pressedItem.quantityCurrent}</Text>
            </Text>
          </View>

          {/* actions */}
          <View style={styles.actions}>
            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryText}>Consume</Text>
            </Pressable>

            <Pressable style={styles.secondaryBtn}>
              <Text style={styles.secondaryText}>Throw away</Text>
            </Pressable>
          </View>

          {/* destructive */}
          <Pressable
            style={styles.deleteBtn}
            onPress={() => {
              setItemModalVisible(false);
              deleteFridgeItem(pressedItem);
              deleteFridgeItemBackend(pressedItem);
            }}
          >
            <Text style={styles.deleteText}>Delete Permanently</Text>
          </Pressable>

          {/* cancel */}
          <Pressable
            style={styles.cancelBtn}
            onPress={() => setItemModalVisible(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: GlobalStyles.colors.background,
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  details: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 15,
    color: '#374151',
  },
  bold: {
    fontWeight: '600',
    color: '#111827',
  },
  actions: {
    gap: 10,
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#111827',
    fontWeight: '500',
  },
  deleteBtn: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  cancelBtn: {
    marginTop: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#6b7280',
  },
});

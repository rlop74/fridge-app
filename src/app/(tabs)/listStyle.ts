import { StyleSheet } from 'react-native';
import { GlobalStyles } from '@/constants/styles';

export const styles = StyleSheet.create({
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

import { create } from 'zustand';

import { FridgeItem, FridgeStore } from '@/types/fridgeTypes';

export const useFridgeStore = create<FridgeStore>((set) => ({
  fridgeItems: [],
  usedFridgeItems: [],
  setFridgeItems: (items) =>
    set(() => ({
      fridgeItems: items,
    })),
  setUsedFridgeItems: (items) =>
    set(() => ({
      usedFridgeItems: items,
    })),
  addFridgeItem: (item) =>
    set((state) => ({
      fridgeItems: [...state.fridgeItems, item],
    })),
  deleteFridgeItem: (item) =>
    set((state) => ({
      fridgeItems: state.fridgeItems.filter(
        (fridgeItem) => fridgeItem.id !== item.id,
      ),
    })),
}));

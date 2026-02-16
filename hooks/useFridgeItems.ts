import { create } from "zustand";

import { FridgeStore } from "@/types/fridgeItem";

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
}));

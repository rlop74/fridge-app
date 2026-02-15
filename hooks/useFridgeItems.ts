import { create } from "zustand";

export interface FridgeItem {
    id: number;
    name: string;
    quantity: number;
    createdAt: string;
}

export interface UsedFridgeItem {
    id: number;
    name: string;
    quantity: number;
    createdAt: string;
    reason: string;
}

type FridgeStore = {
    fridgeItems: FridgeItem[];
    usedFridgeItems: UsedFridgeItem[];
    setFridgeItems: (items: FridgeItem[]) => void;
    setUsedFridgeItems: (items: UsedFridgeItem[]) => void;
    addFridgeItem: (item: FridgeItem) => void;
};

export const useFridgeStore = create<FridgeStore>((set) => ({
    fridgeItems: [],
    usedFridgeItems: [],
    setFridgeItems: (items: FridgeItem[]) =>
        set(() => ({
            fridgeItems: items,
        })),
    setUsedFridgeItems: (items: UsedFridgeItem[]) =>
        set(() => ({
            usedFridgeItems: items,
        })),
    addFridgeItem: (item: FridgeItem) =>
        set((state) => ({
            fridgeItems: [...state.fridgeItems, item],
        })),
}));

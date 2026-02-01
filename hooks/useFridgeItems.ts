import { create } from "zustand";

interface FridgeItem {
    id: number;
    name: string;
    quantity: number;
    createdAt: string;
}

type FridgeStore = {
    fridgeItems: FridgeItem[];
    setFridgeItems: (items: FridgeItem[]) => void;
    addFridgeItem: (item: FridgeItem) => void;
};

export const useFridgeStore = create<FridgeStore>((set) => ({
    fridgeItems: [],
    setFridgeItems: (items: FridgeItem[]) =>
        set(() => ({
            fridgeItems: items,
        })),
    addFridgeItem: (item: FridgeItem) =>
        set((state) => ({
            fridgeItems: [...state.fridgeItems, item],
        })),
}));

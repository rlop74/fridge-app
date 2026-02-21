export interface FridgeItem {
    id?: number;
    name: string;
    quantity: number;
    createdAt?: Date;
}

export interface UsedFridgeItem {
    id: number;
    name: string;
    quantity: number;
    createdAt: string;
    reason: string;
}

export type FridgeStore = {
    fridgeItems: FridgeItem[];
    usedFridgeItems: UsedFridgeItem[];
    setFridgeItems: (items: FridgeItem[]) => void;
    setUsedFridgeItems: (items: UsedFridgeItem[]) => void;
    addFridgeItem: (item: FridgeItem) => void;
    deleteFridgeItem: (item: FridgeItem) => void;
};
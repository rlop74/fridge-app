import { create } from "zustand";

type ModalStore = {
    itemModalVisible: boolean;
    addItemModalVisible: boolean;
    setItemModalVisible: (bool: boolean) => void;
    setAddItemModalVisible: (bool: boolean) => void;
};

export const useModal = create<ModalStore>((set) => ({
    itemModalVisible: false,
    addItemModalVisible: false,
    setItemModalVisible: (bool) =>
        set(() => ({
            itemModalVisible: bool,
        })),
    setAddItemModalVisible: (bool) =>
        set(() => ({
            addItemModalVisible: bool,
        }))
}));

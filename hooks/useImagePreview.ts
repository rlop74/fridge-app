import { create } from "zustand";

type ImagePreviewStore = {
    imagePreview: string;
    setImagePreview: (path: string) => void;
};

export const useImagePreviewStore = create<ImagePreviewStore>((set) => ({
    imagePreview: "",
    setImagePreview: (path) =>
        set(() => ({
            imagePreview: path,
        })),
}));

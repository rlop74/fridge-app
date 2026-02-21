import client from "../api/client";

// types
import { FridgeItem } from "@/types/fridgeTypes";

export const getFridgeItems = async () => {
    try {
        const { data } = await client.get("/items");
        return data;
    } catch (err) {
        console.error("Failed to get Fridge Items", err);
        alert("Something went wrong");
    }
};

export const getUsedFridgeItems = async () => {
    try {
        const { data } = await client.get("/used-fridge-items");
        return data;
    } catch (err) {
        console.error("Failed to get Used Fridge Items: ", err);
        alert("Something went wrong");
    }
};

export const addFridgeItems = async (newItem: FridgeItem) => {
    try {
        await client.post("/items", newItem);
    } catch (err) {
        console.error("Failed to add new item: ", err);
        alert("Something went wrong");
    }
};

export const deleteFridgeItemBackend = async (pressedItem: FridgeItem) => {
    try {
        await client.delete(`/items/${pressedItem.id}`);
    } catch (err) {
        console.error("Failed to delete item: ", err);
        alert("Something went wrong");
    }
};

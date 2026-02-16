import client from "../api/client";

// types
import { FridgeItem } from "@/types/fridgeItem"

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
}
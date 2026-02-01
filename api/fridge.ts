import axios from "axios";

interface FridgeItem {
    id: number;
    name: string;
    quantity: number;
    created_at: string;
}

// continue working on converting this to typescript

export const getFridgeItems = async () => {
    try {
        const { data } = await axios.get(
            "http://127.0.0.1:3000/",
        );
        return data;
    } catch (err) {
        console.error("Failed to get Fridge Items", err);
        alert("Something went wrong");
    }
};

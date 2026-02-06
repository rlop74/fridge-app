import axios from "axios";

export const getFridgeItems = async () => {
    try {
        const { data } = await axios.get("http://127.0.0.1:3000/fridge-items");
        return data;
    } catch (err) {
        console.error("Failed to get Fridge Items", err);
        alert("Something went wrong");
    }
};

export const getUsedFridgeItems = async () => {
    try {
        const { data } = await axios.get("http://127.0.0.1:3000/used-fridge-items");
        return data;
    } catch (err) {
        console.error("Failed to get Used Fridge Items: ", err);
        alert("Something went wrong");
    }
};

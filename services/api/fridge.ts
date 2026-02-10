import client from './client'

export const getFridgeItems = async () => {
    try {
        const { data } = await client.get("/fridge-items");
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

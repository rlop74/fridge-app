import axios from "axios";

export const getFridgeItems = async () => {
    try {
        const { data } = await axios.get("http://127.0.0.1:3000/");
        return data;
    } catch (err) {
        console.error("Failed to get Fridge Items", err);
        alert("Something went wrong");
    }
};

// export const fridgeItems = [
//         {
//             id: 1,
//             name: "carrots",
//             quantity: 2,
//             type: "vegetable",
//         },
//         {
//             id: 2,
//             name: "chicken",
//             quantity: 4,
//             type: "meat",
//         },
//         {
//             id: 3,
//             name: "sprite zero",
//             quantity: 3,
//             type: "drink",
//         },
//         {
//             id: 4,
//             name: "apples",
//             quantity: 2,
//             type: "fruit",
//         },
//         {
//             id: 5,
//             name: "ground beef",
//             quantity: 4,
//             type: "meat",
//         },
//         {
//             id: 6,
//             name: "ground pork",
//             quantity: 3,
//             type: "meat",
//         },
//         {
//             id: 7,
//             name: "cabbage",
//             quantity: 2,
//             type: "vegetable",
//         },
//         {
//             id: 8,
//             name: "ribeye",
//             quantity: 4,
//             type: "meat",
//         },
//         {
//             id: 9,
//             name: "coke zero",
//             quantity: 3,
//             type: "drink",
//         },
//     ];
import client from './client'

// export const processImage = async (path: string) => {
//     try {
//         await axios.post("http://192.168.74.166:3000/scan-photo", path);
//     } catch (err) {
//         console.error("Failed to push image preview: ", err);
//         alert("Something went wrong");
//     }
// };

export const processImage = async (uri: string) => {
    const formData = new FormData();

    formData.append("image", {
        uri,
        name: "receipt.jpg",
        type: "image/jpeg",
    } as any);

    const result = await fetch("http://192.168.74.166:3000/scan-photo", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    return result;
};

import { IconSymbol } from "@/components/ui/iconSymbol";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
    Button,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// hooks
import { useImagePreviewStore } from "../../hooks/useImagePreview";

// api
import { processImage } from "@/services/receipts/repository";

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const imagePreview = useImagePreviewStore((state) => state.imagePreview);
    const setImagePreview = useImagePreviewStore(
        (state) => state.setImagePreview,
    );
    const cameraRef = useRef<CameraView | null>(null);

    // Camera permissions are still loading.
    if (!permission) return <View />;

    // Camera permissions are not granted yet.
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo.uri); // Path to the taken picture

            setImagePreview(photo.uri);

            // process image on backend
            const text = processImage(photo.uri);
            console.log(text);
        }
    };

    return (
        <View style={styles.container}>
            {/* image preview */}
            {imagePreview ? (
                <View>
                    <Image
                        source={{ uri: imagePreview }}
                        className="w-40 h-40 rounded-xl h-screen w-screen"
                    />
                    <Pressable
                        onPress={() => setImagePreview("")}
                        style={styles.xButton}
                    >
                        <IconSymbol size={24} name="xmark" color="white" />
                    </Pressable>
                </View>
            ) : (
                ""
            )}

            {/* camera */}
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

            {/* buttons */}
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={takePicture}
                >
                    {/* <Text style={styles.text}>Snap</Text> */}
                    <IconSymbol
                        size={80}
                        name="camera.circle.fill"
                        color="white"
                    />
                </TouchableOpacity>
                <View style={styles.flipButtonContainer}>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={toggleCameraFacing}
                    >
                        {/* <Text style={styles.text}>Flip Camera</Text> */}
                        <IconSymbol
                            size={40}
                            name="camera.rotate.fill"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    cameraButtonContainer: {
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    cameraButton: {
        flex: 1,
        alignItems: "center",
    },
    flipButtonContainer: {
        flex: 1,
        position: "absolute",
        right: 30,
    },
    flipButton: {
        flex: 1,
    },
    xButton: {
        flex: 1,
        position: "absolute",
        top: 100,
        right: 25,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});

//   buttonContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 64 },
//   button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'white' },
//   text: { fontSize: 24, fontWeight: 'bold', color: 'black' },

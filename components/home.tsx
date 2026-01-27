import { Pressable, Text, Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Constants & Types

// Hooks

export default function Home() {
    const onPressFunction = () => {
        alert("search button has been pressed");
    };

    return (
        <SafeAreaProvider className={``}>
            <View className="flex">
                <Image
                    className="h-10 w-10 rounded-xl border border-green-700"
                    source={{
                        uri: "https://media.licdn.com/dms/image/v2/D4E03AQGy1OWBIfOy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691031045223?e=1770854400&v=beta&t=UuksQybvmXBAE0idRQ6-VJMul-9OMHmnvQrjCaMvJ4I",
                    }}
                />
                <Text>Title</Text>
                <Pressable onPress={onPressFunction}>
                    <Text>Search</Text>
                </Pressable>
            </View>
            <Text>Hello, Alex</Text>
            <Text>You have....</Text>
        </SafeAreaProvider>
    );
}

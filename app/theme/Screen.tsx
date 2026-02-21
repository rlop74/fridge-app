import { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

interface ScreenProps {
    children: ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
    const { colors } = useTheme();
    const { height } = Dimensions.get("window");

    return (
        <SafeAreaView
            style={{
                // flex: 1,
                backgroundColor: colors.background,
                height
            }}
        >
            {children}
        </SafeAreaView>
    );
};

import { Text, TextProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";

interface ThemedTextProps extends TextProps {
    // `extends` makes sure ThemedText supports everything Text supports
    children: ReactNode;
}

export const ThemedText = ({ children, style, ...props }: ThemedTextProps) => {
    const { colors } = useTheme();

    return (
        <Text style={[{ color: colors.text }, style]} {...props}>
            {children}
        </Text>
    );
};

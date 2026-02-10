// Fallback for using MaterialIcons on Android and web.

import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";

// --- Types ---

// type IconMapping = Record<
//     SymbolViewProps["name"],
//     ComponentProps<typeof MaterialIcons>["name"]
// >;
type IconSymbolName = keyof typeof MAPPING;

// --- Mappings ---

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 *      - https://github.com/andrewtavis/sf-symbols-online
 */
const MAPPING = {
    "house.fill": "home",
    "archivebox.fill": "kitchen",
    "camera.fill": "camera-alt",
    "magnifyingglass": "search",
    "bell.fill": "notifications",
    "exclamationmark.triangle.fill": "warning",
    "refrigerator.fill": "kitchen",
    "camera.viewfinder": "camera-alt",
    "camera.circle.fill": "camera",
    "camera.rotate.fill": "cameraswitch",
    "clock.fill": "delete",
    "xmark": "close"
// } as IconMapping;
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
    name,
    size = 24,
    color,
    style,
}: {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: SymbolWeight;
}) {
    return (
        <MaterialIcons
            color={color}
            size={size}
            name={MAPPING[name]}
            style={style}
        />
    );
}

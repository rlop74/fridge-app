import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// constants
import { GlobalStyles } from '@/constants/styles';
import { IconButton } from '@/ui/IconButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: GlobalStyles.colors.primary800 }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fridge" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

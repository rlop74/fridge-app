import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '@/ui/IconButton';
import { GlobalStyles } from '@/constants/styles';

export const StatCard = ({
  iconName,
  iconColor,
  iconSize,
  label,
  value,
}: any) => {
  return (
    <View style={styles.statCard}>
      <IconButton size={iconSize} name={iconName} color={iconColor} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 14,
    padding: 16,
    gap: 6,

    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  statLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.primary200,
    fontWeight: '600',
  },

  statValue: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
});

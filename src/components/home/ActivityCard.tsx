import { View, Pressable, Text, Image, StyleSheet } from 'react-native';
import { IconButton } from '@/components/IconButton';
import { GlobalStyles } from '@/constants/styles';
import { StatCard } from '@/components/home/StatCard';
import { useRouter } from 'expo-router';
import { FridgeItem } from '@/types/fridgeTypes';

type Props = {
  potentiallyExpiredItems: FridgeItem[];
  fridgePercentage: number | string;
};

export const Cards = ({ potentiallyExpiredItems, fridgePercentage }: Props) => {
  const router = useRouter();

  const handleViewList = () => {
    router.navigate('/(tabs)/fridge');
  };

  return (
    <View style={styles.container}>
      {/* BIG CARD */}
      <View style={styles.bigCard}>
        <Image
          source={{
            uri: 'https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg',
          }}
          style={styles.image}
        />

        <View style={styles.cardContent}>
          {/* Top row */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.recentActivity}>RECENT ACTIVITY</Text>
              <Text style={styles.title}>Last Grocery Trip</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>RECEIPT SCANNED</Text>
            </View>
          </View>

          {/* Bottom row */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.meta}>Oct 24th • 32 items added</Text>
              <Text style={styles.metaSecondary}>
                Top categories: Produce, Dairy, Proteins
              </Text>
            </View>

            <Pressable style={styles.button} onPress={handleViewList}>
              <Text style={styles.buttonText}>View List</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* SMALL CARDS */}
      <View style={styles.smallCardsContainer}>
        <StatCard
          iconName="fridge"
          iconColor={GlobalStyles.colors.accentGreen}
          iconSize={22}
          label="FRIDGE FULL"
          value={`${fridgePercentage}% Full`}
        />

        <StatCard
          iconName="alert"
          iconColor={GlobalStyles.colors.accent500}
          iconSize={22}
          label="NEAR EXPIRY"
          value={
            potentiallyExpiredItems.length > 1
              ? `${potentiallyExpiredItems.length} items`
              : `${potentiallyExpiredItems.length} item`
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    gap: 16,
  },

  bigCard: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 16,
    overflow: 'hidden',

    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: '100%',
    height: 170,
  },

  cardContent: {
    padding: 16,
    gap: 14,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  recentActivity: {
    fontSize: 12,
    color: '#3ed598',
    letterSpacing: 1,
    fontWeight: '600',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },

  meta: {
    color: '#cfd6d3',
    fontSize: 13,
  },

  metaSecondary: {
    color: '#9da8a2',
    fontSize: 13,
  },

  badge: {
    backgroundColor: GlobalStyles.colors.primary700,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  badgeText: {
    color: GlobalStyles.colors.accentGreen,
    fontSize: 11,
    fontWeight: '600',
  },

  button: {
    backgroundColor: GlobalStyles.colors.accentGreen,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: 'black',
    fontWeight: '600',
  },

  smallCardsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});

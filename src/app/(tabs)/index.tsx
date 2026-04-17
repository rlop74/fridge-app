import { View, ScrollView, Text, StyleSheet } from 'react-native';

// components
import { Header } from '@/components/home/Header';
import { Cards } from '@/components/home/ActivityCard';
import { RecipeSuggestions } from '@/components/home/RecipeSuggestions';
import { GlobalStyles } from '@/constants/styles';
import { Redirect } from 'expo-router';
import { useAuthContext } from '@/contexts/auth';
import { useFridgeStore } from '@/hooks/useFridgeItems';
import { useEffect } from 'react';
import { getItemsByUserId } from '@/services/api/items';

export default function HomeScreen() {
  const { session, logout, isLoading, user } = useAuthContext();
  const { fridgeItems, setFridgeItems } = useFridgeStore((state) => state);

  console.log(session);

  // return null if context isLoading, isLoading is set under the hood by setSession in the AuthContextProvider
  if (isLoading) {
    return null;
  }

  // redirect to login.tsx if no session exists
  if (!session) {
    return <Redirect href="/welcome" />;
  }

  const handleSearch = () => {
    alert('Search button has been pressed');
  };

  const handleLogout = () => {
    logout();
  };

  // get total expired items
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const potentiallyExpiredItems = fridgeItems.filter(
    (item) => new Date(item.createdAt) < twoWeeksAgo,
  );

  // get fridge percentage
  const fridgePercentage = (fridgeItems.length / 50) * 100;

  useEffect(() => {
    const fetchFridgeItems = async () => {
      try {
        if (!user) {
          setFridgeItems([]);
          return;
        }
        const data = await getItemsByUserId(user.id);
        setFridgeItems(data.items);
      } catch (err: any) {
        console.error('Failed to get Fridge Items: ', err);
        // console.error('error message: ', err.message);
        alert('Something went wrong');
      }
    };

    fetchFridgeItems();
  }, [user]);

  return (
    <>
      <Header
        title="Fridgely"
        titleIcon="fridge"
        firstIcon="magnify"
        secondIcon="logout"
        firstOnPress={handleSearch}
        secondOnPress={handleLogout}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryContainer}>
          <Text style={styles.userGreeting}>Hello, {user?.firstName}! 👋🏽</Text>
          <Text>
            You have{' '}
            <Text
              style={{
                fontWeight: 'bold',
                color: GlobalStyles.colors.primary500,
              }}
            >
              {potentiallyExpiredItems.length > 1
                ? `${potentiallyExpiredItems.length} items`
                : `${potentiallyExpiredItems.length} item`}
            </Text>{' '}
            {/* expiring in the next 48 hours. */}
            that is potentially expired.
          </Text>
        </View>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Cards
              potentiallyExpiredItems={potentiallyExpiredItems}
              fridgePercentage={fridgePercentage}
            />
            <RecipeSuggestions />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    margin: 8,
  },
  userGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

import { View, ScrollView, Text, StyleSheet } from 'react-native';

// components
import { Header } from '@/components/home/Header';
import { Cards } from '@/components/home/ActivityCard';
import { RecipeSuggestions } from '@/components/home/RecipeSuggestions';
import { GlobalStyles } from '@/constants/styles';
import { Redirect } from 'expo-router';
import { useAuthContext } from '@/contexts/auth';

export default function HomeScreen() {
  const { session, logout, isLoading, user } = useAuthContext();

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
              74 items
            </Text>{' '}
            expiring in the next 48 hours.
          </Text>
        </View>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Cards />
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
    textTransform: 'capitalize'
  },
});

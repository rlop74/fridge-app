import { GlobalStyles } from '@/constants/styles';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

export const RecipeSuggestions = () => {
  const handleSeeAll = () => {
    alert('See All has been pressed');
  };

  const recipes = [
    {
      id: 1,
      name: 'adobo',
      img: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2024-04-filipino-adobo%2Ffilipino-adobo-426',
    },
    {
      id: 2,
      name: 'sisig',
      img: 'https://i0.wp.com/www.Iankewks.com/wp-content/uploads/2023/02/IMG_7014.jpg?resize=800%2C1054&ssl=1',
    },
    {
      id: 3,
      name: 'beef steak',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQit_dekQRDnDVxNOA4urGUPG0A3qWyEUi_kYjj_7142NPQyNlTeWcaw7MFuRga5vkG8ZdSc-SCbtuVGrFXqsWMDT-HKe105isVZKxZ_2Kl&s=10',
    },
  ];

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Suggested for You</Text>
        <Pressable>
          <Pressable onPress={handleSeeAll}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {recipes.map((recipe) => {
          return (
            <Pressable key={recipe.id}>
              <View style={styles.recipeContainer}>
                <Image
                  source={{ uri: recipe.img }}
                  style={styles.recipeImage}
                />
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
                {/* <IconSymbol
                      size={24}
                      name="heart.fill"
                      color="white"
                      className=""
                  /> */}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontWeight: 'bold',
    // color: GlobalStyles.colors.accentGreen,
    color: GlobalStyles.colors.primary500,
  },
  recipeContainer: {
    height: 200,
    width: 200,
    margin: 8,
    borderRadius: 8,
    borderWidth: 8,
    borderColor: GlobalStyles.colors.primary800,
  },
  recipeImage: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  recipeTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 8,
    borderTopRightRadius: 8,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

import { Text, View, Image, Pressable, StyleSheet } from 'react-native';

// icons
import { IconButton } from '@/components/IconButton';
import { useState } from 'react';

// style
import { GlobalStyles } from '@/constants/styles';

export const Header = ({
  title,
  titleIcon,
  firstIcon,
  secondIcon,
  firstOnPress,
  secondOnPress,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleIcon}>
          <IconButton
            name={titleIcon}
            size={24}
            color={GlobalStyles.colors.primary500}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View>
          <IconButton
            size={30}
            name={firstIcon}
            color={GlobalStyles.colors.gray700}
            onPress={firstOnPress}
          />
        </View>
        {secondIcon && (
          <View>
            <IconButton
              size={30}
              name={secondIcon}
              color={GlobalStyles.colors.gray700}
              onPress={secondOnPress}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    paddingHorizontal: 8,
    // paddingBottom: 4,
    marginTop: 48,
    marginBottom: 8,
  },
  titleIcon: {
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

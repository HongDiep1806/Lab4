import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';

import ContactThum from './ContactThum';
const keyExtractor = ({ phone }) => phone;
const Favorites = ({ navigation }) => {
  const contacts = useSelector(state => state.contacts);
  const favorites = useSelector(state => state.favorites);

  const renderFavoriteThumnail = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThum
        avatar={avatar}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };
const favoriteContacts = (contacts || []).filter(contact =>
  (favorites || []).includes(contact.id)
);  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteContacts}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={renderFavoriteThumnail}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});
export default Favorites;

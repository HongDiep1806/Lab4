import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import ContactThum from './ContactThum';
import { getContacts, getFavorites } from './AsyncStorageHelper'; // ✅ thay Redux bằng AsyncStorage

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // 🔹 Lấy dữ liệu từ AsyncStorage khi mở màn hình
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedContacts = await getContacts();
        const storedFavorites = await getFavorites();

        console.log('Loaded favorites:', storedFavorites.length);
        setContacts(storedContacts);
        setFavorites(storedFavorites);
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    loadData();

    // Cập nhật mỗi lần quay lại tab
    return unsubscribe;
  }, [navigation]);

  // 🔹 Lọc ra các contact nằm trong danh sách yêu thích
  const favoriteContacts = contacts.filter(contact =>
    favorites.includes(contact.id),
  );

  // 🔹 Hiển thị từng avatar trong danh sách yêu thích
  const renderFavoriteThumbnail = ({ item }) => {
    return (
      <ContactThum
        avatar={item.avatar}
        name={item.name}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
        showName={false}
        showPhone={false} 
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteContacts}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={renderFavoriteThumbnail}
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

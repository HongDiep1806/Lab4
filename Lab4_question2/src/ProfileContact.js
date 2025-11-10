import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import ContactThum from './ContactThum';
import DetailListIt from './DetailListItem';
import { getFavorites, toggleFavorite } from './AsyncStorageHelper'; // ✅ thay Redux bằng AsyncStorage

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const { id, avatar, name, email, phone, cell } = contact;

  const [isFavorite, setIsFavorite] = useState(false);

  // 🔹 Khi mở màn hình, kiểm tra xem contact này có nằm trong favorites không
  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await getFavorites();
      setIsFavorite(favorites.includes(id));
    };
    checkFavorite();
  }, [id]);

  // 🔹 Khi bấm nút “Add/Remove Favorite”
  const handleFavoritePress = async () => {
    const updatedFavorites = await toggleFavorite(id);
    setIsFavorite(updatedFavorites.includes(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>

      <View style={styles.detailsSection}>
        <DetailListIt icon="email" title="Email" subtitle={email} />
        <DetailListIt icon="phone" title="Work" subtitle={phone} />
        <DetailListIt icon="cellphone" title="Personal" subtitle={cell} />

        <View style={styles.favoriteSection}>
          <IconButton
            icon={isFavorite ? 'star-check' : 'star-check-outline'}
            iconColor={isFavorite ? '#FFD700' : '#663399'}
            size={30}
            onPress={handleFavoritePress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  favoriteSection: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ProfileContact;

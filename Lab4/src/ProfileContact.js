import { StyleSheet, View } from 'react-native';
import ContactThum from './ContactThum';
import DetailListIt from './DetailListItem';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // optional nếu bạn dùng icon khác
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorite } from './Store';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const { id, avatar, name, email, phone, cell } = contact;

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.includes(id);

  const handleFavoritePress = () => {
    dispatch(updateFavorite(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>

      <View style={styles.detailsSection}>
        <DetailListIt icon="mail" title="Email" subtitle={email} />
        <DetailListIt icon="phone" title="Work" subtitle={phone} />
        <DetailListIt icon="cellphone-basic" title="Personal" subtitle={cell} />

        <View>
          <IconButton
            icon={isFavorite ? 'star-check' : 'star-check-outline'}
            iconColor={isFavorite ? '#FFD700' : '#663399'}
            size={24}
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
  },
});

export default ProfileContact;

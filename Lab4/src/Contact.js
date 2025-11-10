import { fetchContactSuccess, mapContacts } from './Store';
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ContactListItem from './ContactListItem';
const keyExtractor = ({ phone }) => phone;
// const fetchContacts = async () => {
//   const data = await fetch('https://randomuser.me/api/?results=50');
//   const ContactData = await data.json();
//   return ContactData.results.map(mapContacts);
// };
const fetchContacts = async () => {
  try {
    console.log('Starting fetch...');
    const res = await fetch('https://randomuser.me/api/?results=50');
    console.log('Response status:', res.status);

    const data = await res.json();
    console.log('Got data:', data);

    if (!data.results) {
      console.log('API trả về không có trường results!');
      return [];
    }

    const mapped = data.results.map(mapContacts);
    console.log('Mapped contacts length:', mapped.length);
    return mapped;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

const Contacts = ({ navigation }) => {
  const contacts = useSelector(state => state.contacts);
  console.log('Contacts in Redux:', contacts);

  const dispatch = useDispatch();
  useEffect(() => {
      console.log('UseEffect is running...');
    fetchContacts()
      .then(contacts => {
        console.log('Fetched contacts:', contacts[0]);
        dispatch(fetchContactSuccess(contacts));
      })
      .catch(e => {});
  }, []);

  const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default Contacts;

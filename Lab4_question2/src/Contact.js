import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ContactListItem from './ContactListItem';
import { mapContacts } from './AsyncStorageHelper';
import { getContacts, saveContacts, clearAllData } from './AsyncStorageHelper';

const keyExtractor = ({ phone }) => phone;

// Lấy dữ liệu từ API
const fetchContacts = async () => {
  try {
    console.log('🌐 Fetching contacts...');
    const res = await fetch('https://randomuser.me/api/?results=50');
    const data = await res.json();

    if (!data.results) {
      console.log('⚠️ API không có trường results');
      return [];
    }

    const mapped = data.results.map(mapContacts);
    console.log('✅ Mapped contacts:', mapped.length);
    return mapped;
  } catch (error) {
    console.error('❌ Fetch error:', error);
    return [];
  }
};

const Contacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      await clearAllData();
      try {
        // 1️⃣ Đọc từ AsyncStorage trước
        const stored = await getContacts();

        if (stored.length > 0) {
          console.log('📦 Loaded contacts from AsyncStorage' + stored.length);
          setContacts(stored);
        } else {
          // 2️⃣ Nếu chưa có thì fetch API
          console.log('🌐 Fetching new contacts from API...');
          const newContacts = await fetchContacts();
          setContacts(newContacts);

          // 3️⃣ Lưu lại để lần sau load nhanh
          await saveContacts(newContacts);
          console.log('💾 Saved contacts to AsyncStorage');
        }
      } catch (e) {
        console.error('❌ Error loading contacts:', e);
      }
    };

    loadContacts();
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
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default Contacts;

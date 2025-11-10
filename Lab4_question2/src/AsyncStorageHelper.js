import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

// 🧩 Hàm xử lý dữ liệu contact trả về từ API
export const mapContacts = (contact) => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: v4(),
    name: name.first + ' ' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1 ? true : false,
  };
};


const CONTACTS_KEY = 'contacts';
const FAVORITES_KEY = 'favorites';

// ===================== CONTACTS =====================
export const saveContacts = async (contacts) => {
  try {
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    console.log('💾 Saved contacts');
  } catch (e) {
    console.error('❌ Error saving contacts:', e);
  }
};

export const getContacts = async () => {
  try {
    const json = await AsyncStorage.getItem(CONTACTS_KEY);
    if (json) {
      console.log('📦 Loaded contacts from AsyncStorage');
      return JSON.parse(json);
    }
    return [];
  } catch (e) {
    console.error('❌ Error loading contacts:', e);
    return [];
  }
};

// ===================== FAVORITES =====================
export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    console.log('💾 Saved favorites');
  } catch (e) {
    console.error('❌ Error saving favorites:', e);
  }
};

export const getFavorites = async () => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (json) {
      console.log('📦 Loaded favorites from AsyncStorage');
      return JSON.parse(json);
    }
    return [];
  } catch (e) {
    console.error('❌ Error loading favorites:', e);
    return [];
  }
};

// ===================== EXTRA UTILITIES =====================
// 🧹 Xóa toàn bộ dữ liệu (debug hoặc reset)
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([CONTACTS_KEY, FAVORITES_KEY]);
    console.log('🧹 Cleared contacts & favorites');
  } catch (e) {
    console.error('❌ Error clearing data:', e);
  }
};

// 🔄 Cập nhật 1 mục yêu thích (thêm hoặc gỡ)
export const toggleFavorite = async (contactId) => {
  try {
    const currentFavorites = await getFavorites();
    let updatedFavorites = [];

    if (currentFavorites.includes(contactId)) {
      updatedFavorites = currentFavorites.filter((id) => id !== contactId);
    } else {
      updatedFavorites = [...currentFavorites, contactId];
    }

    await saveFavorites(updatedFavorites);
    console.log('⭐ Updated favorites:', updatedFavorites.length);
    return updatedFavorites;
  } catch (e) {
    console.error('❌ Error toggling favorite:', e);
    return [];
  }
};

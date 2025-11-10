import 'react-native-get-random-values';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
export const mapContacts = contact => {
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

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    favorites: [],
  },
  reducers: {
    fetchContactSuccess: (state, action) => {
      state.contacts = action.payload;
    },
    updateFavorite: (state, action) => {
      const contactId = action.payload; 
      const isFavorite = state.favorites.includes(contactId);

      if (isFavorite) {
        state.favorites = state.favorites.filter(id => id !== contactId);
      } else {
        state.favorites.push(contactId);
      }
    },
    
  },
});
export const { fetchContactSuccess, updateFavorite } = contactSlice.actions;
const store = configureStore({
  reducer: contactSlice.reducer,
});
export default store;

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './Contact';
import Favorites from './Favorites';
import ProfileContact from './ProfileContact';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function ContactsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contacts" component={Contacts}  options={{ headerShown: false }}/>
      <Stack.Screen name="ProfileContact" component={ProfileContact}  />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ContactsStack"
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'lightgray',
        drawerStyle: { backgroundColor: '#1E90FF' },
      }}
    >
      <Drawer.Screen
        name="ContactsStack"
        component={ContactsStack}
        options={{ title: 'Contacts' }}
      />
      <Drawer.Screen name="Favorites" component={Favorites} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import 'react-native-gesture-handler';
import React from 'react';
import Contacts from './src/Contact';
import Store from './src/Store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileContact from './src/ProfileContact';
import Favorties from './src/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './src/Favorites';
import { enableScreens } from 'react-native-screens';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

enableScreens();

const Stack = createStackNavigator();
function ContactsScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: true,
      
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile contact' }}
      />
    </Stack.Navigator>
  );
}
function FavoriteScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile contact' }}
      />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'blue' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      
      <Tab.Screen
  name="ContactsScreens"
  component={ContactsScreens}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="format-list-bulleted" color={color} size={size} />
    ),
  }}
/>

<Tab.Screen
  name="Favorites"
  component={FavoriteScreens}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="star-check" color={color} size={size} />
    ),
  }}
/>
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};
export default App;

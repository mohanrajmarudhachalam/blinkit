import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, ActivityIndicator, ScrollView
} from 'react-native';
import { AppProvider, UserProvider } from '@realm/react';
import { appId, baseUrl } from './atlasConfig.json';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { HomePage } from './src/pages/HomePage'
import CategoryList from './src/pages/CategoryList';
import { WelcomeView } from './src/pages/WelcomeView'
import { realmContext } from './src/database/RealmContext';
import ProfilePage from './src/pages/ProfilePage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TailwindProvider } from "tailwindcss-react-native";
import { CartPage } from './src/pages/CartPage';
import { EmptyCartpage } from './src/components/EmptyCartpage';
import { OrderTrackDetails } from './src/pages/OrderTrackDetails';
import { LoginPages } from './src/pages/LoginPages';
import { LoginDashboardScreen } from './src/pages/LoginDashboardScreen';

import { Provider } from "react-redux";
import store from './store';
import { LogBox } from 'react-native';


const { RealmProvider } = realmContext;

const Stack = createStackNavigator();
const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <App />
      </UserProvider>
    </AppProvider>
  );
};
const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};
const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(true);
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const appData = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
  }
  React.useEffect(() => {
    appData()
  }, []);

  return (
    <>
      <RealmProvider
        sync={{
          flexible: true,
          onError: (_, error) => {
            console.error(error);
          },
        }}
        fallback={LoadingIndicator}>
        <SafeAreaProvider>
          <NavigationContainer >
            <Provider store={store}>
             
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="Categorylist" component={CategoryList}/>
                    <Stack.Screen name='Profile' component={ProfilePage}/> 
                    <Stack.Screen name='Cart'component={CartPage}/>
                    <Stack.Screen name="Empty" component={EmptyCartpage}/>
                    <Stack.Screen name="OrderTrack" component={OrderTrackDetails}/>
                    <Stack.Screen name="SignIn" component={LoginPages} />
                    <Stack.Screen name="Dashboard" component={LoginDashboardScreen} />

                  </Stack.Navigator>
   
            </Provider>
            
          </NavigationContainer>
        </SafeAreaProvider>

      </RealmProvider>

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AppWrapper;

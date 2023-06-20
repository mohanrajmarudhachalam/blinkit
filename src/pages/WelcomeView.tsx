import React, { useCallback, useState, useEffect } from "react";
import Realm from "realm";
import { useApp } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Onboarding } from '../pages/Onboarding';
import { LoginPages } from '../pages/LoginPages';
import { LoginDashboardScreen } from '../pages/LoginDashboardScreen';
import { FindAccountPage } from '../pages/FindAccountPage';
import { SignupPage } from "../pages/SignupPage";


import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

Icon.loadFont();
export function WelcomeView(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const app = useApp();

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

  const signIn = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  }, [app, email, password]);

  useEffect(() => {
    signIn();
  }, []);



  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunched && (
            <Stack.Screen name="OnboardingScreen"
              component={Onboarding} />)}
          <Stack.Screen name="Dashboard" component={LoginDashboardScreen} />
          <Stack.Screen name="SignIn" component={LoginPages} />
          <Stack.Screen name="FindAccount" component={FindAccountPage} />
          <Stack.Screen name="Signup" component={SignupPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    padding: 10,
    color: 'gray',
    textAlign: 'center',
  },
  mainButton: {
    width: 350,

  },
  secondaryButton: {

  },

})
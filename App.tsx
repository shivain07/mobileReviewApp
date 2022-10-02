import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AlertDialog, NativeBaseProvider } from 'native-base';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import AuthContext, { AuthContextProvider } from './src/context/AuthContext';
import AuthenticatedPagesStack from './src/navigators/Authenticated/AuthenticatedPagesStack';
import UnAuthenticatedPagesStack from './src/navigators/UnAuthenticated/UnAuthenticatedPagesStack';
import onAuthStateChanged from './src/AuthHelper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const App = () => {
  const [isSettingUpFirebase, setIsSettingUpFirebase] = useState(true);
  const { setIsUserLoggedIn, isUserLoggedIn, setUser, user } = useContext(AuthContext);
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (isSettingUpFirebase) setIsSettingUpFirebase(false);
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '180143170660-fp0kkti2ns94jpapg18ge2o5csvt1ksc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID 
    });
  }, []);
  const checkIfUserIsLoggedIn = () => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
      }}>
        <NativeBaseProvider>
          <NavigationContainer>
            <View style={{ flex: 1 }}>
              {isSettingUpFirebase ? < ActivityIndicator size="large" color="#00ff00" style={{
                alignSelf: "center",
                justifyContent: "center"
              }} /> : <>
                {user ? <AuthenticatedPagesStack /> : <UnAuthenticatedPagesStack />}
              </>}
            </View>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider >
  );
};

const AppWrapper = () => {
  return <AuthContextProvider>
    <App />
  </AuthContextProvider>
}

export default AppWrapper


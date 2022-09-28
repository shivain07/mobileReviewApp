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


const App = () => {
  const [initializing, setInitializing] = useState(true);
  const { setIsUserLoggedIn, isUserLoggedIn, setUser } = useContext(AuthContext);

  useEffect(() => {
    setUser({
      userName: "Shivain Gusain",
      email: "shivain@gmail.com",
      photoURL: "https://lh3.googleusercontent.com/a-/ACNPEu8z_V8jG6an19ZZd74OEu6p9Zka5_mwekmi590p=s96-c",
      id: "RStIzjisaqcrJdHiRq828PfEvn53"
    })
  }, []);


  // function onAuthStateChanged(userData: any) {
  //   setUser(userData);
  //   setIsUserLoggedIn(false)
  //   if (initializing) setInitializing(false);
  // }
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
              {false ? < ActivityIndicator size="large" color="#00ff00" style={{
                alignSelf: "center",
                justifyContent: "center"
              }} /> : <>
                {true ? <AuthenticatedPagesStack /> : <UnAuthenticatedPagesStack />}
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


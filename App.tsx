/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Button } from '@rneui/themed';
import React, { Children, type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Dialogs from './src/Dialog';


const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
      }}>
        <MyView styleProps={{ backgroundColor: "yellow", flex: 1 }}>
          <Dialogs />
          {/* <Button size="sm">Small</Button> */}
        </MyView>
      </SafeAreaView>
    </SafeAreaProvider >
  );
};



export default App;

const MyView = ({ children, styleProps }: any) => {
  return <View style={{ ...styleProps }}>
    {children}
  </View>
}
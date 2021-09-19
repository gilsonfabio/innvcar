import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" translucent={true} />
      <Routes />      
    </>
  );
}


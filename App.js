import React from 'react';
import { SafeAreaView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './navigation/mainContainer';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0E1421'}}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1421" />
      <NavigationContainer>
        <MainContainer />
      </NavigationContainer>
    </SafeAreaView>
  );
}


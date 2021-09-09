/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import HUD from './SampleComponents/HUD';
import {
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
} from 'native-base';

import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import {WebView} from 'react-native-webview';

import {MaterialIcons} from '@expo/vector-icons';

// ...
const App = () => {
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState('AAPL');

  return (
    <>
      {/* <Header />
      <HUD value={price} symbol={symbol} /> */}
      <NativeBaseProvider>
        <AppBar />
        <WebView
          source={{
            uri: 'http://localhost:3000/sample-template-native-sdk.html',
          }}
          onMessage={(event) => {
            const {data} = event.nativeEvent;
            const parsedData = JSON.parse(data);
            const dataSet = parsedData.dataSet;
            setPrice(dataSet[dataSet.length - 1].Close);
            setSymbol(parsedData.symbol);
          }}
        />
      </NativeBaseProvider>
    </>
  );
};

const AppBar = () => {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#000000" />

      <HStack
        bg="#000000"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center">
        <HStack space={4} alignItems="center">
          <IconButton
            icon={
              <Icon
                size="sm"
                as={<MaterialIcons name="chevron-left" />}
                color="white"
              />
            }
          />
        </HStack>
        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="favorite" />}
                size="sm"
                color="white"
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="search" />}
                color="white"
                size="sm"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import HUD from './SampleComponents/HUD';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';
// ...
const App: () => React$Node = () => {
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState(' ');

  return (
    <>
      <Header />
      <HUD value={price} symbol={symbol} />
      <WebView
        source={{ uri: 'http://localhost:3000/sample-template-native-sdk.html' }}
        onMessage={event => {
          const { data } = event.nativeEvent
          const parsedData = JSON.parse(data)
          const dataSet = parsedData.dataSet
          setPrice(dataSet[dataSet.length - 1].Close)
          setSymbol(parsedData.symbol)
        }}
      />
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

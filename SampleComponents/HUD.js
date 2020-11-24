import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const HUD: () => React$Node = (props) => {

  return (
    <>
      <Text>{props.symbol}</Text>
      <Text>{props.value}</Text>
    </>
  )
}

export default HUD
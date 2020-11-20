import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Button: () => React$Node = (props) => {

  return (
    <>
      <Text>{props.value}</Text>
    </>
  )
}

export default Button
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';

export default class Page3 extends Component {
  render() {
    return (
      <View style={[styles.container, 
      {width: Dimensions.get('window').width,
       height: Dimensions.get('window').height}]}>
        <Text style={styles.welcome}>
          Welcome to React Native Page3!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
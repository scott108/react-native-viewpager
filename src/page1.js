import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ListView,
  Image
} from 'react-native';

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var data = Array.apply(null, {length: 20}).map(Number.call, Number);
    let data = [
      'App 1',
      'App 2',
      'App 3',
      'App 4',
      'App 5',
      'App 6',
      'App 7',
      'App 8',
      'App 9',
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }
  render() {
    return (
      <View style={[styles.container,
      {width: Dimensions.get('window').width * 2 / 3,
       height: Dimensions.get('window').height * 2 / 3}]}>
        <Text style={styles.welcome}>
          Welcome to React Native Page1!
        </Text>

        <ListView 
          contentContainerStyle={[styles.list, 
          {height: Dimensions.get('window').width * 2 / 3, 
          width: Dimensions.get('window').width * 2 / 3}]}
          scrollEnabled={false} 
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
              <Image style={styles.itemBackground}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}>
                <Text style={styles.item}>{rowData}</Text>
              </Image>
  
          }
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent'
  },
  itemBackground: {
    alignItems: 'center',
    width:210,
    height: 210,
    margin: 15,
    marginBottom: 20,
  },
});
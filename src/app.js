import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import ViewPager from './viewpager';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

export default class App extends Component {
  _renderPage(page) {
    const Component = page.component;
    return <Component />
  }
  
  render() {
    return (
      <ViewPager
        style={{flex: 1}}
        pages={[{key: 'page1', component: Page1},
                {key: 'page2', component: Page2},
                {key: 'page3', component: Page3}]}
        renderPage={this._renderPage}
        indicator={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
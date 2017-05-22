import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {indicatorIndex: 0};
    this._renderIndicator = this._renderIndicator.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  _renderIndicator() {
    return this.props.pages.map((item, index) => {
      return <View key={item.key} style={{
        height: 5, 
        width: 5, 
        borderRadius: 50, 
        backgroundColor: this.state.indicatorIndex==index? 'lightgray':'gray',
        margin: 5}}/>
    })
  }
  handleScroll(event) {
    if(event.nativeEvent.contentOffset.x % Dimensions.get('window').width == 0) {
      let index = event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
      this.setState({indicatorIndex: index});
    }
  }
  render() {
    return (
      <View style={this.props.style}>
        <FlatList
          data={this.props.pages}
          renderItem={({item, index}) => this.props.renderPage(item)}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
        />
        {this.props.indicator? 
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {this._renderIndicator()}
        </View>:null}
      </View>
    );
  }
}
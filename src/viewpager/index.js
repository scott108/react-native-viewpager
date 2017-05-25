import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
  PanResponder
} from 'react-native';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {indicatorIndex: 0, indexOffset: 0, preGestureState: 0};
    this._renderIndicator = this._renderIndicator.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    let count = 0
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log(Math.round(this.state.preGestureState) != Math.round(gestureState.dx))
        if(Math.round(this.state.preGestureState) != Math.round(gestureState.dx)) {
          if(gestureState.dx < -0) {
            this.refs.listRef.scrollToIndex({index: this.state.indexOffset += 0.01});
          } else if(gestureState.dx > 0 && this.state.indexOffset - 0.01 >= 0 ) {
            this.refs.listRef.scrollToIndex({index: this.state.indexOffset -= 0.01});
          }
          this.state.preGestureState = gestureState.dx;
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        count = 0;
        this.setState({preGestureState: 0})
        if(gestureState.dx <= -300 && this.state.indicatorIndex + 1 < this.props.pages.length) {
          this.refs.listRef.scrollToIndex({index: this.state.indicatorIndex + 1});
          this.setState({indicatorIndex: this.state.indicatorIndex + 1});
          this.setState({indexOffset: this.state.indicatorIndex + 1})
        } else if(gestureState.dx >= 300 && this.state.indicatorIndex - 1 >= 0) {
          this.refs.listRef.scrollToIndex({index: this.state.indicatorIndex - 1});
          this.setState({indicatorIndex: this.state.indicatorIndex - 1});
          this.setState({indexOffset: this.state.indicatorIndex - 1})
        } else {
          this.refs.listRef.scrollToIndex({index: this.state.indicatorIndex});
          this.setState({indexOffset: this.state.indicatorIndex})
        }
      },
    });
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
    if(Math.round(event.nativeEvent.contentOffset.x) % Math.floor(this.props.style.width) < 5 && Platform.OS != 'windows') {
      let index = Math.round(event.nativeEvent.contentOffset.x / this.props.style.width);
      this.setState({indicatorIndex: index});
    }
  }
  render() {
    return (
      <View style={this.props.style}>
        <FlatList
          ref="listRef"
          data={this.props.pages}
          renderItem={({item, index}) => this.props.renderPage(item)}
          horizontal={true}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
          scrollEnabled={false} 
          {...this._panResponder.panHandlers}
        />
        {this.props.indicator?
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {this._renderIndicator()}
        </View>:null}
      </View>
    );
  }
}
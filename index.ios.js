/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Map = require('./mapview.js');
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

class TextReactNative extends Component {
  // getInitialState (){
  //   return {
  //     latitude: 0,
  //     longitude: 0
  //   }
  // }
  constructor(){
    super();
    this.state={
      latitude: 0,
      longitude: 0
    }
  }
  _onchange(event){
      this.setState({
        latitude: event['latitude'],
        longitude: event['longitude'],
      });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>{this.state.latitude}</Text>
          <Text>{this.state.longitude}</Text>
        <Map style={styles.map} 
          AMapKey="1457e2d9d8d675c685e7fd8582acd620" onLocationChange={(event)=>{this._onchange(event)}}>
        </Map>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height:400,
    width:Dimensions.get('window').width - 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});


AppRegistry.registerComponent('TextReactNative', () => TextReactNative);

import React, { Component } from 'react';
import Map from './amap.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AlertIOS,
  TextInput,
} from 'react-native';

class MapView extends Component {

  constructor(){
    super();
    this.state={
      latitude: 0,
      longitude: 0,
      title:'',
      subtitle:'',
      message:'',
      GeoName:'',
      KeywordsCity:'',
      KeywordsName:'',
      AroundName:'',
    }
  }
  _onGetLocation(event){
      this.setState({
        latitude: event['latitude'],
        longitude: event['longitude'],
        title:event['title'],
        subtitle:event['subtitle'],
        message:event['message'],
      });
  }

  _onGeocodeSearch(event){
      // this.setState({
      //   GeoName:'北京久其软件',
      // });
}

  _onSubmitEditing(event) {
    this.setState({
        // GeoName:'北京久其软件',
        // AroundName:'肯德基',
        // KeywordsName:'肯德基',
        KeywordsName:event.nativeEvent.text,
        KeywordsCity:'北京',

      });
    // AlertIOS.alert(event.nativeEvent.text);

  }
    
  _onChangeText(text) {
  
  }


  render() {
    return (
      <View style={styles.container}>

         <TextInput style={styles.search} placeholder="搜索"
                   onSubmitEditing={this._onSubmitEditing.bind(this)}
                   returnKeyType="search"
                   placeholderTextColor="#494949" autoFocus={false} 
                   onChangeText={this._onChangeText}/>

          <Text>{'纬度='+this.state.latitude}</Text>
          <Text>{'经度='+this.state.longitude}</Text>
          <Text>{this.state.title}</Text>
          <Text>{this.state.subtitle}</Text>
          <Text>{this.state.message}</Text>

        <Map style={styles.map} 
          AMapKey="01cf276cff7929b9f0931f8c3fb9b4ce" 
          onGetLocation={(event)=>{this._onGetLocation(event)}} 
          showTraffic={true} 
          scrollEnabled={false} 

          GeoName={this.state.GeoName}
          onGeocodeSearch={(event)=>{this._onGeocodeSearch(event)}}

          KeywordsCity={this.state.KeywordsCity}
          KeywordsName={this.state.KeywordsName}
          onKeywordsSearch={(event)=>{}}
          
          AroundName={this.state.AroundName}
          onAroundSearch={(event)=>{}}
          >
        </Map>

      </View>
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
  map: {
    height:300,
    width:Dimensions.get('window').width - 20,
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:3,
    fontSize:15
  }
  
});


AppRegistry.registerComponent('TextReactNative', () => MapView);

import React, { Component } from 'react';
import Map from 'react-native-amap';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AlertIOS,
  TextInput,
} from 'react-native';

export default class MapView extends Component {

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

  //获取当前位置信息
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
    AlertIOS.alert(event['message'])
  }

  _onSubmitEditing(event) {
    this.setState({
        // GeoName:'北京久其软件',
        // AroundName:'肯德基',
        KeywordsName:event.nativeEvent.text,
        KeywordsCity:'北京',

      });
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

          <Text style={{marginTop:10}}>{'纬度='+this.state.latitude}</Text>
          <Text style={{marginTop:5}}>{'经度='+this.state.longitude}</Text>
          <Text style={{marginTop:5}}>{'title='+this.state.title}</Text>
          <Text style={{marginTop:5}}>{'subtitle='+this.state.subtitle}</Text>
          <Text style={{marginTop:5}}>{'结果='+this.state.message}</Text>

        <Map style={styles.map} 
          AMapKey="04a46bd238047b8bf33fba5723ecad72" 
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
    marginTop:10,
    height:400,
    width:Dimensions.get('window').width - 20,
  },
  search: {
    width:Dimensions.get('window').width - 20,
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:3,
    fontSize:15
  }
  
});



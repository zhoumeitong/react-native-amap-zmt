# react-native-amap
高德地图插件

功能：
通过高德地图实现定位，返回地理位置经纬度坐标及地理名称，实现地理编码查询、兴趣点查询。

一、链接AMap库
参考http://reactnative.cn/docs/0.28/linking-libraries-ios.html#content

1、添加react-native-amap插件到你工程的node_modules文件夹下
2、添加AMap库中的.xcodeproj文件在你的工程中
3、点击你的主工程文件，选择Build Phases，然后把刚才所添加进去的.xcodeproj下的Products文件夹中的静态库文件（.a文件），拖到Link Binary With Libraries组内。
4、由于AMap库中使用第三方库（高德地图SDK）所以我们需要打开你的工程文件，选择Build Settings，然后搜索Header Search Paths，然后添加库所在的目录


二、开发环境配置
参考http://lbs.amap.com/api/ios-sdk/guide/buildproject/#t2

1、引入地图库
在 TARGETS->Build Phases-> Link Binary With Libaries 中点击“+”按钮，在弹出的窗口中点击“Add Other”按钮，选择AMap插件目录下的 MAMapKit.framework、AMapFoundationKit.framework、AMapSearchKit.framework 文件添加到工程中。

2、引入资源文件
需要引入的资源文件包括：AMap.bundle，其中：AMap.bundle 在 MAMapKit.framework 的 Resources文件夹下，AMap.bundle资源文件中存储了定位、默认大头针标注视图等图片，可利用这些资源图片进行开发。
左侧目录中选中工程名，在右键菜单中选择Add Files to “工程名”…，从MAMapKit.framework->Resources文件中选择AMap.bundle文件，并勾选“Copy items if needed”复选框，单击“Add”按钮，将资源文件添加到工程中。
![](http://upload-images.jianshu.io/upload_images/2093433-8b9e0403b6442fbd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
*注意：2D地图和3D地图的资源文件是不同的，在进行SDK切换时，需要同时更换对应的资源文件。*

3、引入系统库
左侧目录中选中工程名，在TARGETS->Build Phases-> Link Binary With Libaries中点击“+”按钮，在弹出的窗口中查找并选择所需的库（见下表），单击“Add”按钮，将库文件添加到工程中。

![](http://upload-images.jianshu.io/upload_images/2093433-dfaa1c175417c421.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4、环境配置
在TARGETS->Build Settings->Other Linker Flags 中添加-ObjC，C大写。
![](http://upload-images.jianshu.io/upload_images/2093433-3d0c2fe5c32a7759.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意：
V4.0.0之后版本不需要添加-ObjC。

三、配置plist文件

![](http://upload-images.jianshu.io/upload_images/2093433-a73415c9f09b66f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1、iOS9为了增强数据访问安全，将所有的http请求都改为了https，为了能够在iOS9中正常使用地图SDK，请在"Info.plist"中进行如下配置，否则影响SDK的使用。
```
<key>NSAppTransportSecurity</key>
<dict>
<key>NSAllowsArbitraryLoads</key>
<true/>
</dict>

```
2、在iOS9中为了能正常调起高德地图App的功能，必须在"Info.plist"中将高德地图App的URL scheme列为白名单，否则无法调起，配置如下：
```
<key>LSApplicationQueriesSchemes</key>
<array>
<string>iosamap</string>
</array>
```
3、开启定位

需在info.plist中添加
NSLocationWhenInUseUsageDescription或NSLocationAlwaysUsageDescription字段

NSLocationWhenInUseUsageDescription
表示应用在前台的时候可以搜到更新的位置信息。
NSLocationAlwaysUsageDescription
表示应用在前台和后台（suspend或terminated)都可以获取到更新的位置数据。

四、简单使用

```
//index.ios.js

import React, { Component } from 'react';
//import Map from './amap.js';
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
```

```
//amap.js

import { requireNativeComponent } from 'react-native';
import React, { Component ,PropTypes} from 'react';

var AMap = requireNativeComponent('AMap', null)

class AMapView extends React.Component {

constructor() {
super();
this._onGetLocation = this._onGetLocation.bind(this);
this._onGeocodeSearch = this._onGeocodeSearch.bind(this);
this._onKeywordsSearch = this._onKeywordsSearch.bind(this);
this._onAroundSearch = this._onAroundSearch.bind(this);
}

static propTypes = {
//apiKey
AMapKey:PropTypes.string,
//是否显示实时路况
showTraffic: PropTypes.bool,
//是否显示指南针
showsCompass: PropTypes.bool,
//缩放手势的开启和关闭
zoomEnabled: PropTypes.bool,
//拖动的开启和关闭
scrollEnabled: PropTypes.bool,

//获取当前位置信息
onGetLocation:PropTypes.func,

//地理编码查询名称
GeoName:PropTypes.string,
//地理编码查询
onGeocodeSearch:PropTypes.func,

//关键字检索城市
KeywordsCity:PropTypes.string,
//关键字检索名称
KeywordsName:PropTypes.string,
//关键字检索
onKeywordsSearch:PropTypes.func,

//周边检索名称
AroundName:PropTypes.string,
//周边检索
onAroundSearch:PropTypes.func,
};

_onGetLocation(event: Event) {
if (!this.props.onGetLocation) {
return;
}
this.props.onGetLocation(event.nativeEvent);
}

_onGeocodeSearch(event: Event) {
if (!this.props.onGeocodeSearch) {
return;
}
this.props.onGeocodeSearch(event.nativeEvent);
}

_onKeywordsSearch(event: Event) {
if (!this.props.onKeywordsSearch) {
return;
}
this.props.onKeywordsSearch(event.nativeEvent);
}

_onAroundSearch(event: Event) {
if (!this.props.onAroundSearch) {
return;
}
this.props.onAroundSearch(event.nativeEvent);
}

render() {
return <AMap {...this.props} 
onGetLocation={this._onGetLocation} 
onGeocodeSearch={this._onGeocodeSearch} 
onKeywordsSearch={this._onKeywordsSearch} 
onAroundSearch={this._onAroundSearch}
/>;
}
}


module.exports = AMapView;

```

效果展示

![](http://upload-images.jianshu.io/upload_images/2093433-518538dbec41b812.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# react-native-amap
高德地图插件

功能：
通过高德地图实现定位，返回地理位置经纬度坐标

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

2、引入系统库
左侧目录中选中工程名，在TARGETS->Build Settings-> Link Binary With Libaries中点击“+”按钮，在弹出的窗口中查找并选择所需的库（见下表），单击“Add”按钮，将库文件添加到工程中。

3、环境配置
在TARGETS->Build Settings->Other Linker Flags 中添加-ObjC，C大写。

注意：
V4.0.0之后版本不需要添加-ObjC。

三、配置plist文件

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
var Map = require('./mapview.js');
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

class TextReactNative extends Component {
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
```

```
//mapview.js

import { requireNativeComponent } from 'react-native';
import React, { Component } from 'react';

var AMap = requireNativeComponent('AMap', null)
class AMapView extends React.Component {
  constructor() {
  	super();
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event: Event) {
    if (!this.props.onLocationChange) {
      return;
    }
    this.props.onLocationChange(event.nativeEvent);
  }
  render() {
    return <AMap {...this.props} onChange={this._onChange} />;
  }
}
AMapView.propTypes = {
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onLocationChange: React.PropTypes.func,
  
}

module.exports = AMapView;

```

效果展示

![](http://upload-images.jianshu.io/upload_images/2093433-a00dc88d746626d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

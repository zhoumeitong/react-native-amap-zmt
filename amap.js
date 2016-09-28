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


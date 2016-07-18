import { requireNativeComponent } from 'react-native';
import React, { Component } from 'react';
// requireNativeComponent automatically resolves this to "AMapManager"
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


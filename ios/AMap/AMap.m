//
//  CurrentLocationView.m
//  AMapDemo
//
//  Created by zmt on 16/7/5.
//  Copyright © 2016年 zmt. All rights reserved.
//

#import "AMap.h"

#import <AMapSearchKit/AMapSearchKit.h>
#import<AMapFoundationKit/AMapFoundationKit.h>


@interface AMap()<MAMapViewDelegate,AMapSearchDelegate>
{
    MAMapView *_mapView;
    AMapSearchAPI * _search;//搜索对象
}

@end

@implementation AMap

#pragma mark ------- 初始化

- (instancetype)initWithFrame:(CGRect)frame andKey:(NSString *)key
{
    if (self = [super initWithFrame:frame]) {
        
        self.AMapKey = key;
//        self.AMapKey = @"1457e2d9d8d675c685e7fd8582acd620";
        
    }
    
    return self;
}


- (void)setAMapKey:(NSString *)AMapKey
{
    _AMapKey = AMapKey;
    
    [AMapServices sharedServices].apiKey = self.AMapKey;
    
    [self initSearch];
    
    [self initMapView];
    
    _mapView.showsUserLocation = YES;    //YES 为打开定位，NO为关闭定位
    [_mapView setUserTrackingMode: MAUserTrackingModeFollow animated:YES];
    
}

#pragma mark 创建地图
-(void)initMapView
{
    
    _mapView = [[MAMapView alloc] initWithFrame:self.bounds];
    _mapView.delegate = self;
    
    [self addSubview:_mapView];
    
}
#pragma mark serach初始化
-(void)initSearch
{
    _search =[[AMapSearchAPI alloc] init];
    _search.delegate=self;
    
}

#pragma mark 逆地理编码
-(void)reGeoCoding{
    
    if (_currentLocation.location) {
        
        AMapReGeocodeSearchRequest *request =[[AMapReGeocodeSearchRequest alloc] init];
        
        request.location =[AMapGeoPoint locationWithLatitude:_currentLocation.location.coordinate.latitude longitude:_currentLocation.location.coordinate.longitude];
        
        [_search AMapReGoecodeSearch:request];
    }
    
}
#pragma mark 搜索请求发起后的回调
/**失败回调*/
-(void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error{
    
    if ([self.delegate respondsToSelector:@selector(currentLocationViewFailLoadLocation:)]) {
        [self.delegate currentLocationViewFailLoadLocation:self];
    }
    NSLog(@"request: %@------error:  %@",request,error);
    
}
/**成功回调*/
-(void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response{
    
    //我们把编码后的地理位置，显示到 大头针的标题和子标题上
    NSString *title =response.regeocode.addressComponent.city;
    if (title.length == 0) {
        
        title = response.regeocode.addressComponent.province;
        
    }
    _mapView.userLocation.title = title;
    _mapView.userLocation.subtitle = response.regeocode.formattedAddress;
    
    if ([self.delegate respondsToSelector:@selector(currentLocationViewFinishLoadLocation:)]) {
        [self.delegate currentLocationViewFinishLoadLocation:self];
    }
    
    if (!self.onChange) {
        return;
    }
    self.onChange(@{
                    @"latitude": @(_mapView.userLocation.coordinate.latitude),
                    @"longitude": @(_mapView.userLocation.coordinate.longitude),
                    });

}

#pragma mark 定位更新回调
-(void)mapView:(MAMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation
updatingLocation:(BOOL)updatingLocation
{
  
    if(updatingLocation)
    {
        //取出当前位置的坐标
//        NSLog(@"latitude : %f,longitude: %f",userLocation.coordinate.latitude,userLocation.coordinate.longitude);
    }
    _currentLocation = userLocation;
    [self reGeoCoding];
    
    
}

- (void)dealloc
{
    _mapView = nil;
    _mapView.delegate = nil;
    _search = nil;
}


@end


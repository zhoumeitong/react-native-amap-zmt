//
//  AMap.h
//  AMap
//
//  Created by zmt on 16/7/8.
//  Copyright © 2016年 cn.com.jiuqi. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <MAMapKit/MAMapKit.h>
#import <React/RCTComponent.h>


@interface AMap : UIView

/** apiKey*/
@property (nonatomic ,strong) NSString   * _Nullable AMapKey;
/**是否显示实时路况*/
@property (nonatomic ,assign) BOOL showTraffic;
/**是否显示指南针*/
@property (nonatomic ,assign) BOOL showsCompass;
/**缩放手势的开启和关闭*/
@property (nonatomic ,assign) BOOL zoomEnabled;
/**拖动的开启和关闭*/
@property (nonatomic ,assign) BOOL scrollEnabled;


/**获取当前位置信息*/
@property (nonatomic, copy) RCTBubblingEventBlock _Nonnull onGetLocation;


/**地理编码查询名称*/
@property (nonnull,strong) NSString *GeoName;
/**地理编码查询*/
@property (nonatomic, copy) RCTBubblingEventBlock _Nullable onGeocodeSearch;


/**关键字检索城市*/
@property (nonnull,strong) NSString *KeywordsCity;
/**关键字检索名称*/
@property (nonnull,strong) NSString *KeywordsName;
/**关键字检索*/
@property (nonatomic, copy) RCTBubblingEventBlock _Nonnull onKeywordsSearch;


/**周边检索名称*/
@property (nonnull,strong) NSString *AroundName;
/**周边检索*/
@property (nonatomic, copy) RCTBubblingEventBlock _Nonnull onAroundSearch;


@end

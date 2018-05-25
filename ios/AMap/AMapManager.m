//
//  AMapManager.m
//  AMap
//
//  Created by zmt on 16/7/8.
//  Copyright © 2016年 cn.com.jiuqi. All rights reserved.
//

#import "AMapManager.h"

#import "AMap.h"

@implementation AMapManager

RCT_EXPORT_MODULE()
/**apiKey*/
RCT_EXPORT_VIEW_PROPERTY(AMapKey, NSString)
/**是否显示实时路况*/
RCT_EXPORT_VIEW_PROPERTY(showTraffic, BOOL)
/**是否显示指南针*/
RCT_EXPORT_VIEW_PROPERTY(showsCompass, BOOL)
/**缩放手势的开启和关闭*/
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
/**拖动的开启和关闭*/
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)

/**获取当前位置信息*/
RCT_EXPORT_VIEW_PROPERTY(onGetLocation, RCTBubblingEventBlock)

/**地理编码查询名称*/
RCT_EXPORT_VIEW_PROPERTY(GeoName, NSString)
/**地理编码查询*/
RCT_EXPORT_VIEW_PROPERTY(onGeocodeSearch, RCTBubblingEventBlock)


/**关键字检索城市*/
RCT_EXPORT_VIEW_PROPERTY(KeywordsCity, NSString)
/**关键字检索名称*/
RCT_EXPORT_VIEW_PROPERTY(KeywordsName, NSString)
/**关键字检索*/
RCT_EXPORT_VIEW_PROPERTY(onKeywordsSearch, RCTBubblingEventBlock)


/**周边检索名称*/
RCT_EXPORT_VIEW_PROPERTY(AroundName, NSString)
/**周边检索*/
RCT_EXPORT_VIEW_PROPERTY(onAroundSearch, RCTBubblingEventBlock)


- (UIView *)view
{
    AMap *view =[[AMap alloc] initWithFrame:CGRectMake(100, 100, 100, 100)];
    //不设置frame或frame设置为0时，指南针和比例尺显示不出来
    return view;
}


@end

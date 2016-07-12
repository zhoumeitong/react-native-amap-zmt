//
//  AMapManager.m
//  AMap
//
//  Created by zmt on 16/7/8.
//  Copyright © 2016年 cn.com.jiuqi. All rights reserved.
//

#import "AMapManager.h"
#import "RCTViewManager.h"
#import "AMap.h"

@implementation AMapManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(AMapKey, NSString)

//RCT_EXPORT_VIEW_PROPERTY(finishLoadLocation, FinishLoadLocation)

//RCT_EXPORT_VIEW_PROPERTY(failLoadLocation, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

- (UIView *)view
{
    AMap *view =[[AMap alloc] initWithFrame:CGRectMake(0, 0, 0, 0) ] ;
    return view;
}

@end

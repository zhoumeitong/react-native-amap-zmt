//
//  AMap.h
//  AMap
//
//  Created by zmt on 16/7/8.
//  Copyright © 2016年 cn.com.jiuqi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MAMapKit/MAMapKit.h>
#import "RCTComponent.h"

@class AMap;

@protocol AMapDelegate <NSObject>

@optional

- (void)currentLocationViewFinishLoadLocation:(AMap *)view;
- (void)currentLocationViewFailLoadLocation:(AMap *)view;

@end

typedef void(^FinishLoadLocation)(MAUserLocation *currentLocation);

@interface AMap : UIView

@property (nonatomic, weak) id<AMapDelegate > delegate;

@property (nonatomic ,strong) MAUserLocation *currentLocation;
@property (nonatomic ,strong) NSString *AMapKey;

//@property (nonatomic, copy) FinishLoadLocation finishLoadLocation;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;

- (instancetype)initWithFrame:(CGRect)frame andKey:(NSString *)key;

@end

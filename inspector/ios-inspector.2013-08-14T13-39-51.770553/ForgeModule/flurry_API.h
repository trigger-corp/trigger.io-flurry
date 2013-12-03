//
//  flurry_API.h
//  ForgeTemplate
//
//  Created by James Brady on 17/10/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface flurry_API : NSObject

+ (void)customEvent:(ForgeTask*)task name:(NSString*)name parameters:(NSDictionary*)parameters timed:(NSNumber*)timed;
+ (void)endCustomEvent:(ForgeTask*)task name:(NSString*)name;
+ (void)setDemographics:(ForgeTask*)task demographics:(NSDictionary*)demographics;
+ (void)setLocation:(ForgeTask*)task coords:(NSDictionary*)coords;

@end

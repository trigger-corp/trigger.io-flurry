//
//  flurry_API.m
//  ForgeTemplate
//
//  Created by James Brady on 17/10/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import "flurry_API.h"
#import "Flurry.h"

@implementation flurry_API

+ (void)customEvent:(ForgeTask*)task name:(NSString*)name parameters:(NSDictionary*)parameters timed:(NSNumber*)timed {
    [ForgeLog d:[NSString stringWithFormat:@"Flurry customEvent: %@ parameters:%@ timed:%@", name, parameters, timed]];
    
    BOOL timedEvent = timed.boolValue;
    [Flurry logEvent:name withParameters:parameters timed:timedEvent];
    [task success:nil];
}

+ (void)endCustomEvent:(ForgeTask*)task name:(NSString*)name {
    [ForgeLog d:[NSString stringWithFormat:@"Flurry endCustomEvent: %@", name]];
    [Flurry endTimedEvent:name withParameters:nil];
    [task success:nil];
}

+ (void)setDemographics:(ForgeTask*)task demographics:(NSDictionary*)demographics {
    [ForgeLog d:[NSString stringWithFormat:@"Flurry setDemographics: %@", demographics]];
    if ([[demographics objectForKey:@"user_id"] isKindOfClass:[NSString class]]) {
        [Flurry setUserID:[demographics objectForKey:@"user_id"]];
    }
    if ([[demographics objectForKey:@"age"] isKindOfClass:[NSNumber class]]) {
        [Flurry setAge:[[demographics objectForKey:@"age"] intValue]];
    }
    if ([[demographics objectForKey:@"gender"] isKindOfClass:[NSString class]]) {
        if ([[[demographics objectForKey:@"gender"] description] isEqualToString:@"m"] ||
            [[[demographics objectForKey:@"gender"] description] isEqualToString:@"f"]) {
            [Flurry setGender:[demographics objectForKey:@"gender"]];
        } else {
            [task error:@"BAD_INPUT" type:@"Gender must be 'm' or 'f'" subtype:nil];
            return;
        }
    }
    [task success:nil];
}

+ (void)setLocation:(ForgeTask*)task coords:(NSDictionary*)coords {
    [ForgeLog d:[NSString stringWithFormat:@"Flurry setLocation: %@", coords]];
    if ([coords objectForKey:@"latitude"] &&
        [coords objectForKey:@"longitude"] &&
        [coords objectForKey:@"accuracy"]) {
        [Flurry setLatitude:[[coords objectForKey:@"latitude"] doubleValue]
                  longitude:[[coords objectForKey:@"longitude"] doubleValue]
         horizontalAccuracy:[[coords objectForKey:@"accuracy"] floatValue]
           verticalAccuracy:[[coords objectForKey:@"accuracy"] floatValue]];
        
        [task success:nil];
        return;
    } else {
        [task error:@"Missing parameters - please refer to documentation" type:@"BAD_INPUT" subtype:nil];
        return;
    }
}

@end

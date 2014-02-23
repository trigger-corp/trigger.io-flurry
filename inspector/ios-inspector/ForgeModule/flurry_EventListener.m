//
//  flurry_EventListener.m
//  ForgeTemplate
//
//  Created by James Brady on 16/10/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import "flurry_EventListener.h"
#import "Flurry.h"

@implementation flurry_EventListener

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if ([[[ForgeApp sharedApp] configForPlugin:@"flurry"] objectForKey:@"debug"] != nil) {
        [Flurry setDebugLogEnabled:[[[[ForgeApp sharedApp] configForPlugin:@"flurry"] objectForKey:@"debug"] boolValue]];
    } else {
        [Flurry setDebugLogEnabled:NO];
    }
    [Flurry startSession:[[[ForgeApp sharedApp] configForPlugin:@"flurry"] objectForKey:(@"ios_api_key")]];
}

@end

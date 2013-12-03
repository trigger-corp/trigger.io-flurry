``flurry``: Analytics with Flurry
=================================

The ``forge.flurry`` namespace allows you to access the native Flurry SDK, which provides usage tracking and analytics via [Flurry](http://www.flurry.com/).

Before you can use this module, you will need to have set up a Flurry
application, and know its API key.

##Config options

Android API Key,
iOS API Key
:	Platform specific API keys provided by Flurry.

By just including this configuration in your app config, basic app
analytics information - such as sessions, active users and new users -
will be available in your Flurry dashboard.

For more advanced analytics, you can use the API methods described
below.

##API

!method: forge.flurry.customEvent(name[, parameters], success, error)
!param: name `string` a name to identify this event
!param: parameters `object` an optional hash of extra information that will be stored with this event
!param: success `function()` callback to be invoked when no errors occur
!description: Send a named and optionally parameterised event to Flurry. You could use this to track a user's navigation through your app, for example.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.flurry.startTimedEvent(name[, parameters], success, error)
!param: name `string` a name to identify this event
!param: parameters `object` an optional hash of extra information that will be stored with this event
!param: success `function()` callback to be invoked when no errors occur
!description: Takes the same options as [forge.flurry.customEvent](index.html#forgeflurrycustomeventname-parameters-success-error), but using [forge.flurry.endTimedEvent](index.html#forgeflurryendtimedeventname-success-error) you are able to easily measure the time it takes for your users to move from one action to another in your app.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.flurry.endTimedEvent(name, success, error)
!param: name `string` a name to identify this event
!param: success `function()` callback to be invoked when no errors occur
!description: Mark the end of a particular timed event: the ``name`` parameter should match the ``name`` parameter passed into [forge.flurry.startTimedEvent](index.html#forgeflurrystarttimedeventname-parameters-success-error).
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.flurry.setDemographics(demographics, success, error)
!param: demographics `object` a hash optionally including values for ``user_id``, ``age`` and ``gender``
!param: success `function()` callback to be invoked when no errors occur
!description: Store some demographic data about the current user, to enable more advanced filtering and grouping in the Flurry dashboard.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

The ``demographics`` object should contain some or all of these keys:

-  ``user_id``: (string) a unique ID for the current user
-  ``age``: (number) the current user's age
-  ``gender``: (string) either "m" or "f"

!method: forge.flurry.setLocation(coords, success, error)
!param: coords `object` a hash representing location - must include ``latitude``, ``longitude`` and ``accuracy``
!param: success `function()` callback to be invoked when no errors occur
!description: Set the user's current location: we recommend you use the [forge.geolocation.getCurrentPosition](/modules/geolocation/current/docs/index.html#forgegeolocationgetcurrentpositionoptions-success-error) to grab the coords object which should be passed in.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

**Example**:

    forge.geolocation.getCurrentPosition(function (position) {
        forge.flurry.setLocation(position.coords);
    });

package io.trigger.forge.android.modules.flurry;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeEventListener;

import com.flurry.android.FlurryAgent;

public class EventListener extends ForgeEventListener {
	@Override
	public void onStart() {
		if (ForgeApp.configForPlugin("flurry").has("debug") && ForgeApp.configForPlugin("flurry").get("debug").getAsBoolean()) {
			FlurryAgent.setLogEnabled(true);
			FlurryAgent.setLogLevel(Log.VERBOSE);
		} else {
			FlurryAgent.setLogEnabled(false);
		}
		FlurryAgent.onStartSession(ForgeApp.getActivity(), ForgeApp.configForPlugin("flurry").get("android_api_key").getAsString());
	}
	@Override
	public void onStop() {
		FlurryAgent.onEndSession(ForgeApp.getActivity());
	}
}

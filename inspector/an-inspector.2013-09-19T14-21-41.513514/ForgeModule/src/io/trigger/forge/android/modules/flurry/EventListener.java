package io.trigger.forge.android.modules.flurry;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeEventListener;

import com.flurry.android.FlurryAgent;

public class EventListener extends ForgeEventListener {
	@Override
	public void onStart() {
		FlurryAgent.onStartSession(ForgeApp.getActivity(), ForgeApp.configForPlugin("flurry").get("android_api_key").getAsString());
	}
	@Override
	public void onStop() {
		FlurryAgent.onEndSession(ForgeApp.getActivity());
	}
}

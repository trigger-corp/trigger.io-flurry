package io.trigger.forge.android.modules.flurry;

import io.trigger.forge.android.core.ForgeLog;
import io.trigger.forge.android.core.ForgeParam;
import io.trigger.forge.android.core.ForgeTask;

import java.util.Hashtable;
import java.util.Map;
import java.util.Map.Entry;

import com.flurry.android.Constants;
import com.flurry.android.FlurryAgent;
import com.flurry.android.FlurryAgent;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class API {
	public static void customEvent(final ForgeTask task, @ForgeParam("name") final String name,
			@ForgeParam("parameters") final JsonObject parameters, @ForgeParam("timed") boolean timed) {
		ForgeLog.d("Flurry customEvent: "+name+" parameters:"+parameters+" timed:"+timed);
		if (parameters.entrySet().size() > 0) {
			Map<String,String> mapParams = new Hashtable<String,String>();
			
			for (Entry<String, JsonElement> entry : parameters.entrySet()) {
				String key = entry.getKey();
				mapParams.put(key, entry.getValue().getAsString());
			}
	
			FlurryAgent.logEvent(name, mapParams, timed);
		} else {
			FlurryAgent.logEvent(name, timed);
		}
		task.success();
	}
	
	public static void endCustomEvent(final ForgeTask task, @ForgeParam("name") final String name) {
		ForgeLog.d("Flurry endCustomEvent: "+name);
		FlurryAgent.endTimedEvent(name);
		task.success();
	}
	
	public static void setDemographics(final ForgeTask task, @ForgeParam("demographics") final JsonObject demographics) {
		ForgeLog.d("Flurry setDemographics: "+demographics);
		if (demographics.has("user_id")) {
			FlurryAgent.setUserId(demographics.get("user_id").getAsString());
		}
		if (demographics.has("age")) {
			FlurryAgent.setAge(demographics.get("age").getAsInt());
		}
		if (demographics.has("gender")) {
			if (demographics.get("gender").getAsString().equals("m")) {
				FlurryAgent.setGender(Constants.MALE);
			} else if (demographics.get("gender").getAsString().equals("f")) {
				FlurryAgent.setGender(Constants.FEMALE);
			} else {
				task.error("Gender must be 'm' or 'f'", "BAD_INPUT", null);
				return;
			}
		}
		task.success();
	}
	
	public static void setLocation(final ForgeTask task, @ForgeParam("coords") final JsonObject coords) {
		ForgeLog.d("Flurry setLocation: "+coords);
		if (coords.has("latitude") && coords.has("longitude") && coords.has("accuracy")) {
			FlurryAds.setLocation(coords.get("latitude").getAsFloat(), coords.get("longitude").getAsFloat());
		} else {
			task.error("Missing parameters - please refer to documentation", "BAD_INPUT", null);
			return;
		}
		task.success();
	}
}

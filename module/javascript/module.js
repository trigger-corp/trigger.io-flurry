if ((forge.is.android() && !forge.config.modules.flurry.config.android_api_key) ||
	(forge.is.ios() && !forge.config.modules.flurry.config.ios_api_key)) {
	forge['flurry'] = {
		'no_api_key': function (cb) {
			var message = "The 'flurry' module is disabled in this build because no API key was provided";
			forge.logging.error(message);
			cb && cb({
				message: message,
				type: "UNAVAILABLE",
				subtype: "DISABLED_MODULE"
			});
		},
		
		'customEvent': function (name, parameters, success, error) {
			if (typeof parameters === "function") {
				error = success;
				success = parameters;
			}
			this.no_api_key(error);
		},
		'startTimedEvent': function (name, parameters, success, error) {
			if (typeof parameters === "function") {
				error = success;
				success = parameters;
			}
			this.no_api_key(error);
		},
		'endCustomEvent': function (name, success, error) {
			this.no_api_key(error);
		},
		'setDemographics': function (demographics, success, error) {
			this.no_api_key(error);
		},
		'setLocation': function (coords, success, error) {
			this.no_api_key(error);
		}
	};

} else {
	forge['flurry'] = {
		'customEvent': function (name, parameters, success, error) {
			if (typeof parameters === "function") {
				error = success;
				success = parameters;
				parameters = {};
			}
			if (typeof parameters === "string") {
				error && error({
					message: '`parameters` must be an object',
					type: 'BAD_INPUT'
				});
				return;
			}

			forge.internal.call("flurry.customEvent", {
				name: name,
				parameters: parameters,
				timed: false
			}, success, error);
		},
		'startTimedEvent': function (name, parameters, success, error) {
			if (typeof parameters === "function") {
				error = success;
				success = parameters;
				parameters = {};
			}
			if (typeof parameters === "string") {
				error && error({
					message: '`parameters` must be an object',
					type: 'BAD_INPUT'
				});
				return;
			}
			
			forge.internal.call("flurry.customEvent", {
				name: name,
				parameters: parameters,
				timed: true
			}, success, error);
		},
		'endTimedEvent': function (name, success, error) {
			forge.internal.call("flurry.endCustomEvent", {
				name: name
			}, success, error);
		},
		'setDemographics': function (demographics, success, error) {
			forge.internal.call("flurry.setDemographics", {
				demographics: demographics
			}, success, error);
		},
		'setLocation': function (coords, success, error) {
			forge.internal.call("flurry.setLocation", {
				coords: coords
			}, success, error);
		}
	};	
}


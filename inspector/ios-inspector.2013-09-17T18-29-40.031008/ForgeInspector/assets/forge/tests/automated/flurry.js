module("forge.flurry");

if (forge.is.mobile()) {
	asyncTest("customEvent", 1, function () {
		forge.flurry.customEvent ('†és† custom',
				function () {
					ok(true);
					start();
				},
				function (err) {
					ok(false);
					forge.logging.error('customEvent error: '+JSON.stringify(err));
					start();
				}
		);
	});
	asyncTest("customEvent with string", 1, function () {
		forge.flurry.customEvent ('†és† custom', 'hello!',
				function () {
					ok(true);
					start();
				},
				function (err) {
					ok(false);
					forge.logging.error('customEvent error: '+JSON.stringify(err));
					start();
				}
		);
	});
	asyncTest("customEvent with obj", 1, function () {
		forge.flurry.customEvent ('†és† custom', {'hello': 'world!'},
				function () {
					ok(true);
					start();
				},
				function (err) {
					ok(false);
					forge.logging.error('customEvent error: '+JSON.stringify(err));
					start();
				}
		);
	});

	asyncTest("timed event", 2, function () {
		forge.flurry.startTimedEvent ('†és† timed',
				function () {
					ok(true);
					forge.flurry.endTimedEvent ('†és† timed',
						function () {
							ok(true);
							start();
						},
						function (err) {
							ok(false);
							forge.logging.error('endTimedEvent error: '+JSON.stringify(err));
							start();
						}
					);
				},
				function (err) {
					ok(false);
					forge.logging.error('startTimedEvent error: '+JSON.stringify(err));
					start();
				}
		);
	});

	asyncTest("setDemographics empty object", 1, function () {
		forge.flurry.setDemographics({},
				function () {
					ok(true);
					start();
				},
				function (err) {
					ok(false);
					forge.logging.error('setDemographics error: '+JSON.stringify(err));
					start();
				}
		);
	});
	asyncTest("setDemographics gender", 1, function () {
		forge.flurry.setDemographics({gender: "m"},
				function () {
					ok(true);
					start();
				},
				function (err) {
					ok(false);
					forge.logging.error('setDemographics error: '+JSON.stringify(err));
					start();
				}
		);
	});
	asyncTest("setDemographics gender and age", 1, function () {
		forge.flurry.setDemographics({gender: "m", age: 28},
				function () {
					ok(true);
					start();
				},
				function (err) {
					ok(false);
					forge.logging.error('setDemographics error: '+JSON.stringify(err));
					start();
				}
		);
	});
	asyncTest("setLocation", 1, function () {
		forge.flurry.setLocation({latitude: 0, longitude: 0, accuracy: 100},
			function () {
				ok(true);
				start();
			},
			function (err) {
				ok(false);
				forge.logging.error('setDemographics error: '+JSON.stringify(err));
				start();
			}
		);
	});
}

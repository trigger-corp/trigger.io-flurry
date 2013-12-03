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
}

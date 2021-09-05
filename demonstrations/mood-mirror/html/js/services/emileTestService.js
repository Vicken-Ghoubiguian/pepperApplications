define(['./module'], function (services) {
    'use strict';
    services.factory('sEmileTestService', function($q, $qi) {
		console.log("Building Emile test service");
		function emileTestFunction() {
			console.log("Running Emile test function");
			return "forty two"
		}

        return {
            emileTestFunction: emileTestFunction,
        };
	});
});

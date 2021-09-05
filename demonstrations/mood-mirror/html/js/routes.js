define(['./app'], function(app) {
    'use strict';

    return app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        // Waiting prefs
        $stateProvider
            .state('myview', {
                url: '/myview',
				templateUrl: 'partials/myview.html',
				controller: 'MoodSmoothie',
            })
            .state('myotherview', {
                url: '/myotherview',
				templateUrl: 'partials/myotherview.html',
				controller: 'MyOtherController',
            })

        $urlRouterProvider.otherwise('/myview');
    }).
    run(function($rootScope, $templateCache, $q, $state, $timeout, $window, $filter){
		$rootScope.$state = $state;
		// This seems needed for
        $rootScope.$on('$viewContentLoaded', function() {
            //console.log("cache");
            $templateCache.removeAll();
        });
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
				// If I want to do things while my state gets loaded.
            }
        );
    });
});

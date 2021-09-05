/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */

// Ugly hacks to allow working directly on a distant robot
window.getRobotIp = function () { // Note that window.getRobotIp is also called in qimessagingService.js, to create the session
    var regex = new RegExp("[\\?&]robot=([^&#]*)");
    var results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ").replace("/", ""));
}
// We need to get the qimessaging.js used on that robot (and eventually, whatever other libs he may have):
var robotlibs = '/libs/'
var robotIp = window.getRobotIp();
if (robotIp) {
  robotlibs = "http://" + robotIp + "/libs/";
}
// (end ugly hacks, apart from the use of robotlibs

var time_value = new Date().getTime();
require.config({

    paths: {
        'domReady': '../lib/domReady',
        'qimessaging': robotlibs + 'qimessaging/1.0/qimessaging',
        'jquery': '../lib/jquery.min',
        'angular': '../lib/angular/angular',
        "uiRouter": "../lib/angular-ui-router",
    },
    // add ?[timestamp] behind all file to load
    urlArgs: time_value,
    // timeout update from 7 seconds to 300... No more "LOAD TIMEOUT FOR MODULES"
    waitSeconds: 30,
    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'qimessaging': {
        },
        'jquery': {
            exports: '$'
        },
        'angular': {
            exports: 'angular',
            deps: ['qimessaging']
        },
        'uiRouter':{
            deps: ['angular']
        },
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});
require.onError = function (err) {
    if (err.requireType === 'timeout') {
        // tell user
        location.reload();
    } else {
        throw err;
    }
};
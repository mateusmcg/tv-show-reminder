'use strict';

define([
    //## Angular modules
    'angularAMD',
    'angular-route',

    //## Commons components
    'app-common'
], function(angularAMD) {
    
    var app = angular.module('app', [
        //## Angular modules
        'ngRoute',

        //## Commons
        'app.common'
    ]);
    
    app.constant('TraktTvSettings', {
       'clientId': 'b0193b6297b2e397aeef7b832872e50752eae47b10c809f8dec7b98f34aafab1',
       'clienteSecret': '020681235a8b04aac2dfb4e7b82029567d6841b92a44d8e7213f3696c7aaf44c'
    });
   
    app.config(['$routeProvider', 'RestangularProvider', 'TraktTvSettings', function ($routeProvider, RestangularProvider, TraktTvSettings) {          
        $routeProvider.when("/example", angularAMD.route({
            templateUrl: 'app/features/example/example.html',
            controllerUrl: 'app/features/example/example-ctrl.js'
        }));
        
        RestangularProvider.setBaseUrl('https://api-v2launch.trakt.tv/');
        
        RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
            headers['Content-type'] = 'application/json';
            headers['trakt-api-key'] = TraktTvSettings.clientId;
            headers['trakt-api-version'] = 2;
            
            return {
                element: element,
                params: params,
                headers: headers,
                httpConfig: httpConfig
            };
        });
        
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData = data;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data;
            }
            
            return extractedData;
        });

    }]);

    app.run(['$log', function ($log) {          
        $log.debug('Launching application! :)')
    }]);

    return angularAMD.bootstrap(app);
});

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
   
    app.config(function ($routeProvider) {          
        $routeProvider.when("/example", angularAMD.route({
            templateUrl: 'app/features/example/example.html',
            controllerUrl: 'app/features/example/example-ctrl.js'
        }));
    });

    app.run(['$log', function ($log) {          
        $log.debug('Launching application! :)')
    }]);

    return angularAMD.bootstrap(app);
});

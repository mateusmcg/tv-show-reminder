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
   
    app.config(function () {          

    });

    app.run(['$log', function ($log) {          
        $log.debug('Launching application! :)')
    }]);

    return angularAMD.bootstrap(app);
});

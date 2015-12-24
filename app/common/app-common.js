'use strict';

define(['angular-bootstrap',
        'angular-toastr',
        'app-database',
        'rest-angular',
        'app-trakt-tv-factory'], function() {    
            
    angular.module('app.external.components', ['ui.bootstrap', 'toastr', 'restangular']);

    angular.module('app.components', ['app.database', 'trakt-tv']);

    angular.module('app.common', ['app.components', 'app.external.components']);
});
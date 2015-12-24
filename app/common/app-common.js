'use strict';

define(['angular-bootstrap',
        'angular-toastr',
        'app-database',
        'rest-angular',
        'app-trakt-tv-factory',
        'app-header',
        'app-side-bar'], function() {    
            
    angular.module('app.external.components', ['ui.bootstrap', 'toastr', 'restangular']);

    angular.module('app.components', ['app.database', 'trakt-tv', 'app.common.nav.header', 'app.common.nav.sidebar']);

    angular.module('app.common', ['app.components', 'app.external.components']);
});
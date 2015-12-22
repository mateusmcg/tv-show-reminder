'use strict';

define(['angular-bootstrap',
        'angular-toastr',
        'app-database'], function() {    
            
    angular.module('app.external.components', ['ui.bootstrap', 'toastr']);

    angular.module('app.components', ['app.database']);

    angular.module('app.common', ['app.components', 'app.external.components']);
});
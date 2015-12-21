'use strict';

define(['angular-bootstrap',
        'angular-toastr'], function() {    
    angular.module('app.external.components', ['ui.bootstrap', 'toastr']);

    angular.module('app.components', []);

    angular.module('app.common', ['app.components', 'app.external.components']);
});
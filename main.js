'use strict';

//var requireJs = require('assets/libs/requirejs/require.js');

require.config({
    baseUrl: "app",
    
    paths: {

        //## Common 
        'app-common': 'common/app-common',
        'app-database': 'database/app-database',

        //## 3rd party angular scripts
        'angular': '../assets/libs/angular/angular',
        'angularAMD': '../assets/libs/angularAMD/angularAMD',
        'angular-bootstrap': '../assets/libs/angular-bootstrap/ui-bootstrap-tpls',
        'angular-route': '../assets/libs/angular-route/angular-route',
        'angular-toastr': '../assets/libs/angular-toastr/angular-toastr.tpls',
        'rest-angular': '../assets/libs/restangular/restangular',

        //## 3rd party non angular scripts
        'bootstrap': '../assets/libs/bootstrap/bootstrap',
        'jquery': '../assets/libs/jquery/jquery',
        'lodash': '../assets/libs/lodash/lodash'

    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': ['jquery'],
        'lodash': {
            deps: ['jquery'],
            exports: '_'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'app-database': ['angular'],
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-bootstrap': ['bootstrap', 'angular'],
        'angular-toastr': ['angular'],
        'rest-angular': ['lodash','angular']
    },

    deps: ['app']
});
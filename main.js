'use strict';

//var requireJs = require('assets/libs/requirejs/require.js');

require.config({
    baseUrl: "app",
    
    paths: {

        //## Common 
        'app-common': 'common/app-common',
        'app-database': 'database/app-database',
        'app-directives': 'common/directives/app-directives',
        'app-filters': 'common/filters/app-filters',
        'app-trakt-tv-factory': 'common/factory/trakt-tv',
        'app-header': 'common/nav/header-ctrl',
        'app-side-bar': 'common/nav/side-bar-ctrl',

        //## 3rd party angular scripts
        'angular': '../assets/libs/angular/angular',
        'angularAMD': '../assets/libs/angularAMD/angularAMD',
        'angular-bootstrap': '../assets/libs/angular-bootstrap/ui-bootstrap-tpls',
        'angular-route': '../assets/libs/angular-route/angular-route',
        'angular-animate': '../assets/libs/angular-animate/angular-animate',
        'angular-toastr': '../assets/libs/angular-toastr/angular-toastr.tpls',
        'rest-angular': '../assets/libs/restangular/restangular',
        'angular-grid': '../assets/libs/angulargrid/angulargrid',

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
        'app-directives': ['angular'],
        'app-filters': ['angular'],
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-animate': ['angular'],
        'angular-bootstrap': ['bootstrap', 'angular'],
        'angular-toastr': ['angular'],
        'rest-angular': ['lodash','angular'],
        'app-trakt-tv-factory': ['angular', 'rest-angular'],
        'app-header': ['angular'],
        'app-side-bar' : ['angular'],
        'angular-grid' : ['angular']
    },

    deps: ['app']
});
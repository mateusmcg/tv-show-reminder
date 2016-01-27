define([
    //## Angular modules
    'angularAMD',
    'angular-route',
    'angular-animate',

    //## Commons components
    'app-common'
], function(angularAMD) {
    "use strict";
    
    var app = angular.module('app', [
        //## Angular modules
        'ngRoute',
        'ngAnimate',

        //## Commons
        'app.common'
    ]);
    
    app.constant('TraktTvSettings', {
       'clientId': 'b0193b6297b2e397aeef7b832872e50752eae47b10c809f8dec7b98f34aafab1',
       'clienteSecret': '020681235a8b04aac2dfb4e7b82029567d6841b92a44d8e7213f3696c7aaf44c'
    });
   
    app.config(['$routeProvider', 'RestangularProvider', 'TraktTvSettings', 'toastrConfig', function ($routeProvider, RestangularProvider, TraktTvSettings, toastrConfig) {          
        $routeProvider.when("/example", angularAMD.route({
            templateUrl: 'app/features/example/example.html',
            controllerUrl: 'app/features/example/example-ctrl.js'
        }));
        
        $routeProvider.when("/show", angularAMD.route({
            templateUrl: 'app/features/show/show.html',
            controllerUrl: 'app/features/show/show-ctrl.js'
        }));
        
        $routeProvider.when("/myshows", angularAMD.route({
            templateUrl: 'app/features/my-shows/my-shows.html',
            controllerUrl: 'app/features/my-shows/my-shows-ctrl.js'
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
        
        RestangularProvider.setResponseExtractor(function(response) {
            var newResponse = response;
            if (angular.isArray(response)) {
                angular.forEach(newResponse, function(value, key) {
                newResponse[key].originalElement = angular.copy(value);
                });
            } else {
                newResponse.originalElement = angular.copy(response);
            }

            return newResponse;
        });
        
        angular.extend(toastrConfig, {
            autoDismiss: false,
            extendedTimeOut: 60 * 60 * 1000,
            timeOut: 60 * 60 * 1000,
            tapToDismiss: false
        });

    }]);

    app.run(['$log', '$http', 'toastr', '$timeout', '$q', function ($log, $http, toastr, $timeout, $q) {          
        $log.debug('Launching application! :)');
        var full = {};
        
        function formatBytes(bytes, decimals) {
            if(bytes == 0) return '0 Byte';
            var k = 1000;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
        }
        
        $http.get('https://api.github.com/repos/mateusmcg/tv-show-reminder/releases/latest').then(function(result){
            var packageJSON = requireDeps('./package.json');
            
            if (packageJSON.version != result.data.tag_name){
                console.debug('Update app version.', result.data);
                full = _.findWhere(result.data.assets, { name: result.data.tag_name + '-deploy.zip'});
                var size = formatBytes(full.size);
                toastr.info('<a id="updateAppVersion" href="'+ full.browser_download_url +'">Download ' + result.data.tag_name + ' now (' + size + ').</a>' , 'New Version Avaiable !', {
                    allowHtml: true,
                    closeButton: true
                });
                $timeout(function(){
                    $("#updateAppVersion").click(function(evt){
                        
                    });
                }, 500);
                return;
            }
            
            console.debug('App is up to date');
        }, function(err){
            console.error('Error trying to update app.', err);
        });
             
// 
//         if (gulp.tasks.updateVersion) { 
//             console.log('Updating app version...');
//             gulp.start('updateVersion');
//         }
    }]);
    
    document.addEventListener('DOMContentLoaded', function () {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });
    
    function notifyUpdateApp(diff){
        var notification = new Notification('New Version Avaiable !', {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: "Click on me to update to version ",
        });

        notification.onclick = function () {
            window.open("http://stackoverflow.com/a/13328397/1269037");      
        };
    }

    function notifyMe(callBack) {
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.'); 
            return;
        }

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            callBack();
        }
    }  

    return angularAMD.bootstrap(app);
});

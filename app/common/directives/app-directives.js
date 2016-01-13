(function(){
    'use strict';
    
    angular.module('app.directives', []);

    angular.module('app.directives').directive('backImg', function(){
        return function(scope, element, attrs){
            scope.$watch(attrs.backImg, function(newValue, oldValue){
            var url = scope.$eval(attrs.backImg);
            if(url){
                element.css('background-image', 'url(' + url +')'); 
                element.css('background-size', 'cover');
                element.css('background-repeat', 'no-repeat');
                element.css('opacity', '1');
            } 
            });
        };
    });

    angular.module('app.directives').directive('appLoading', function(){
        return {
            restrict: 'AE',
            template: '<div class="app-loading">' +
                    ' <div class="sk-fading-circle">' +
                    '     <div class="sk-circle1 sk-circle"></div>' +
                    '     <div class="sk-circle1 sk-circle"></div>' +
                    '     <div class="sk-circle2 sk-circle"></div>' +
                    '     <div class="sk-circle3 sk-circle"></div>' +
                    '     <div class="sk-circle4 sk-circle"></div>' +
                    '     <div class="sk-circle5 sk-circle"></div>' +
                    '     <div class="sk-circle6 sk-circle"></div>' +
                    '     <div class="sk-circle7 sk-circle"></div>' +
                    '     <div class="sk-circle8 sk-circle"></div>' +
                    '     <div class="sk-circle9 sk-circle"></div>' +
                    '     <div class="sk-circle10 sk-circle"></div>' +
                    '     <div class="sk-circle11 sk-circle"></div>' +
                    '     <div class="sk-circle12 sk-circle"></div>' +
                    ' </div>' +
                    '</div>',
            link: function(scope, element, attrs){
                scope.$watch(attrs.appLoading, function(newValue, oldValue){
                    var isLoading = scope.$eval(attrs.appLoading);
                    if (isLoading){
                        element.removeClass('hide');
                    } else{
                        element.addClass('hide');
                    }
                });
            }
        };
    });
}());
'use strict';

angular.module('app.directives', []);

angular.module('app.directives', []).directive('backImg', function(){
    return function(scope, element, attrs){
        scope.$watch(attrs.backImg, function(newValue, oldValue){
           var url = scope.$eval(attrs.backImg);
           if(url){
             element.css('background-image', 'url(' + url +')'); 
             element.css('background-size', 'contain');
             element.css('opacity', '1');
           } 
        });
    };
});
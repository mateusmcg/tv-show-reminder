'use strict';

angular.module('app.filters', []);

angular.module('app.filters', []).filter('toFixed', function(){
    return function(str) {
      return str.toFixed(1);
    };
}).filter('capitalizeFirstLetter', function(){
    return function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
}).filter('beautifyDate', function(){
    return function(strDate) {
        if(!strDate)
            return 'No date found :(';
            
        var monthNames = ["", "January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
        var date = new Date();
        strDate = strDate.substring(0, 10).split('-');
        var year = strDate[0];
        var month = parseInt(strDate[1]);
        var day = strDate[2];
        
        return day + ' ' + monthNames[month] + ' ' + year;
    };
}).filter('toFixed', function(){
    return function(str) {
      return str.toFixed(1);
    };
});
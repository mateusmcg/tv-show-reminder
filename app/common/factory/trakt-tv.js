'use strict';

angular.module('trakt-tv', []);

angular.module('trakt-tv').factory('PeopleRestService', ['Restangular', function(Restangular){
    return Restangular.all('people');
}]);

angular.module('trakt-tv').factory('MoviesRestService', ['Restangular', function(Restangular){
    return Restangular.all('movies');
}]);

angular.module('trakt-tv').factory('ShowsRestService', ['Restangular', function(Restangular){
    return Restangular.all('shows');
}]);

angular.module('trakt-tv').factory('CommentsRestService', ['Restangular', function(Restangular){
    return Restangular.all('comments');
}]);

angular.module('trakt-tv').factory('SearchRestService', ['Restangular', function(Restangular){
    return Restangular.all('search');
}]);
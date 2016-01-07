define(['app'], function(app) {
   'use strict';
   
   app.controller('MyShowsController', ['ShowsDb', '$location', function(showsDb, $location){
        var vm = this;
        
        vm.loadMyShows = loadMyShows;
        vm.loadShow = loadShow; 
        
        vm.loadMyShows();
        
        function loadMyShows(){
            vm.shows = showsDb.getAll();
        }
        
        function loadShow(show){
            console.debug('Selected Item: ', show);
            
            $location.path('/show').search(show);
        }
   }]);
})
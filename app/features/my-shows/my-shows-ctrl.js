define(['app'], function(app) {
   'use strict';
   
   app.controller('MyShowsController', ['ShowsDb', '$location', '$timeout', function(ShowsDb, $location, $timeout){
        var vm = this;
        vm.isLoading = true;
        
        vm.loadMyShows = loadMyShows;
        vm.loadShow = loadShow; 
        vm.showWatched = showWatched;
        vm.removeFromMyShows = removeFromMyShows;
        
        vm.loadMyShows();
        
        function loadMyShows(){
            vm.shows = ShowsDb.getAll();
            angular.forEach(vm.shows, function(show, index){
                var watchedShow = show.episodesIds.length === show.episodesWatched.length;
                ShowsDb.update({ _id: show._id}, { $set: { watched: watchedShow } }).then(function(result){
                    console.debug(result);
                });
                show.watched = watchedShow;
            });
            vm.isLoading = false;
        }
        
        function loadShow(show){
            console.debug('Selected Item: ', show);
            
            $location.path('/show').search(show);
        }
        
        function showWatched(show, $event){
            $event.stopPropagation();                       
            var showId = show._id;
            var seasonsIds = show.seasonsIds;
            var episodesIds = show.episodesIds;
            
            if(show.watched) {
               ShowsDb.update({ '_id': showId }, { $set: { 'watched' : false }, $pull : { 'episodesWatched': { '$in': episodesIds }, 'seasonsWatched' : { '$in': seasonsIds } } }).then(function(result){
                    console.debug('Show unwatched', result);
              });
            } else {
               ShowsDb.update({ '_id': showId }, { $set: { 'watched' : true }, $addToSet : { 'episodesWatched': { '$each': episodesIds }, 'seasonsWatched' : { '$each': seasonsIds } } }).then(function(result){
                    console.debug('Show watched', result);
              });
            }
            
            show.watched = !show.watched;
        }
        
        function removeFromMyShows(selectedShow, $event){
            $event.stopPropagation();
            ShowsDb.remove({_id: selectedShow._id}).then(function(result){
                if (result.numRemoved == 1) {
                    vm.shows = _.without(vm.shows, selectedShow);
                }
            });
        }
   }]);
})
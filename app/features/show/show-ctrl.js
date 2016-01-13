'use strict';

define(['app'], function(app) {
   'use strict';
    
   app.controller('ShowController', ['ShowsRestService', 'ShowsDb', '$routeParams', '$timeout', function(ShowsRestService, ShowsDb, $routeParams, $timeout){
        var vm = this;
        vm.isLoading = true;
        
        vm.show = {};
        
        vm.loadShow = loadShow;
        vm.addToMyShows = addToMyShows;
        vm.removeFromMyShows = removeFromMyShows;
        vm.watchEpisode = watchEpisode;
        vm.watchSeason = watchSeason;
        
        vm.loadShow();
        
        function loadShow(){
            var showId = $routeParams._id;
            ShowsRestService.get(showId + '?extended=full,images').then(function(show){
                console.debug(show);
                vm.show = show;
                var showImgs = vm.show.images;
                vm.show.bgImg = getBgImage(showImgs);
                vm.show.rating = vm.show.rating.toFixed(1);
                vm.show.logo = showImgs.logo ? showImgs.logo.full : '';
                // vm.show.trailer = $sce.trustAsResourceUrl(vm.show.trailer.replace('watch?v=', 'embed/'));
                
                ShowsDb.find({_id: show.ids.trakt}).then(function(result){
                    vm.isMyShow = !result.error && result.docs && result.docs.length == 1;
                    var show = result.docs[0];
                    ShowsRestService.get(showId + '/seasons?extended=full,episodes,images').then(function(seasons){
                        seasons[0].active = true;
                        console.debug(seasons);
                        vm.seasons = seasons;
                        if(vm.isMyShow){
                            angular.forEach(vm.seasons, function(season, index){
                                if(_.contains(show.seasonsWatched, season.ids.trakt)){
                                    season.watched = true;
                                    $timeout(function(){
                                        $('#season' + season.number).addClass('watched');
                                    }, 1);
                                }
                                angular.forEach(season.episodes, function(episode, index){
                                if(_.contains(show.episodesWatched, episode.ids.trakt))
                                        episode.watched = true; 
                                });
                            });       
                        }
                        vm.isLoading = false;
                    });
                });
            });
        }
        
        function getBgImage(images){
          if(images.fanart && images.fanart.full)
            return images.fanart.full;
          else if(images.screenshot && images.screenshot.full)
            return images.screenshot.full;
          else if(images.banner && images.banner.full)
            return images.banner.full;
        }
        
        function addToMyShows(){
            var showToBeAdded = {};
            angular.copy(vm.show.originalElement, showToBeAdded);
            var seasonsIds = [];
            var episodesIds = [];
            
            angular.forEach(vm.seasons, function(season, index){
                var seasonId = season.ids.trakt;
                seasonsIds.push(seasonId);
                angular.forEach(season.episodes, function(episode, index){
                    var episodeId = episode.ids.trakt;
                    episodesIds.push(episodeId);
                });
            });
            
            showToBeAdded._id = showToBeAdded.ids.trakt;
            showToBeAdded.seasonsIds = seasonsIds;
            showToBeAdded.episodesIds = episodesIds;
            showToBeAdded.seasonsWatched = [];
            showToBeAdded.episodesWatched = [];
            
            ShowsDb.insert(showToBeAdded).then(function(result){
                 vm.isMyShow = !result.error && result.newDoc;
            });
        }
        
        function removeFromMyShows(){
            ShowsDb.remove({_id: vm.show.ids.trakt}).then(function(result){
                vm.isMyShow = !(result.numRemoved == 1);
            });
        }
        
        function watchEpisode(episode, season){
            episode.watched = !episode.watched;
            
            if(episode.watched){
                ShowsDb.update({ _id: vm.show.ids.trakt }, { $push : { episodesWatched : episode.ids.trakt } }).then(function(result){
                    console.debug('Episode watched', result);
                });   
            } else {
                ShowsDb.update({ _id: vm.show.ids.trakt }, { $pull : { episodesWatched : episode.ids.trakt } }).then(function(result){
                    console.debug('Episode Unwatched', result);
                });
            }
            
            if(_.where(season.episodes, { watched: true }).length == season.episodes.length){
                season.watched = true;
                $('#season' + season.number).addClass('watched');
                ShowsDb.update({ _id: vm.show.ids.trakt }, { $push : { seasonsWatched : season.ids.trakt } }).then(function(result){
                    console.debug('Season watched', result);
                });
            } else {
                season.watched = false;
                $('#season' + season.number).removeClass('watched');
                ShowsDb.update({ _id: vm.show.ids.trakt }, { $pull : { seasonsWatched : season.ids.trakt } }).then(function(result){
                    console.debug('Season unwatched', result);
                });
            }
        }
        
        function watchSeason(season){
            var ids = [];
            angular.forEach(season.episodes, function(episode, index){
                ids.push(episode.ids.trakt);
                episode.watched = !season.watched;
            });
            
            if(season.watched){
               ShowsDb.update({ _id: vm.show.ids.trakt }, { $pull : { episodesWatched: { $in: ids }, seasonsWatched: season.ids.trakt } }).then(function(result){
                  console.debug('Season unwatched', result);
              });
              $('#season' + season.number).removeClass('watched');
            } else {
               ShowsDb.update({ _id: vm.show.ids.trakt }, { $addToSet : { episodesWatched: { $each: ids }, seasonsWatched: season.ids.trakt } }).then(function(result){
                  console.debug('Season watched', result);
              });
              $('#season' + season.number).addClass('watched');
            }           
            
            season.watched = !season.watched;
        }       
   }]); 
});
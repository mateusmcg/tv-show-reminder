'use strict';

define(['app'], function(app) {
   'use strict';
    
   app.controller('ShowController', ['ShowsRestService', 'ShowsDb', '$routeParams', '$sce', function(ShowsRestService, ShowsDb, $routeParams, $sce){
        var vm = this;       
        
        vm.show = {};
        
        vm.loadShow = loadShow;
        vm.addToMyShows = addToMyShows;
        vm.removeFromMyShows = removeFromMyShows;
        
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
                });
                
                ShowsRestService.get(showId + '/seasons?extended=full,episodes,images').then(function(seasons){
                   seasons[0].active = true;
                   console.debug(seasons);
                   vm.seasons = seasons;
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
            var showToBeAdded = angular.copy(vm.show.originalElement);
            showToBeAdded._id = showToBeAdded.ids.trakt;
            
            ShowsDb.insert(showToBeAdded).then(function(result){
                 vm.isMyShow = !result.error && result.newDoc;
            });
        }
        
        function removeFromMyShows(){
            ShowsDb.remove({_id: vm.show.ids.trakt}).then(function(result){
                vm.isMyShow = !(result.numRemoved == 1);
            });
        }
   }]); 
});
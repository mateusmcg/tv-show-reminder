'use strict';

define(['app'], function(app) {
   'use strict';
    
   app.controller('ShowController', ['ShowsRestService', '$routeParams', function(ShowsRestService, $routeParams){
        var vm = this;       
        
        vm.show = {};
        
        function loadShow(){
            var showId = $routeParams.id;
            ShowsRestService.get(showId + '?extended=full,images').then(function(show){
                vm.show = show;
            });
        }
        
        loadShow();
        
   }]); 
});
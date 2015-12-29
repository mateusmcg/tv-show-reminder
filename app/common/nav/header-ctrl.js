'use strict';

angular.module('app.common.nav.header', []);

angular.module('app.common.nav.header')
    .controller('HeaderCtrl', ['$scope', '$log', '$location', 'SearchRestService', function ($scope, $log, $location, SearchRestService) {

        var vm = this;

        vm.close = close;
        vm.handleMaximize = handleMaximize;
        vm.minimize = minimize;
        vm.isMaximized = false;
        vm.showAllResults = showAllResults;
        vm.getResults = getResults;
        vm.clearSearch = clearSearch;
        vm.selectItem = selectItem;
        vm.changeStyle = changeStyle;
        
        function changeStyle(){
            var targetelement = 'link'; //determine element type to create nodelist using
            var targetattr = 'href'; //determine corresponding attribute to test for
            var allsuspects=document.getElementsByTagName(targetelement)
            for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf('css/app-theme.css')!=-1){
                    var newelement = createCssFile('themes/pink-theme.css', 'css')
                    allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
                }
            }
        }
        
        function createCssFile(filename){
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", "assets/" + filename)
            return fileref
        }
        
        function selectItem(){
            var selectedItem = vm.searchQuery;
            $log.debug('Selected Item: ', selectedItem);
            
            $location.path('/show').search(selectedItem);
        }
        
        function clearSearch(){
            vm.searchQuery = '';
        };
        
        function getResults(search){
            var partialResults = [];
            return SearchRestService.getList({query: search, type:'show'}).then(function(shows){
                partialResults = partialResults.concat(shows.plain());
                return SearchRestService.getList({query: search, type:'movie'}).then(function(movies){
                    partialResults = partialResults.concat(movies.plain());
                    return SearchRestService.getList({query: search, type:'person'}).then(function(people){
                        partialResults = partialResults.concat(people.plain());
                        var results = [];
                        angular.forEach(partialResults, function(value, index){
                            if(value.type === 'show'){
                                var images = value.show.images.poster;
                                var img = images.thumb ? images.thumb : images.medium ? images.medium : images.full ? images.full : null;
                                var year = value.show.year ? ' (' + value.show.year + ')' : '';
                                results.push({name: value.show.title + year, img: img, group: 'Shows', id: value.show.ids.trakt});
                            } else if(value.type === 'movie'){
                                var images = value.movie.images.poster;
                                var img = images.thumb ? images.thumb : images.medium ? images.medium : images.full ? images.full : null;
                                var year = value.movie.year ? ' (' + value.movie.year + ')' : '';
                                results.push({name: value.movie.title + year, img: img, group: 'Movies', id: value.movie.trakt});
                            } else{
                                var images = value.person.images.headshot;
                                var img = images.thumb ? images.thumb : images.medium ? images.medium : images.full ? images.full : null;
                                results.push({name: value.person.name, img: img, group: 'People', id: value.person.trakt});
                            }
                        });
                        
                        results = _(results)
                        .groupBy('group')
                        .map(function (g) {
                            g[0].firstInGroup = true;  // the first item in each group
                            return g;
                        })
                        .flatten()
                        .value();
                        
                        return results; 
                    });
                });
            });
        };
        
        function showAllResults(){
            alert('Show all results');
        };

        function close() {
            win.close();
        };

        function minimize() {
            win.minimize();
        };

        function handleMaximize() {
            if (!vm.isMaximized) {
                win.maximize();
                return;
            }

            win.unmaximize();
        };

        win.on('maximize', function () {
            vm.isMaximized = true;
            $scope.$apply();
        });

        win.on('unmaximize', function () {
            vm.isMaximized = false;
            $scope.$apply();
        });

    }]);
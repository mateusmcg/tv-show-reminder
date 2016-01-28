(function(){
    'use strict';
    
    angular.module('app.common.nav.footer', []);
    
    
    angular.module('app.common.nav.footer').controller('FooterCtrl', ['$uibModal', '$scope', '$rootScope', 'toastr', function($uibModal, $scope, $rootScope, toastr){
        var vm = this;
        
        var packageJSON = requireDeps('./package.json');
        vm.appVersion = packageJSON.version;
        
        vm.openReleaseNotes = openReleaseNotes;
        vm.openAuthor = openAuthor;
        vm.openBugs = openBugs;
        
        function handleDownloadNewVersion(evt, state){
            vm.state = null;
            
            if(state.finished){
                toastr.success('Download finished', 'Success');
                return;   
            }
            
            if(state.error){
                toastr.error('Something wrong happened', 'Error');
                console.error(state.error);
                return;   
            }
            
            vm.state = state;
            vm.percentage = (100 * state.percentage).toFixed(2);
            if(state.time.remaining){
                if(state.time.remaining >= 60)
                    vm.remaining = '(' + (state.time.remaining / 60).toFixed(2).replace('.', ':') + ' minutes remaining)';
                else{
                    vm.remaining = '(' + state.time.remaining.toFixed(0) + ' seconds remaining)';
                }
            }
            
            $scope.$apply();
        }
        
        $rootScope.$on('downloadNewVersion', handleDownloadNewVersion);        
        
        function openReleaseNotes(){
            $uibModal.open({
                templateUrl: 'releaseNotesModal.html',
                controller: 'ReleaseNotesCtrl',
                windowClass: 'app-modal-window'
            });
        }
        
        function openBugs(){
            $uibModal.open({
                templateUrl: 'bugsModal.html',
                controller: 'BugsCtrl',
                windowClass: 'app-modal-window'
            });
        }
        
        function openAuthor(){
            $uibModal.open({
                templateUrl: 'aboutModal.html',
                controller: 'AboutCtrl',
                size: 'md'
            });
        }       
        
    }]);
    
    angular.module('app.common.nav.footer').controller('ReleaseNotesCtrl', ['$uibModalInstance', '$http', '$scope', function($uibModalInstance, $http, $scope){
        function formatBytes(bytes, decimals) {
            if(bytes === 0) return '0 Byte';
            var k = 1000;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
        }
        
        $http.get('https://api.github.com/repos/mateusmcg/tv-show-reminder/releases').then(function(result){
            $scope.releases = result.data;
            angular.forEach($scope.releases, function(release, index){
                var full = _.findWhere(release.assets, { name: release.tag_name + '-deploy.zip'});
                if (full){
                    release.downloadUrl = full.browser_download_url;
                    release.fileSize = formatBytes(full.size);
                }                
            });
        });
        
        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        };
    }]);
    
    angular.module('app.common.nav.footer').controller('BugsCtrl', ['$uibModalInstance', '$http', '$scope', function($uibModalInstance, $http, $scope){
        $http.get('https://api.github.com/repos/mateusmcg/tv-show-reminder/issues').then(function(result){
            $scope.issues = result.data;
        });
        
        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        };
    }]);
    
    angular.module('app.common.nav.footer').controller('AboutCtrl', ['$uibModalInstance', '$http', '$scope', function($uibModalInstance, $http, $scope){
        $http.get('https://api.github.com/repos/mateusmcg/tv-show-reminder/issues').then(function(result){
            $scope.issues = result.data;
        });
        
        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        };
    }]);
    
} ());
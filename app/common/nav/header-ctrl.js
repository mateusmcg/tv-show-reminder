'use strict';

angular.module('app.common.nav.header', []);

angular.module('app.common.nav.header')
    .controller('HeaderCtrl', ['$scope', function ($scope) {

        var vm = this;

        vm.showList = [];

        vm.close = close;
        vm.handleMaximize = handleMaximize;
        vm.minimize = minimize;
        vm.isMaximized = false;
        vm.defaultImage = '../images/main-section-background.png';

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
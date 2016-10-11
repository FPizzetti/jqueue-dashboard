'use strict';
angular.module('common').service('HistoryService', ['localStorageService', '$rootScope', '$location', HistoryService]);

function HistoryService(localStorageService, $rootScope, $location) {

    var self = this;

    self.history = [];

    self.push = function (key, val) {
        return localStorageService.set(key, val);
    };

    self.getItem = function (key) {
        return localStorageService.get(key);
    };

    self.listAll = function () {
        return localStorageService.keys();
    };

    self.clearAll = function () {
        return localStorageService.clearAll();
    };

    $rootScope.$on('$locationChangeSuccess', function (event, toState) {
        if (self.history.length > 15) {
            self.history.shift();
        }
        self.push($location.$$absUrl, $location.$$absUrl);
    });

}
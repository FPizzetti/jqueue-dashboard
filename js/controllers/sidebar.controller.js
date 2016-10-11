angular.module('common').controller('SidebarController', ['HistoryService', SidebarController]);

function SidebarController(HistoryService) {

    var self = this;

    self.history = [];

    self.list = function () {
        self.history = [];
        HistoryService.listAll().forEach(function (key) {
            self.history.push(HistoryService.getItem(key));
        });
    };

    function init() {
        self.list();
    }

    init();
}
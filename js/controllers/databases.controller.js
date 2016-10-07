angular.module('database').controller('DatabasesController', ['$state', 'Database', DatabasesController]);

function DatabasesController($state, Database) {

    var self = this;

    self.databases = [];

    function init() {
        self.listAll();
    }

    self.listAll = function () {
        Database.listAll().then(function (resolution) {
            self.databases = resolution.data;
        });
    };

    // self.openDatabase = function (database) {
    //     $state.go('databases/' + database.configName);
    // };

    init();
}
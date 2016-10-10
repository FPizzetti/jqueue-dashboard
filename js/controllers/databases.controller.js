angular.module('database').controller('DatabasesController', ['Database', DatabasesController]);

function DatabasesController(Database) {

    var self = this;

    self.databases = [];

    self.listAll = function () {
        Database.listAll().then(function (resolution) {
            self.databases = resolution.data;
        });
    };

    self.refreshDatabase = function (database) {
        Database.getByName(database.configName).then(function (resolution) {
            database = resolution.data;
        });
    };

    function init() {
        self.listAll();
    }

    init();
}
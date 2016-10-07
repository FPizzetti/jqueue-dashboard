angular.module('database').factory('Database', ['databaseResource', Database]);

function Database(databaseResource) {

    Database.prototype.constructor = Database;

    var self = this;

    self.configName = null;
    self.host = null;
    self.user = null;
    self.database = null;

    self.listAll = function () {
        return databaseResource.listAll();
    };

    self.getByName = function (configName) {
        return databaseResource.getByName(configName);
    };

    self.getQueues = function (configName) {
        return databaseResource.getQueues(configName);
    };

    return self;
}
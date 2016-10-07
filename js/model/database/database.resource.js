angular.module('database', []).factory('databaseResource', ['webservice', databaseResource]);

function databaseResource(webservice) {

    function listAll() {
        return webservice.doGet('/databases');
    }

    function getByName(dbName) {
        return webservice.doGet('/databases/' + dbName);
    }

    function getQueues(dbName) {
        return webservice.doGet('/databases/' + dbName + '/queues');
    }

    return {
        listAll: listAll,
        getByName: getByName,
        getQueues: getQueues
    };
}
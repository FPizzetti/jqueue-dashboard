angular.module('queue', []).factory('queueResource', ['webservice', queueResource]);

function queueResource(webservice) {

    function getByName(dbName, queue) {
        return webservice.doGet('/databases/' + dbName + '/queues/' + queue);
    }

    function getMessages(dbName, queue) {
        return webservice.doGet('/databases/' + dbName + '/queues/' + queue + '/messages');
    }

    return {
        getByName: getByName,
        getMessages: getMessages
    };
}
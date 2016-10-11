angular.module('queue', []).factory('queueResource', ['webservice', queueResource]);

function queueResource(webservice) {

    function getByName(dbName, queue) {
        return webservice.doGet('/databases/' + dbName + '/queues/' + queue);
    }

    function getMessages(dbName, queue) {
        return webservice.doGet('/databases/' + dbName + '/queues/' + queue + '/messages');
    }

    function drop(dbName, queue) {
        return webservice.doDelete('/databases/' + dbName + '/queues/' + queue);
    }

    function enqueue(dbName, queue, message) {
        return webservice.doPost('/databases/' + dbName + '/queues/' + queue + '/messages', message);
    }

    function update(dbName, queue, params) {
        return webservice.doPut('/databases/' + dbName + '/queues/' + queue, params);
    }

    return {
        getByName: getByName,
        getMessages: getMessages,
        drop: drop,
        enqueue: enqueue,
        update: update
    };
}
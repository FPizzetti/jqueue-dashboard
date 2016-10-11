angular.module('message', []).factory('messageResource', ['webservice', messageResource]);

function messageResource(webservice) {

    function getMessagesByQuery(db, queue, params) {
        return webservice.doGet('/databases/' + db + '/queues/' + queue + '/messages', params);
    }

    function updateById(db, queue, params) {
        return webservice.doPatch('/databases/' + db + '/queues/' + queue + '/messages/' + params.id, params);
    }

    function updateByFilter(db, queue, filter, messageParams) {
        return webservice.doPatch('/databases/' + db + '/queues/' + queue + '/messages', messageParams, filter);
    }

    function deleteById(db, queue, id) {
        return webservice.doDelete('/databases/' + db + '/queues/' + queue + '/messages/' + id);
    }

    function deleteByFilter(db, queue, filter) {
        return webservice.doDelete('/databases/' + db + '/queues/' + queue + '/messages', filter);
    }

    return {
        getMessagesByQuery: getMessagesByQuery,
        updateById: updateById,
        updateByFilter: updateByFilter,
        deleteById: deleteById,
        deleteByFilter: deleteByFilter
    };
}
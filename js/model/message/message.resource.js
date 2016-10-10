angular.module('message', []).factory('messageResource', ['webservice', messageResource]);

function messageResource(webservice) {

    function getMessagesByQuery(db, queue, data, status, createdAtStart, createdAtEnd, modifiedAtStart, modifiedAtEnd) {

        var params = {
            data: data,
            status: status,
            created_at_start: createdAtStart,
            created_at_end: createdAtEnd,
            modified_at_start: modifiedAtStart,
            modified_at_end: modifiedAtEnd
        };

        return webservice.doGet('/databases/' + db + '/queues/' + queue + '/messages', params);
    };

    return {
        getMessagesByQuery: getMessagesByQuery
    };
}
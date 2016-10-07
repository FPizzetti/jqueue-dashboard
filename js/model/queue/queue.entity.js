angular.module('queue').factory('Queue', ['queueResource', Queue]);

function Queue(queueResource) {

    Queue.prototype.constructor = Queue;

    var self = this;

    self.getByName = function (dbName, queue) {
        return queueResource.getByName(dbName, queue);
    };

    self.getMessages = function (dbName, queue) {
        return queueResource.getMessages(dbName, queue);
    };

    return self;
}
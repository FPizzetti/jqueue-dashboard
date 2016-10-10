angular.module('message').factory('Message', ['messageResource', Message]);

function Message(messageResource) {

    Message.prototype.constructor = Message;

    var self = this;

    self.getMessagesByQuery = function (db, queue, data, status, createdAtStart, createdAtEnd, modifiedAtStart, modifiedAtEnd) {
        return messageResource.getMessagesByQuery(db, queue, data, status, createdAtStart, createdAtEnd, modifiedAtStart, modifiedAtEnd);
    };

    return self;
}
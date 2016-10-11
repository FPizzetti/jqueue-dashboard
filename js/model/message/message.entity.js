angular.module('message').factory('Message', ['messageResource', Message]);

function Message(messageResource) {

    Message.prototype.constructor = Message;

    var self = this;

    self.getMessagesByQuery = function (db, queue, params) {
        return messageResource.getMessagesByQuery(db, queue, params);
    };

    self.updateById = function (db, queue, params) {
        return messageResource.updateById(db, queue, params);
    };

    self.updateByFilter = function (db, queue, filter, messageParams) {
        return messageResource.updateByFilter(db, queue, messageParams);
    };

    self.deleteById = function (db, queue, id) {
        return messageResource.deleteById(db, queue, id);
    };

    self.deleteByFilter = function (db, queue, filter) {
        return messageResource.deleteByFilter(db, queue, filter);
    };


    return self;
}
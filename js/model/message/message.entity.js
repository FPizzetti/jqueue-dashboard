angular.module('message').factory('Message', ['messageResource', Message]);

function Message(messageResource) {

    Message.prototype.constructor = Message;

    var self = this;

    return self;
}
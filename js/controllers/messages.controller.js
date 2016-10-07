angular.module('database').controller('MessagesController', ['messages', '$stateParams', MessagesController]);

function MessagesController(messages, $stateParams) {

    var self = this;

    self.messages = messages.data;
    self.database = $stateParams.db;
    self.queue = $stateParams.queue;
}
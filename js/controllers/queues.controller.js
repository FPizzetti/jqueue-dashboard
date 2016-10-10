angular.module('database').controller('QueuesController', ['queues', 'ModalService', '$stateParams', 'Queue', QueuesController]);

function QueuesController(queues, ModalService, $stateParams, Queue, Database) {

    var self = this;

    self.queues = queues.data;
    self.database = $stateParams.db;

    self.refreshQueues = function () {
        Database.getQueues(self.database).then(function (resolution) {
            self.queues = resolution.data;
        });
    };

    self.dropQueue = function (queue) {
        ModalService.confirmationDropQueue().then(function () {
            Queue.drop(self.database, queue).then(function () {
                self.refreshQueues();
                swal('Done!', 'Queue was dropped', 'success');
            });
        });
    };

    self.enqueueMessage = function (queue) {
        ModalService.enqueueMessage(self.database, queue).result.then(function () {
            self.refreshQueues();
        });
    };

    self.editQueue = function (queue) {
        ModalService.confirmationUpdateQueue().then(function () {
            ModalService.editQueue(queue).result.then(function () {
                self.refreshQueues();
            });
        });
    };
}
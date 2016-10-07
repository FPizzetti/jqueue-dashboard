angular.module('database').controller('QueuesController', ['queues', '$state', '$stateParams', QueuesController]);

function QueuesController(queues, $state, $stateParams) {

    var self = this;

    self.queues = queues.data;
    self.database = $stateParams.db;
    self.queue = $stateParams.queue;
    console.log(self.database);

    self.openQueue = function () {
        $state.go();
    };
}
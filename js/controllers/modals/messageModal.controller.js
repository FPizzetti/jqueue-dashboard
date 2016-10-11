angular.module('database').controller('MessageModalController', ['database', 'queue', 'Queue', '$scope', '$uibModalInstance', MessageModalController]);

function MessageModalController(database, queue, Queue, $scope, $uibModalInstance) {

    var self = this;

    self.database = database;
    self.queue = queue;

    $scope.priority = 0;
    $scope.delay = 0;

    $scope.enqueue = function () {

        var params = {
            data: $scope.data,
            delay: $scope.delay,
            priority: $scope.priority
        };

        Queue.enqueue(self.database, self.queue, params).then(function () {
            $uibModalInstance.close();
        }, function (err) {
            alert(err.data);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}
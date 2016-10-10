angular.module('database').controller('QueueModalController', ['database', 'queue', 'Queue', '$scope', '$uibModalInstance', QueueModalController]);

function QueueModalController(db, queue, Queue, $scope, $uibModalInstance) {

    var self = this;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}
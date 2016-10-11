angular.module('database').controller('QueueModalController', ['database', 'queue', 'Queue', '$scope', '$uibModalInstance', QueueModalController]);

function QueueModalController(database, queue, Queue, $scope, $uibModalInstance) {

    var self = this;

    function init() {
        Queue.getByName(database, queue).then(function (resolution) {
            $scope.storageType = resolution.data.ENGINE.toLowerCase() !== 'memory' ? 'disk' : 'memory';
        });
    }

    $scope.save = function () {
        Queue.update(database, queue, {ephemeral: $scope.storageType === 'memory'}).then(function () {
            $uibModalInstance.close();
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    init();
}
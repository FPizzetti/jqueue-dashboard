angular.module('database').controller('MessageUpdateModalController', ['database', 'queue', '$scope', '$uibModalInstance', MessageUpdateModalController]);

function MessageUpdateModalController(database, queue, $scope, $uibModalInstance) {

    var self = this;

    self.database = database;
    self.queue = queue;

    $scope.update = function () {
        $uibModalInstance.close($scope.status);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}
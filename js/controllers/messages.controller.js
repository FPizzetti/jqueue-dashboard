angular.module('database').controller('MessagesController', ['messages', 'queueInfo', '$stateParams', 'Queue', '$scope', '$timeout', MessagesController]);

function MessagesController(messages, queueInfo, $stateParams, Queue, $scope, $timeout) {

    var self = this;

    self.database = $stateParams.db;
    self.queue = $stateParams.queue;

    self.messages = messages.data;
    self.filtered = angular.copy(messages.data);
    $scope.filteredItems = self.messages.length;
    $scope.totalItems = self.messages.length;

    self.queueInfo = queueInfo.data;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.filter = function () {
        $timeout(function () {
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };

    $scope.entryLimit = 10;
    $scope.currentPage = 1;

    self.refreshInfo = function () {
        Queue.getByName(self.database, self.queue).then(function (resolution) {
            self.queueInfo = resolution.data;
        });
    };

    self.refreshMessages = function () {
        self.messages = [];
        Queue.getMessages(self.database, self.queue).then(function (resolution) {
            self.messages = resolution.data;
            self.filtered = angular.copy(resolution.data);
            $scope.filteredItems = self.messages.length;
            $scope.totalItems = self.messages.length;
        });
    };

    self.massiveDelete = function () {
        swal({
            title: 'Are you sure?',
            text: 'All messages for this filter will be removed',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F44336',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false
        }, function () {
            localStorage.clear();
            swal('Done!', 'messages were deleted', 'success');
        });
    };

    self.massiveUpdate = function () {
        //open message update
    };
}
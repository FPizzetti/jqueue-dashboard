angular.module('database').controller('MessagesController', ['messages', 'queueInfo', '$stateParams', 'Queue', '$scope', '$timeout', 'ModalService', 'Message', '$location', '$state', MessagesController]);

function MessagesController(messages, queueInfo, $stateParams, Queue, $scope, $timeout, ModalService, Message, $location, $state) {

    var self = this;

    $scope.entryLimit = 10;
    $scope.currentPage = 1;

    self.database = $stateParams.db;
    self.queue = $stateParams.queue;

    self.queueInfo = queueInfo.data;
    self.messages = messages.data;
    self.filtered = self.messages;
    $scope.filteredItems = self.filtered.length;
    $scope.totalItems = self.messages.length;

    $scope.verifySelectAll = function () {
        self.filtered.forEach(function (msg) {
            msg.isSelected = $scope.selectAll;
        });
    };

    $scope.filter = function () {
        $timeout(function () {
            $scope.filteredItems = self.filtered.length;
        }, 10);
    };

    self.advancedFilter = function () {
        var params = {
            data: $scope.data || $state.params.data,
            status: $scope.status || $state.params.status,
            created_at_start: $scope.createdAtStart || $state.params.created_at_start,
            created_at_end: $scope.createdAtEnd || $state.params.created_at_end,
            modified_at_start: $scope.modifiedAtStart || $state.params.modified_at_start,
            modified_at_end: $scope.modifiedAtEnd || $state.params.modified_at_end
        };


        $location.search(params);
        Message.getMessagesByQuery(self.database, self.queue, $scope.data, $scope.status, $scope.createdAtStart, $scope.createdAtEnd, $scope.modifiedAtStart, $scope.modifiedAtEnd).then(function (resolution) {
            self.messages = resolution.data;
            self.filtered = self.messages;
            $scope.filteredItems = self.filtered.length;
            $scope.totalItems = self.messages.length;
        });
    };

    self.refreshInfo = function () {
        Queue.getByName(self.database, self.queue).then(function (resolution) {
            self.queueInfo = resolution.data;
        });
    };

    self.refreshMessages = function () {
        self.messages = [];
        Queue.getMessages(self.database, self.queue).then(function (resolution) {
            self.messages = resolution.data;
            self.filtered = self.messages;
            $scope.filteredItems = self.filtered.length;
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

    self.enqueue = function () {
        ModalService.enqueueMessage(self.database, self.queue).result.then(function () {
            self.refreshMessages();
        });
    };

    self.massiveUpdate = function () {
        ModalService.messageModal(self.database, self.queue).result.then(function () {
            self.refreshMessages();
        });
    };

    function init() {
        console.log($state);
        $scope.data = $scope.data || $state.params.data;
        $scope.status = $scope.status || $state.params.status;
        $scope.createdAtStart = $scope.createdAtStart || $state.params.created_at_start;
        $scope.createdAtEnd = $scope.createdAtEnd || $state.params.created_at_end;
        $scope.modifiedAtStart = $scope.modifiedAtStart || $state.params.modified_at_start;
        $scope.modifiedAtEnd = $scope.modifiedAtEnd || $state.params.modified_at_end;
    }

    init();
}
angular.module('database').controller('MessagesController', ['messages', 'queueInfo', '$stateParams', 'Queue', '$scope', '$timeout', 'ModalService', 'Message', '$location', '$filter', MessagesController]);

function MessagesController(messages, queueInfo, $stateParams, Queue, $scope, $timeout, ModalService, Message, $location, $filter) {

    var filter = $filter('filter');
    var self = this;

    self.entryLimit = 10;
    self.currentPage = 1;

    self.database = $stateParams.db;
    self.queue = $stateParams.queue;

    self.queueInfo = queueInfo.data;
    self.messages = messages.data;
    self.filtered = self.messages;

    self.verifySelectAll = function () {
        self.filtered.forEach(function (msg) {
            msg.isSelected = self.selectAll;
        });
    };

    self.filter = function () {
        $timeout(function () {
            self.filtered = filter(self.messages, {$: self.search});
        });
    };

    self.advancedFilter = function () {
        var currentParams = $location.search();

        var params = {
            data: $scope.data || currentParams.data,
            status: $scope.status || currentParams.status,
            created_at_start: $scope.createdAtStart || currentParams.created_at_start,
            created_at_end: $scope.createdAtEnd || currentParams.created_at_end,
            modified_at_start: $scope.modifiedAtStart || currentParams.modified_at_start,
            modified_at_end: $scope.modifiedAtEnd || currentParams.modified_at_end
        };

        $location.search(params);
        Message.getMessagesByQuery(self.database, self.queue, params).then(function (resolution) {
            self.messages = resolution.data;
            self.filtered = self.messages;
        });
    };

    self.refreshInfo = function () {
        Queue.getByName(self.database, self.queue).then(function (resolution) {
            self.queueInfo = resolution.data;
        });
    };

    self.refreshMessages = function () {
        self.messages = [];
        self.filtered = [];
        self.selectAll = false;
        $location.search({});
        Queue.getMessages(self.database, self.queue).then(function (resolution) {
            self.messages = resolution.data;
            self.filtered = self.messages;
        });
    };

    self.massiveDelete = function () {
        ModalService.confirmationDeleteMessage('It will delete all messages for this filter').then(function () {
            var queryParams = $location.search();
            Message.deleteByFilter(self.database, self.queue, queryParams).then(function () {
                self.refreshMessages();
            });
        });
    };

    self.massiveUpdate = function () {
        ModalService.updateMessage(self.database, self.queue).result.then(function (status) {
            var params = {status: status};
            var queryParams = $location.search();
            Message.updateByFilter(self.database, self.queue, queryParams, params).then(function () {
                self.refreshMessages();
            });
        });
    };

    self.enqueue = function () {
        ModalService.enqueueMessage(self.database, self.queue).result.then(function () {
            self.refreshMessages();
        });
    };

    self.deleteSelected = function () {
        ModalService.confirmationDeleteMessage('It will delete all selected messages').then(function () {
            self.filtered.forEach(function (message) {
                if (message.isSelected) {
                    Message.deleteById(self.database, self.queue, message.id).then(function () {
                        self.refreshMessages();
                    });
                }
            });
        });
    };

    self.deleteMessage = function (message) {
        ModalService.confirmationDeleteMessage('It will delete this message').then(function () {
            Message.deleteById(self.database, self.queue, message.id).then(function () {
                self.refreshMessages();
            });
        });
    };

    self.updateSelected = function () {
        var messages = [];
        self.filtered.forEach(function (message) {
            if (message.isSelected) {
                messages.push(message);
            }
        });
        ModalService.updateMessage(self.database, self.queue).result.then(function (status) {
            messages.forEach(function (message) {
                var params = {
                    id: message.id,
                    status: status
                };
                Message.updateById(self.database, self.queue, params).then(function () {
                    self.refreshMessages();
                }, function (err) {
                    console.log(err);
                });
            });
        });
    };

    self.updateMessage = function (message) {
        ModalService.updateMessage(self.database, self.queue).result.then(function (status) {
            var params = {
                id: message.id,
                status: status
            };
            Message.updateById(self.database, self.queue, params).then(function () {
                self.refreshMessages();
            });
        });
    };

    function init() {
        var params = $location.search();
        $scope.data = params.data;
        $scope.status = params.status;
        $scope.createdAtStart = params.created_at_start;
        $scope.createdAtEnd = params.created_at_end;
        $scope.modifiedAtStart = params.modified_at_start;
        $scope.modifiedAtEnd = params.modified_at_end;
    }

    init();
}
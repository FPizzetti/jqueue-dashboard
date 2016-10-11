angular.module('common')
    .service('ModalService', ['$uibModal', '$q', ModalService]);

function ModalService($uibModal, $q) {
    this.enqueueMessage = function (database, queue) {
        return $uibModal.open({
            animation: true,
            templateUrl: 'views/jqueue/modals/message.modal.html',
            controller: 'MessageModalController as messageModalCtrl',
            size: 'md',
            backdrop: true,
            resolve: {
                database: function () {
                    return database;
                },
                queue: function () {
                    return queue;
                }
            }
        });
    };

    this.editQueue = function (database, queue) {
        return $uibModal.open({
            animation: true,
            templateUrl: 'views/jqueue/modals/queue.modal.html',
            controller: 'QueueModalController as queueModalCtrl',
            size: 'md',
            backdrop: true,
            resolve: {
                database: function () {
                    return database;
                },
                queue: function () {
                    return queue;
                }
            }
        });
    };

    this.confirmationDropQueue = function (queue) {
        var deferred = $q.defer();

        swal({
            title: 'Are you sure?',
            text: 'You will delete this queue with all its data',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F44336',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false
        }, function (res) {
            if (res) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });

        return deferred.promise;
    };

    this.confirmationUpdateQueue = function (queue) {
        var deferred = $q.defer();

        swal({
            title: 'Are you sure?',
            text: 'Updating this queue with delete all its data',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F44336',
            confirmButtonText: 'Go ahead!',
            closeOnConfirm: true
        }, function (res) {
            if (res) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });

        return deferred.promise;
    };

    this.confirmationDeleteMessage = function (msg) {
        var deferred = $q.defer();
        swal({
            title: 'Are you sure?',
            text: msg,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F44336',
            confirmButtonText: 'Yes, delete!',
            closeOnConfirm: true
        }, function (res) {
            if (res) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    };

    this.updateMessage = function () {
        return $uibModal.open({
            animation: true,
            templateUrl: 'views/jqueue/modals/messageUpdate.modal.html',
            controller: 'MessageUpdateModalController as messageUpdateModalCtrl',
            size: 'sm',
            backdrop: true,
            resolve: {
                database: function () {
                    return database;
                },
                queue: function () {
                    return queue;
                }
            }
        });
    };
}
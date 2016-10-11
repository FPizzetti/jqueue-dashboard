materialAdmin
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/databases');

        $stateProvider
            .state('databases', {
                url: '/databases',
                controller: 'DatabasesController',
                controllerAs: 'databaseCtrl',
                templateUrl: 'views/jqueue/databases.html'
            })

            .state('databases/:db/queues', {
                url: '/databases/:db/queues',
                controller: 'QueuesController',
                controllerAs: 'queuesCtrl',
                templateUrl: 'views/jqueue/queues.html',
                resolve: {
                    queues: ['$stateParams', 'Database', function ($stateParams, Database) {
                        return Database.getQueues($stateParams.db);
                    }]
                }
            })

            .state('databases/:db/queues/:queue', {
                url: '/databases/:db/queues/:queue',
                controller: 'MessagesController',
                controllerAs: 'messagesCtrl',
                templateUrl: 'views/jqueue/messages.html',
                reloadOnSearch: true,
                resolve: {
                    messages: ['$stateParams', '$location', 'Message', function ($stateParams, $location, Message) {
                        var params = $location.search();
                        return Message.getMessagesByQuery($stateParams.db, $stateParams.queue, params);
                    }],
                    queueInfo: ['$stateParams', 'Queue', function ($stateParams, Queue) {
                        return Queue.getByName($stateParams.db, $stateParams.queue);
                    }]
                }
            })
    });



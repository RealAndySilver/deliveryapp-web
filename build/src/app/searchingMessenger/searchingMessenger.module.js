(function(module) {

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('searchingMessenger', {
            url: '/searchingmessenger/:delivery_id',
            views: {
                "main": {
                    controller: 'SearchingMessengerController as model',
                    templateUrl: 'searchingMessenger/searchingMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'SearchingMessenger' }
        });
    }]);

}(angular.module("appMensajeria.searchingMessenger", [
    'ui.router'
])));

(function(module) {

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('searchingMessenger', {
            url: '/searchingmessenger/:delivery_id',
            views: {
                "main": {
                    controller: 'SearchingMessengerController as model',
                    templateUrl: 'searchingMessenger/searchingMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'SearchingMessenger' }
        });
    }]);

}(angular.module("appMensajeria.searchingMessenger", [
    'ui.router'
])));

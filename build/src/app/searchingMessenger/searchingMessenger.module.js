(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('searchingMessenger', {
            url: '/searchingmessenger',
            views: {
                "main": {
                    controller: 'SearchingMessengerController as model',
                    templateUrl: 'searchingMessenger/searchingMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'SearchingMessenger' }
        });
    });

}(angular.module("appMensajeria.searchingMessenger", [
    'ui.router'
])));

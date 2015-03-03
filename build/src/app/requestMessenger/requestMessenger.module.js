(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('requestMessenger', {
            url: '/requestmessenger/:id',
            views: {
                "main": {
                    controller: 'RequestMessengerController as model',
                    templateUrl: 'requestMessenger/requestMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'RequestMessenger' }
        });
    });

}(angular.module("appMensajeria.requestMessenger", [
    'ui.router'
])));

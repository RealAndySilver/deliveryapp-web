(function(module) {

    module.config(function($stateProvider) {
        $stateProvider.state('loginMessenger', {
            url: '/loginMessenger',
            views: {
                "main": {
                    controller: 'LoginMessengerController as model',
                    templateUrl: 'loginMessenger/loginMessenger.tpl.html'
                }
            },
            data: {
                pageTitle: 'LoginMessenger'
            }
        });
    });

}(angular.module("appMensajeria.loginMessenger", [
    'ui.router',
])));
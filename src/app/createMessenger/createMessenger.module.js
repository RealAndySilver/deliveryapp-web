(function(module) {
    module.config(function ($stateProvider) {
        $stateProvider.state('createMessenger', {
            url: '/createMessenger',
            views: {
                "main": {
                    controller: 'CreateMessengerController as model',
                    templateUrl: 'createMessenger/createMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'CreateMesssenger' }
        });
    });

}(angular.module("appMensajeria.createMessenger", [
    'ui.router',
    'ui.bootstrap'
])));


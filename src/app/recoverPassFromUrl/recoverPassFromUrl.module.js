(function(module) {
//http://localhost:9000/#/recoverpassfromurl/JDJhJDEwJHZOG9x/user/new_password/ingwilsonnava@gmail.com
    module.config(function ($stateProvider) {
        $stateProvider.state('recoverPassFromUrl', {
            url: '/recoverpassfromurl/:token/:type/:case/:email',
            views: {
                "main": {
                    controller: 'RecoverPassFromUrlController as model',
                    templateUrl: 'recoverPassFromUrl/recoverPassFromUrl.tpl.html'
                }
            },
            data:{ pageTitle: 'RecoverPassFromUrl' }
        });
    });

}(angular.module("appMensajeria.recoverPassFromUrl", [
    'ui.router'
])));

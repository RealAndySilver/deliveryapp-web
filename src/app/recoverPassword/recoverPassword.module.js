(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('recoverPassword', {
            url: '/recoverpassword',
            views: {
                "main": {
                    controller: 'RecoverPasswordController as model',
                    templateUrl: 'recoverPassword/recoverPassword.tpl.html'
                }
            },
            data:{ pageTitle: 'RecoverPassword' }
        });
    });

}(angular.module("appMensajeria.recoverPassword", [
    'ui.router'
])));

(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('AccountActivation', {
            url: '/account_activation/:type/:email',
            views: {
                "main": {
                    controller: 'AccountActivationController as model',
                    templateUrl: 'AccountActivation/AccountActivation.tpl.html'
                }
            },
            data:{ pageTitle: 'AccountActivation' }
        });
    });

}(angular.module("appMensajeria.AccountActivation", [
    'ui.router'
])));

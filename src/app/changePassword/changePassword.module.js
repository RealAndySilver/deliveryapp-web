(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('changePassword', {
            url: '/changepassword/:id',
            views: {
                "main": {
                    controller: 'ChangePasswordController as model',
                    templateUrl: 'changePassword/changePassword.tpl.html'
                }
            },
            data:{ pageTitle: 'ChangePassword' }
        });
    });

}(angular.module("appMensajeria.changePassword", [
    'ui.router'
])));

(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('confirmPassword', {
            url: '/confirmpassword',
            views: {
                "main": {
                    controller: 'ConfirmPasswordController as model',
                    templateUrl: 'confirmPassword/confirmPassword.tpl.html'
                }
            },
            data:{ pageTitle: 'ConfirmPassword' }
        });
    });

}(angular.module("appMensajeria.confirmPassword", [
    'ui.router'
])));

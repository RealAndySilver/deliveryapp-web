(function(module) {

    module.config(function($stateProvider) {
        $stateProvider.state('loginUser', {
            url: '/loginuser',
            views: {
                "main": {
                    controller: 'LoginUserController as model',
                    templateUrl: 'loginUser/loginUser.tpl.html'
                }
            },
            data: {
                pageTitle: 'LoginUser'
            }
        });
    });

}(angular.module("appMensajeria.loginUser", [
    'ui.router',
])));
(function(module) {

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('createUser', {
            url: '/createuser',
            views: {
                "main": {
                    controller: 'CreateUserController as model',
                    templateUrl: 'createUser/createUser.tpl.html'
                }
            },
            data:{ pageTitle: 'CreateUser' }
        });
    }]);

}(angular.module("appMensajeria.createUser", [
    'ui.router'
])));

(function(module) {

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('createUser', {
            url: '/createuser',
            views: {
                "main": {
                    controller: 'CreateUserController as model',
                    templateUrl: 'createUser/createUser.tpl.html'
                }
            },
            data:{ pageTitle: 'CreateUser' }
        });
    }]);

}(angular.module("appMensajeria.createUser", [
    'ui.router'
])));

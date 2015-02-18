(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/loginuser');
    });

    app.run(function () {});

    app.controller('AppController', function ($scope) {

    });

}(angular.module("appMensajeria", [
    'appMensajeria.home',
    'appMensajeria.about',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'appMensajeria.loginUser',
])));

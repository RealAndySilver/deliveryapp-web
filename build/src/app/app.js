(function(app) {

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/loginuser');
    }]);

    app.run(function() {});

    app.controller('AppController', ['$scope', function($scope) {

    }]);

    //inicializa el usuario que se va a guardar en local storage
    app.value('User', {});

}(angular.module("appMensajeria", [
    'appMensajeria.home',
    'appMensajeria.about',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'appMensajeria.loginUser',
    'appMensajeria.createUser',
    'ngMaterial',
    'appMensajeria.serverComunicator',
    'appMensajeria.confirmPassword',
    'appMensajeria.requestMessenger',
    'appMensajeria.userMap',
    'angularReverseGeocode',
    'appMensajeria.session',
    'mdDateTime',
    'appMensajeria.getPrice',
    'appMensajeria.getAddresses',
])));
(function(app) {    app.config(function($stateProvider, $urlRouterProvider) {        $urlRouterProvider.otherwise('/loginuser');    });    app.run(function() {});    app.controller('AppController', function($state) {        var model = this;        model.goProfile = function() {            $state.go('profile');        };        model.goRequestService = function() {            $state.go('requestMessenger');        };        model.goActiveServices = function() {            $state.go('activeServices');        };        model.goCompletedServices = function() {            $state.go('completedServices');        };        model.goAbortedServices = function() {            $state.go('abortedServices');        };        model.goTermsConditions = function() {            $state.go('termsConditions');        };        model.logOut = function() {            $state.go('loginUser');        };    });    //inicializa el usuario que se va a guardar en local storage    app.value('User', {});    app.value("ShowMenu",true);    app.value('PickupAddresses', []);    app.value('DeliveryAddresses', []);}(angular.module("appMensajeria", [    'appMensajeria.getAddresses',    'appMensajeria.home',    'appMensajeria.about',    'templates-app',    'templates-common',    'ui.router.state',    'ui.router',    'ui.bootstrap',    'appMensajeria.loginUser',    'appMensajeria.createUser',    'ngMaterial',    'appMensajeria.serverComunicator',    'appMensajeria.confirmPassword',    'appMensajeria.requestMessenger',    'appMensajeria.userMap',    'angularReverseGeocode',    'appMensajeria.session',    'mdDateTime',    'appMensajeria.getPrice',    'appMensajeria.recoverPassword',    'appMensajeria.searchingMessenger',    'appMensajeria.serviceDetails',    'appMensajeria.profile',    'appMensajeria.alerts',    'appMensajeria.changePassword',    'appMensajeria.activeServices',    'appMensajeria.completedServices',    'appMensajeria.abortedServices',    'appMensajeria.termsConditions',    'appMensajeria.ratingMessenger',])));
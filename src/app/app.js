(function(app) {    var sectionSelected = null;        app.config(function($stateProvider, $urlRouterProvider) {        $urlRouterProvider.otherwise('/loginuser');    });    app.run(['$rootScope', '$state', function($rootScope, $state) {        /*validation to redirect login if user is not logged in and        to redirect to admin profile if it's opposite case*/        $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromStatate, fromParams) {            if (toState.name === 'loginUser') {                if (sessionStorage.getItem("user")) {                    e.preventDefault();                    $state.go("requestMessenger");                }                return;            }            if (!sessionStorage.getItem("user")) {                if (!(toState.name === 'createMessenger' ||                    toState.name === 'createUser' ||                    toState.name === 'recoverPassword' || toState.name === 'recoverPassFromUrl'||                    toState.name === 'redirect'|| toState.name === 'AccountActivation' ||                    toState.name === 'uploadFilesMessenger')) {                    e.preventDefault();                    $state.go("loginUser");                }            }        });    }]);    app.service('Navbar', [function() {        this.getVisibility = function() {            if (sessionStorage.getItem("user")) {                return true;            } else {                return false;            }        };    }]);    app.controller('AppController', ['$state', '$scope', 'User', 'Navbar',"LogOut",'ServerComunicator', function($state, $scope, User, Navbar,LogOut,ServerComunicator) {        var model = this;        model.showServicesBool = false;                model.turnShowServices=function(){            if(model.showServicesBool){                model.showServicesBool=false;            }else{                model.showServicesBool=true;            }        };        model.goProfile = function() {            $state.go('profile');        };        model.goBilling = function() {            $state.go('billing');        };        model.goRequestService = function() {            $state.go('requestMessenger');        };        model.goActiveServices = function() {            $state.go('activeServices');        };        model.goCompletedServices = function() {            $state.go('completedServices');        };        model.goAbortedServices = function() {            $state.go('abortedServices');        };        model.goTermsConditions = function() {            $state.go('termsConditions');        };        model.logOut = function() {            LogOut.logOutFunction();        };        model.activeMenuButton = function(sectioName){            return sectionSelected===sectioName?"active":"";        };        model.getEndPoint=function(){            return ServerComunicator.getEndpoint;        };        model.getVisibility = Navbar.getVisibility;    }]);    app.value('User', {});    app.value("ShowMenu", true);    app.value('PickupAddresses', []);    app.value('DeliveryAddresses', []);}(angular.module("appMensajeria", [    'appMensajeria.getAddresses',    'appMensajeria.home',    'appMensajeria.about',    'templates-app',    'templates-common',    'ui.router.state',    'ui.router',    'ui.bootstrap',    'appMensajeria.loginUser',    'appMensajeria.createUser',    'ngMaterial',    'appMensajeria.serverComunicator',    'appMensajeria.confirmPassword',    'appMensajeria.requestMessenger',    'appMensajeria.userMap',    'angularReverseGeocode',    'appMensajeria.session',    'mdDateTime',    'appMensajeria.getPrice',    'appMensajeria.recoverPassword',    'appMensajeria.searchingMessenger',    'appMensajeria.serviceDetails',    'appMensajeria.profile',    'appMensajeria.alerts',    'appMensajeria.logOut',    'appMensajeria.changePassword',    'appMensajeria.activeServices',    'appMensajeria.completedServices',    'appMensajeria.abortedServices',    'appMensajeria.termsConditions',    'appMensajeria.ratingMessenger',    'appMensajeria.recoverPassFromUrl',    'appMensajeria.AccountActivation',    'appMensajeria.createMessenger',    'appMensajeria.loginMessenger',    'appMensajeria.uploadFilesMessenger',    'appMensajeria.ValidationService',    'appMensajeria.dvAddCreditCard',    'bootstrap-modal',    'bootstrap-loading',    'appMensajeria.downloadApp',    "ngMap",    'appMensajeria.billing',])));
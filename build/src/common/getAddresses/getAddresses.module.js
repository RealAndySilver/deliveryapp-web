(function(module) {

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('getAddresses', {
            url: '/getaddresses',
            views: {
                "main": {
                    controller: 'GetAddressesController as model',
                    templateUrl: 'getAddresses/getAddresses.tpl.html'
                }
            },
            data:{ pageTitle: 'GetAddresses' }
        });
    }]);

}(angular.module("appMensajeria.getAddresses", [
    'ui.router'
])));

(function(module) {

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('getAddresses', {
            url: '/getaddresses',
            views: {
                "main": {
                    controller: 'GetAddressesController as model',
                    templateUrl: 'getAddresses/getAddresses.tpl.html'
                }
            },
            data:{ pageTitle: 'GetAddresses' }
        });
    }]);

}(angular.module("appMensajeria.getAddresses", [
    'ui.router'
])));

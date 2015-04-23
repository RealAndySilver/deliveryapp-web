(function (module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('activeServices', {
            url: '/activeservices',
            views: {
                "main": {
                    controller: 'ActiveServicesController as model',
                    templateUrl: 'activeServices/activeServices.tpl.html'
                }
            },
            data: {
                pageTitle: 'ActiveServices'
            }
        });
    });

}(angular.module("appMensajeria.activeServices", [
    'ui.router'
])));
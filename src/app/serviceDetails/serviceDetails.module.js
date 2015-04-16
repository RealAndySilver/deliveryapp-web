(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('serviceDetails', {
            url: '/servicedetails/:id',
            views: {
                "main": {
                    controller: 'ServiceDetailsController as model',
                    templateUrl: 'serviceDetails/serviceDetails.tpl.html'
                }
            },
            data:{ pageTitle: 'ServiceDetails' }
        });
    });

}(angular.module("appMensajeria.serviceDetails", [
    'ui.router'
])));

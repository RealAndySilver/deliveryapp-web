(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('billing', {
            url: '/billing',
            views: {
                "main": {
                    controller: 'BillingController as model',
                    templateUrl: 'billing/billing.tpl.html'
                }
            },
            data:{ pageTitle: 'Billing' }
        });
    });

}(angular.module("appMensajeria.billing", [
    'ui.router'
])));

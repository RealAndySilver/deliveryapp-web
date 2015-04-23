(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('termsConditions', {
            url: '/termsconditions',
            views: {
                "main": {
                    controller: 'TermsConditionsController as model',
                    templateUrl: 'termsConditions/termsConditions.tpl.html'
                }
            },
            data:{ pageTitle: 'TermsConditions' }
        });
    });

}(angular.module("appMensajeria.termsConditions", [
    'ui.router'
])));

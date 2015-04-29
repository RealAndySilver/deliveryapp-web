(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('ratingMessenger', {
            url: '/ratingmessenger/:idItem',
            views: {
                "main": {
                    controller: 'RatingMessengerController as model',
                    templateUrl: 'ratingMessenger/ratingMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'RatingMessenger' }
        });
    });

}(angular.module("appMensajeria.ratingMessenger", [
    'ui.router'
])));

(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider.state('userMap', {
            url: '/usermap',
            views: {
                "main": {
                    controller: 'UserMapController as model',
                    templateUrl: 'userMap/userMap.tpl.html'
                }
            },
            data:{ pageTitle: 'UserMap' }
        });
    });

}(angular.module("appMensajeria.userMap", [
    'ui.router'
])));

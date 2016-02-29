(function(module) {
    module.config(function ($stateProvider) {
        $stateProvider.state('download', {
            url: '/app/download',
            views: {
                "main": {
                    controller: 'DownloadAppController as model',
                    templateUrl: 'DownloadApp/downloadApp.tpl.html'
                }
            },
            data:{ pageTitle: 'DownloadApp' }
        });
    });

}(angular.module("appMensajeria.downloadApp", [
    'ui.router',
    'ui.bootstrap'
])));


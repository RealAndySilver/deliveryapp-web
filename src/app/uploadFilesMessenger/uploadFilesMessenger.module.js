(function(module) {
    module.config(function ($stateProvider) {
        $stateProvider.state('uploadFilesMessenger', {
            url: '/messenger/:id/uploadFiles',
            views: {
                "main": {
                    controller: 'UploadFilesMessengerController as model',
                    templateUrl: 'uploadFilesMessenger/uploadFilesMessenger.tpl.html'
                }
            },
            data:{ pageTitle: 'uploadFiles' }
        });
    });

}(angular.module("appMensajeria.uploadFilesMessenger", [
    'ui.router'
])));

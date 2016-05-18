(function(module) {
    module.config(function ($stateProvider) {
        $stateProvider.state('uploadFilesMessenger', {
            url: '/uploadFilesMessenger/:id',
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

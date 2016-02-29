
(function(module) {
    module.service('UploadFilesMessengerService', ['ServerComunicator', function(ServerComunicator) {
        var model = this;

        init();

        function init() {
            model.uploadFile = function(messengerId,type,file,callback){
                var registerPromise = ServerComunicator.uploadFileByType(
                    messengerId,type,file
                );
                registerPromise.then(
                    function success(response) {
                        //console.log(response);
                        callback({
                            response: response.data.status,
                            msg: response.data.message ||response.data.error,
                            data: response.data.response,
                        });
                    },
                    function error(e) {
                        //console.log(e);
                        callback({
                            response: false,
                            msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
                            error: e,
                        });
                    });
            };
        }

    }]);

}(angular.module("appMensajeria.uploadFilesMessenger")));
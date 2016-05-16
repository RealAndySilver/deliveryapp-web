(function(module) {

    module.service('CreateMessengerService', ['ServerComunicator', function(ServerComunicator) {
        var model = this;

        init();

        function init() {

            model.createMessenger = function(data, callback) {
                var passwordToSend = btoa( data.password );
                var registerPromise = ServerComunicator.createMessenger(
                    data.email, passwordToSend, data.name, data.lastname,
                    data.mobilephone, data.plate, data.identification, data.city
                );
                registerPromise.then(
                    function success(response) {
                        callback({
                            response: response.data.status,
                            msg: response.data.message ||response.data.error,
                            data: response.data,
                        });
                    },
                    function error(e) {
                        callback({
                            response: false,
                            msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
                            error: e,
                        });
                    });
            };

        }
    }]);

}(angular.module("appMensajeria.createMessenger")));

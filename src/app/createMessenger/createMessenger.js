(function (module) {
    module.controller('CreateMessengerController', ['CreateMessengerService', '$state', 'AlertsService', "$scope",
        function (CreateMessengerService, $state, AlertsService, $scope) {
            var model = this;

            model.messenger = {};
            model.cities = [{id: 1, name: "Cúcuta"}, {id: 2, name: "Bogota"}, {id: 3, name: "Bucaramanga"}];
            init();



            function init() {
                model.createMessenger = function () {
                    //console.log(model.messenger);
                    CreateMessengerService.createMessenger(model.messenger, function (response){
                        if (response.response) {
                            $scope.BootstrapModal.show("Mensajero creado Correctamente","Resultado Operación");
                            model.messenger = {};
                            console.log(response);
                            console.log(response.data);
                            console.log(response.data.response);
                            console.log(response.data.response._id);
                            $state.go("uploadFilesMessenger",{ id: response.data.response._id });
                        } else {
                            $scope.BootstrapModal.show(response.msg);
                        }

                    });
                };

                model.cancel = function () {
                    $state.go("loginUser");
                };
            }

    }]);
}(angular.module("appMensajeria.createMessenger")));
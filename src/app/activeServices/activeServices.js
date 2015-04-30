(function(module) {

    module.controller('ActiveServicesController', ["Session", "ActiveServicesService", "$state", "$mdDialog",'AlertsService', function(Session, ActiveServicesService, $state, $mdDialog,AlertsService) {
        var model = this;
        model.User = (Session.getUser());

        init();

        function init() {

            model.getActiveServices = function() {
                ActiveServicesService.getActiveServices(model.User["_id"], function(response) {
                    model.deliveryItems = response.data;
                    console.log(model.deliveryItems);
                    if(!response.data){
                        AlertsService.showAlert(response.msg, "");
                    }else if(model.deliveryItems.length===0){
                        AlertsService.showAlert("No tienes servicios Activos en este momento","");
                    }
                });
            };
            model.getActiveServices();

            model.goToServiceDetails = function(idObject) {
                $state.go('serviceDetails', {
                    id: idObject
                });
            };

        }
    }]);

}(angular.module("appMensajeria.activeServices")));
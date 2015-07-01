(function(module) {

    module.controller('ActiveServicesController', ["Session", "ActiveServicesService", "$state", "$mdDialog",'AlertsService', "LogOut",function(Session, ActiveServicesService, $state, $mdDialog,AlertsService,LogOut) {
        var model = this;
        model.User = (Session.getUser());

        init();

        function init() {

            model.getActiveServices = function() {
                AlertsService.loading();
                ActiveServicesService.getActiveServices(model.User["_id"], function(response) {
                    model.deliveryItems = response.data;
                    console.log("RESPONSE",response);
                    console.log(model.deliveryItems);


                        console.log("LENGTH",model.deliveryItems.length+ "/"+typeof(model.deliveryItems));
                    AlertsService.cancel();
/*
                    if(!response.data){
                        AlertsService.showAlert(response.msg, "");
                    }//else*/
                    if(typeof(model.deliveryItems)==="string"){
                        if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
                                LogOut.logOutFunction();
                            } 
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
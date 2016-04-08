(function(module) {

    module.controller('ActiveServicesController', ["Session", "ActiveServicesService", "$state", "$mdDialog",'AlertsService', "LogOut", "$scope", function(Session, ActiveServicesService, $state, $mdDialog,AlertsService,LogOut, $scope) {
        var model = this;
        model.User = (Session.getUser());

        init();

        function init() {
            model.deliveryAvailables = 0;
            model.deliveryNoAvailables = 0;
            model.getActiveServices = function() {
                $scope.BootstrapLoading.show(true);
                ActiveServicesService.getActiveServices(model.User["_id"], function(response) {
                    model.deliveryItems = response.data;
                    console.log("ACTIVE RESPONSE ", response);
                    console.log(model.deliveryItems);

                    model.deliveryItems.forEach(function(item){
                        if(item.status=='available'){
                            model.deliveryAvailables++;
                        }else{
                            model.deliveryNoAvailables++;
                        }
                    });


                        console.log("LENGTH",model.deliveryItems.length+ "/"+typeof(model.deliveryItems));
                        $scope.BootstrapLoading.show(false);
                    /* if(!response.data){
                        AlertsService.showAlert(response.msg, "");
                    }//else */
                    if(typeof(model.deliveryItems)==="string"){
                        if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
                                LogOut.logOutFunction();
                            } 
                    }else if(model.deliveryItems.length===0){
                        $scope.BootstrapModal.show("No tienes servicios Activos en este momento");
                        //AlertsService.showAlert("No tienes servicios Activos en este momento","");
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
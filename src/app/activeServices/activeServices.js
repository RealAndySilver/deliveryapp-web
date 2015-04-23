(function(module) {

    module.controller('ActiveServicesController', ["Session", "ActiveServicesService","$state", function(Session, ActiveServicesService,$state) {
        var model = this;
        model.User = (Session.getUser());

        init();

        function init() {

            model.getActiveServices = function() {
                ActiveServicesService.getActiveServices(model.User["_id"], function(response) {
                    model.deliveryItems = response.data;
                    console.log(model.deliveryItems);
                });
            };
            model.getActiveServices();

            model.goToServiceDetails=function (idObject){
                $state.go('serviceDetails', {id: idObject});
            };

        }
    }]);

}(angular.module("appMensajeria.activeServices")));
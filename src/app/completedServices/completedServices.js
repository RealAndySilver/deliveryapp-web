(function(module) {

	module.controller('CompletedServicesController', ["Session", 'CompletedServicesService','$state', function(Session, CompletedServicesService,$state) {
		var model = this;
		model.User = (Session.getUser());

		init();

		function init() {

			model.getCompletedServices = function() {
				CompletedServicesService.getCompletedServices(model.User["_id"], function(response) {
					model.deliveryItems = response.data;
					console.log(model.deliveryItems);
				});
			};
			model.getCompletedServices();

			model.goToServiceDetails=function (idObject){
                $state.go('serviceDetails', {id: idObject});
            };

		}
	}]);

}(angular.module("appMensajeria.completedServices")));
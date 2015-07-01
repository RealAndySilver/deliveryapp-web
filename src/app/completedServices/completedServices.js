(function(module) {

	module.controller('CompletedServicesController', ["Session", 'CompletedServicesService', '$state', 'AlertsService',"LogOut", function(Session, CompletedServicesService, $state, AlertsService,LogOut) {
		var model = this;
		model.User = (Session.getUser());

		init();

		function init() {

			model.getCompletedServices = function() {
				AlertsService.loading();
				CompletedServicesService.getCompletedServices(model.User["_id"], function(response) {
					model.deliveryItems = response.data;
					console.log(model.deliveryItems);
					AlertsService.cancel();
					/*if (!response.data) {
						AlertsService.showAlert(response.msg, "");
					} else */


					if (typeof(model.deliveryItems) === "string") {
						if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
							LogOut.logOutFunction();
						}
					}else if (model.deliveryItems.length === 0) {
						AlertsService.showAlert("No se encontraron servicios Completados", "");
					}
				});
			};
			model.getCompletedServices();

			model.goToServiceDetails = function(idObject) {
				$state.go('serviceDetails', {
					id: idObject
				});
			};

		}
	}]);

}(angular.module("appMensajeria.completedServices")));
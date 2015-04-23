(function(module) {

	module.controller('AbortedServicesController', ["AbortedServicesService", "Session", "$state", function(AbortedServicesService, Session, $state) {
		var model = this;
		model.User = (Session.getUser());


		init();

		function init() {
			model.getAbortedServices = function() {
				AbortedServicesService.getAbortedServices(model.User["_id"], function(response) {
					model.deliveryItems = response.data;
					console.log(model.deliveryItems);
				});
			};
			model.getAbortedServices();

			model.goToServiceDetails = function(idObject) {
				$state.go('serviceDetails', {
					id: idObject
				});
			};

		}
	}]);

}(angular.module("appMensajeria.abortedServices")));
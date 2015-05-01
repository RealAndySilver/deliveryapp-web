(function(module) {

	module.controller('AbortedServicesController', ["AbortedServicesService", "Session", "$state", "$mdDialog","AlertsService", function(AbortedServicesService, Session, $state, $mdDialog,AlertsService) {
		var model = this;
		model.User = (Session.getUser());


		init();

		function init() {
			model.getAbortedServices = function() {

				AlertsService.loading();

				AbortedServicesService.getAbortedServices(model.User["_id"], function(response) {
					model.deliveryItems = response.data;
					console.log(response.data);
					AlertsService.cancel();
					if(!response.data){
						AlertsService.showAlert(response.msg, "");
					}else if(model.deliveryItems.length===0){
						AlertsService.showAlert("No se encontraron servicios Abortados","");
					}
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
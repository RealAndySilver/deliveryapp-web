(function(module) {

	module.controller('AbortedServicesController', ["AbortedServicesService", "Session", "$state", "$mdDialog","AlertsService", "LogOut", "$scope",function(AbortedServicesService, Session, $state, $mdDialog,AlertsService,LogOut, $scope){
		var model = this;
		model.User = (Session.getUser());


		init();

		function init() {
			model.getAbortedServices = function() {

				$scope.BootstrapLoading.show(true);

				AbortedServicesService.getAbortedServices(model.User["_id"], function(response) {
					model.deliveryItems = response.data;
					console.log(response.data);
					$scope.BootstrapLoading.show(false);
					/*if(!response.data){
						AlertsService.showAlert(response.msg, "");
					}*/
					if (typeof(model.deliveryItems) === "string") {
						if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
							LogOut.logOutFunction();
						}
					}else if(model.deliveryItems.length===0){
						$scope.BootstrapModal.show("No se encontraron servicios Abortados");
						//AlertsService.showAlert("No se encontraron servicios Abortados","");
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
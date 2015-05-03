(function(module) {

	module.controller('ServiceDetailsController', ["$scope", "$state", '$mdDialog', "$stateParams", "DetailsDeliveryItemService", "User", "AlertsService", "$interval", function($scope, $state, $mdDialog, $stateParams, DetailsDeliveryItemService, User, AlertsService, $interval) {
		var model = this;
		model.messengerBool = false;
		model.reloadBool = false;
		model.leftTime = "10s";
		model.code = "aaaa";

		model.deliveryItemInfo = {};


		init();
		//REVISAR EL RELOAD

		$scope.$watch('reloadBool', function(val) {
			console.log("ENTRO AL WATCH");
				if(val === true) {
					$interval(reloadPage, 5000);
					
				} 
			
		});
		

		function reloadPage() {
			console.log("RECARGOOOOO");
			window.location.reload();
		}


		function init() {


			model.serviceDetails = function() {
				DetailsDeliveryItemService.serviceDetails($stateParams.id, function(response) {
					//console.log(response);

					model.deliveryItemInfo = response.data;
					console.log("EL deliveryItemInfo", model.deliveryItemInfo);

					model.pickupDate = new Date(model.deliveryItemInfo["pickup_time"]);
					model.estimated = new Date(model.deliveryItemInfo["estimated"]);
					nowDate = new Date();
					model.leftTime = parseInt((model.estimated.getTime() - nowDate.getTime()) / 60000);
					if (model.leftTime < 0) {
						model.leftTime = "Retrasado";
					}

					if (response.data.messenger_info) {
						model.messengerBool = true;
						model.reloadBool = false;

					} else {
						model.messengerBool = false;
						model.reloadBool = true;

					}
					console.log("RELOAD BOOL", model.reloadBool);

					if (response.data.images.length !== 0) {

						model.imageBool = true;
						model.images = response.data.images;
					} else {
						model.imageBool = false;

					}

					if (response.data["overall_status"] == "aborted") {
						console.log(response.data["overall_status"]);
						model.serviceStatus = traslateStatusFunction(response.data["overall_status"]);
						model.setAvailableButtonBool = true;
						//Poner la razon por la cual se aborto el servicio

					} else {
						model.serviceStatus = traslateStatusFunction(response.data["status"]);
						model.setAvailableButtonBool = false;

					}

					if (response.data["status"] == "returned" || response.data["status"] == "delivered") {
						model.showCancelButtonBool = false;
						if (model.deliveryItemInfo.rated === false) {
							$state.go('ratingMessenger', {
								idItem: response.data["_id"]
							});
						}
					} else {
						model.showCancelButtonBool = true;
					}
				});


			};

			model.serviceDetails();

			model.cancelService = function() {
				var confirm = $mdDialog.confirm()
					//.parent(angular.element(document.body))
					.title('Alerta')
					.content('Deseas cancelar el servicio.')
					.ariaLabel('')
					.ok('Cancelar')
					.cancel('Volver');
				//.targetEvent(ev);
				$mdDialog.show(confirm).then(function() {
					AlertsService.loading();
					model.deleteDeliveryItem = function() {
						DetailsDeliveryItemService.deleteDeliveryItem(model.deliveryItemInfo._id, model.deliveryItemInfo.user_id, function(response) {
							model.code = 'You decided to get rid of your debt.';
							AlertsService.cancel();
							$state.go('requestMessenger');
							console.log(response);
						});
					};
					model.deleteDeliveryItem();
				});
			};


			model.restartService = function() {
				var confirm = $mdDialog.confirm()
					//.parent(angular.element(document.body))
					.title('Alerta')
					.content('Deseas reiniciar el servicio.')
					.ariaLabel('')
					.ok('Reiniciar')
					.cancel('Volver');
				//.targetEvent(ev);
				$mdDialog.show(confirm).then(function() {
					AlertsService.loading();
					model.restartDeliveryItem = function() {
						AlertsService.cancel();
						DetailsDeliveryItemService.restartDeliveryItem(model.deliveryItemInfo._id, model.deliveryItemInfo.user_id, function(response) {
							console.log(response);
							$state.go('abortedServices');
						});
					};
					model.restartDeliveryItem();
				});
			};



		}
	}]);

}(angular.module("appMensajeria.serviceDetails")));


function traslateStatusFunction(status) {
	var traslateStatus = "";
	if (status == "accepted") {
		traslateStatus = "Aceptado";
	} else
	if (status == "in-transit") {
		traslateStatus = "En tránsito";
	} else
	if (status == "returning") {
		traslateStatus = "Volviendo";
	} else
	if (status == "returned") {
		//cancelService.setVisibility(View.GONE);
		traslateStatus = "Finalizado";
	} else
	if (status == "delivered") {
		//cancelService.setVisibility(View.GONE);
		traslateStatus = "Finalizado";

	} else
	if (status == "aborted") {
		//cancelService.setVisibility(View.GONE);
		traslateStatus = "Abortado";

	}
	return traslateStatus;
}
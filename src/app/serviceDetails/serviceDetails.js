(function(module) {

	module.controller('ServiceDetailsController', ["$scope", "$state", '$mdDialog', "$stateParams", "DetailsDeliveryItemService", "User", "AlertsService", "$interval", function($scope, $state, $mdDialog, $stateParams, DetailsDeliveryItemService, User, AlertsService, $interval) {
		var model = this;
		model.messengerBool = false;
		model.isSearchMessenger = false;
		model.reloadBool = false;
		model.leftTime = "10s";
		model.code = "00";
		model.showCancelButtonBool = true;

		var id;
		var timeMap = {
			"now": "Inmediato",
			"later": "Durante el día"
		};

		model.deliveryItemInfo = {};

		init();

		function init() {

			$scope.$on("$stateChangeStart",function(){
				clearInterval(id);
			});
			id = setInterval(serviceDetails, 60000);

			model.serviceDetails = serviceDetails;

			function serviceDetails() {
				
				DetailsDeliveryItemService.serviceDetails($stateParams.id, function(response) {

					model.deliveryItemInfo = response.data;
					console.log("deliveryItemInfo object", model.deliveryItemInfo);

					model.deliveryItemInfo.time_to_deliver = timeMap[model.deliveryItemInfo.time_to_deliver];
					model.deliveryItemInfo.time_to_pickup = timeMap[model.deliveryItemInfo.time_to_pickup];

					model.pickupDate = new Date(model.deliveryItemInfo["pickup_time"]);
					model.estimated = new Date(model.deliveryItemInfo["estimated"]);
					nowDate = new Date();
					model.leftTime = parseInt((model.estimated.getTime() - nowDate.getTime()) / 60000);
					if (model.leftTime < 0) {
						model.leftTime = "0";
					}

					if (response.data.messenger_info) {
						model.messengerBool = true;
						model.reloadBool = false;
						model.isSearchMessenger = false;
					} else {
						model.messengerBool = false;
						model.reloadBool = true;
						model.isSearchMessenger = true;
					}

					if (!model.reloadBool) {
						clearInterval(id);
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
					} else {
						model.serviceStatus = traslateStatusFunction(response.data["status"]);
						model.setAvailableButtonBool = false;

					}

					if (response.data["status"] == "returned" || response.data["status"] == "delivered") {
						model.showCancelButtonBool = false;
						model.reloadBool = false;
						if (model.deliveryItemInfo.rated === false) {
							$state.go('ratingMessenger', {
								idItem: response.data["_id"],
								deliveryItemInfo:model.deliveryItemInfo
							});
						}
					} else {
						model.showCancelButtonBool = true;
						model.reloadBool = true;
					}


					if (response.data.status == "available" || response.data.status == "accepted" || response.data["overall_status"] == "aborted") {
						model.showCancelButtonBool = true;
					} else {
						model.showCancelButtonBool = false;
					}

					console.log("SHOW CANCEL", model.showCancelButtonBool);
				});
			}

			model.serviceDetails();

			model.cancelService = function() {
				DetailsDeliveryItemService.deleteDeliveryItem(model.deliveryItemInfo._id, model.deliveryItemInfo.user_id, function(response) {
					console.log(response);
					if (response.response) {
						$scope.BootstrapModal.show("Servicio cancelado de manera exitosa!");
						$state.go('requestMessenger');
					} else {
						//AlertsService.showAlert(response.msg, "");
						$scope.BootstrapModal.show(response.msg);
					}
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
					//AlertsService.loading();
					$scope.BootstrapLoading.show(true);
					model.restartDeliveryItem = function() {

						DetailsDeliveryItemService.restartDeliveryItem(model.deliveryItemInfo._id, model.deliveryItemInfo.user_id, function(response) {
							console.log(response);
							if (response.response) {
								//AlertsService.cancel();
								$scope.BootstrapLoading.show(false);
								$scope.BootstrapModal("El servicio está disponible de nuevo");
								//AlertsService.showAlert(, "goAborted");
							} else {
								$scope.BootstrapModal(response.msg);
								//AlertsService.showAlert(response.msg, "");
							}
						});
					};
					model.restartDeliveryItem();
				});
			};

			model.reload = function() {
				//$state.reload();
				model.serviceDetails();
			};

			model.showBigImage = function(url) {
				console.log('url', url);
			};
		}
	}]);

	module.controller('DialogController', ['$scope', 'imageUrl', function($scope, imageUrl) {
		$scope.currentUrl = imageUrl;
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
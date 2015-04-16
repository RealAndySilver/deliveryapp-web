(function(module) {

	module.controller('ServiceDetailsController', ["$state", "$stateParams", "DetailsDeliveryItemService", function($state, $stateParams, DetailsDeliveryItemService) {
		var model = this;
		model.messengerBool = false;


		init();

		function init() {

			model.serviceDetails = function() {
				DetailsDeliveryItemService.serviceDetails($stateParams.id, function(response) {
					console.log(response);


					if (response.data.messenger_info) {
						model.messengerBool = true;
						model.serviceName = response.data["item_name"];
						model.pickupAddress = response.data.pickup_object["address"];
						model.deliveryAddress = response.data.delivery_object["address"];
						model.pickupDate = response.data["pickup_time"];
						model.serviceCost = response.data["price_to_pay"];
						model.messengerName = response.data.messenger_info["name"] + response.data.messenger_info["lastname"];
						model.messengerMobilephone = response.data.messenger_info["mobilephone"];
						model.messengerImage = response.data.messenger_info["url"];
					} else {
						model.messengerBool = false;
						console.log("no ahi mensajero");
					}

					if(response.data.images.length!==0){
						console.log(response.data.images.length);
						model.imageBool=true;
						model.images=response.data.images;
						//Mostar las imagenes
					}
					else{
						model.imageBool=false;
						console.log(response.data.images.length);
					}


				});
			};

			model.serviceDetails();

		}
	}]);

}(angular.module("appMensajeria.serviceDetails")));
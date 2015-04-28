(function(module) {

	module.service('GetAllAddressService', ['PickupAddresses', 'DeliveryAddresses', function(PickupAddresses, DeliveryAddresses) {
		var model = this;

		var MAX_ADDRESS = 3;
		console.log("EL VALUE DE LAS DIRECCIONES", PickupAddresses);

		model.save = function(pickupItem, deliveryItem) {

			if (PickupAddresses.length === 0) {
				PickupAddresses = localStorage.getItem('PickupAddresses');
				DeliveryAddresses = localStorage.getItem('DeliveryAddresses');
				if(PickupAddresses===null)
				{
					PickupAddresses=[];
					DeliveryAddresses=[];
				}
			}

			PickupAddresses.splice(0, 0, pickupItem);
			DeliveryAddresses.splice(0, 0, deliveryItem);

			if (PickupAddresses.length > MAX_ADDRESS) {
				PickupAddresses.pop();
				DeliveryAddresses.pop();
			}

			localStorage.setItem('PickupAddresses', JSON.stringify(PickupAddresses));
			localStorage.setItem('DeliveryAddresses', JSON.stringify(DeliveryAddresses));

			console.log('DIRECCIONEs recogida ', PickupAddresses);
			console.log('DIRECCIONES entrega ', DeliveryAddresses);
		};


	}]);

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', 'RequestMessengerService', 'Session', 'GetPrice', '$stateParams', '$state', 'PickupAddresses', 'DeliveryAddresses', 'GetAllAddressService', function($scope, $mdDialog, RequestMessengerService, Session, GetPrice, $stateParams, $state, PickupAddresses, DeliveryAddresses, GetAllAddressService) {
		var model = this;

		model.pickUpAddressSave = JSON.parse(localStorage.getItem('PickupAddresses'));
		model.deliveryAddressSave = JSON.parse(localStorage.getItem('DeliveryAddresses'));

		console.log("LO GUARDARDO EN EL LOCAL", model.pickUpAddressSave);

		init();

		model.pickup = {};
		model.delivery = {};

		function init() {

			$scope.showAlert = function() {
				$mdDialog.show(
					$mdDialog.alert()
					.content('Recuerda activar el permiso para utilizar tu ubicación en la barra superior.')
					.ariaLabel('Allow user geolocation')
					.ok('Aceptar')
					.disableParentScroll(false)
				);
			};
			$scope.showAlert();

			$scope.showAddresses = function() {
				$mdDialog.show({
					controller: 'GetAddressesController',
					templateUrl: 'getAddresses/getAddresses.tpl.html',
					//targetEvent: ev,
				});
			};

			model.getCurrentUser = function() {
				$scope.currentUser = Session.getUser();
			};
			model.getCurrentUser();


			$scope.pickupLat = 0;
			$scope.pickupLon = 0;

			$scope.deliverLat = 0;
			$scope.deliverLon = 0;

			$scope.showValues = function() {
				alert('deliverLon: ' + $scope.deliverLon + ', deliverLat: ' + $scope.deliverLat);
			};

			$scope.delivery_address = '';

			function assignToPickupAddress(value) {
				$scope.pickup_address = value;
			}

			function assignToDeliveryAddress(value) {
				$scope.delivery_address = value;
			}

			function geocodeDelivery() {
				var geocoder = new google.maps.Geocoder();
				var latlng = "";
				var fieldToPutData;
				if ($scope.valueBool) {
					latlng = new google.maps.LatLng($scope.pickupLat, $scope.pickupLon);
					fieldToPutData = assignToPickupAddress;
				} else {
					latlng = new google.maps.LatLng($scope.deliverLat, $scope.deliverLon);
					fieldToPutData = assignToDeliveryAddress;
				}


				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					//console.log('results', results);
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var res = results[0].formatted_address.split(" a ", 1);
							fieldToPutData(res[0]);
							//$scope.delivery_address = res[0];
						} else {
							fieldToPutData('Location not found');
							//$scope.delivery_address = 'Location not found';
						}
					} else {
						fieldToPutData('Geocoder failed due to: ' + status);
						//$scope.delivery_address = 'Geocoder failed due to: ' + status;
					}
				});
			}

			$scope.setLatLong = function(lat1, lon1, lat2, lon2, valueBool) {
				$scope.$apply(function() {
					$scope.pickupLat = parseFloat(lat1);
					$scope.pickupLon = parseFloat(lon1);
					$scope.deliverLat = parseFloat(lat2);
					$scope.deliverLon = parseFloat(lon2);
					$scope.valueBool = valueBool;
					console.log("VALOR DEL BOOL", $scope.valueBool);

					geocodeDelivery();
				});
				getDistance($scope.pickupLat, $scope.pickupLon, $scope.deliverLat, $scope.deliverLon);
			};

			function getDistance(pickupLat, pickupLon, destinationLat, destinationLon) {
				console.log('entra a esta función');
				var loc1 = '';
				var loc2 = '';
				if (destinationLat !== 0) {
					loc1 = pickupLat + "," + pickupLon;
					loc2 = destinationLat + "," + destinationLon;
					GetPrice.getPrice(loc1, loc2, function(response) {
						if (response.response) {
							$scope.currency = true;
							$scope.deliveryPrice = response.data;
						}
						/*else {
							$scope.currency = false;
							$scope.deliveryPrice = response.msg;
						}*/
						console.log(response);
					});
				} else {
					console.log('no estan todos los parámetros requeridos');
				}
			}

			var pickupItem = {};
			var deliveryItem = {};
			model.requestMessenger = function() {
				model.delivery.pickup_object = {};
				model.delivery.pickup_object.address = $scope.pickup_address;
				model.delivery.pickup_object.lat = $scope.pickupLat;
				model.delivery.pickup_object.lon = $scope.pickupLon;

				model.delivery.delivery_object = {};
				model.delivery.delivery_object.address = $scope.delivery_address;
				model.delivery.delivery_object.lat = $scope.deliverLat;
				model.delivery.delivery_object.lon = $scope.deliverLon;

				model.delivery.price_to_pay = $scope.deliveryPrice;
				model.delivery.user_info = $scope.currentUser;
				model.delivery.user_id = $scope.currentUser._id;
				console.log('objeto servicio ', model.delivery);
				RequestMessengerService.requestMessenger(model.delivery, function(response) {
					console.log(response);
					var pickupItem = response.data.pickup_object;
					var deliveryItem = response.data.delivery_object;
					if (response.response) {

						GetAllAddressService.save(pickupItem, deliveryItem);

						$state.go('serviceDetails', {
							id: response.data._id
						});
					}
				});
			};

			model.showAddressBool = false;

			model.isShowing = function() {
				console.log("ISHOWING", model.showAddressBool);
				if (model.showAddressBool) {
					model.showAddressBool = false;
				} else {
					model.showAddressBool = true;
				}
			};

			$scope.useAddress = function(delivery) {
				var confirm = $mdDialog.confirm()
					.title(' ')
					.content('Como deseas usar esta dirección?')
					.ariaLabel('')
					.ok('Recogida')
					.cancel('Entrega');
				$mdDialog.show(confirm).then(function() {
					$scope.pickupLat = delivery["lat"];
					$scope.pickupLon = delivery["lon"];

					model.pickup = {
						lat: delivery['lat'],
						lng: delivery['lon']
					};
					$scope.valueBool = true;
					console.log("ENTRO ");
					geocodeDelivery();
				});
			};
		}


	}]);

}(angular.module("appMensajeria.requestMessenger")));
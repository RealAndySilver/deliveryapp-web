(function(module) {

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', 'RequestMessengerService', 'Session', 'GetPrice', '$stateParams', '$state', 'PickupAddresses', 'DeliveryAddresses', 'SaveAddresses', function($scope, $mdDialog, RequestMessengerService, Session, GetPrice, $stateParams, $state, PickupAddresses, DeliveryAddresses, SaveAddresses) {
		var model = this;

		init();

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

			model.getLocation = function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(model.pickupPosition);
				} else {
					alert("Geolocation is not supported by this browser.");
				}
			};

			model.pickupPosition = function(position) {
				$scope.position.lat = position.coords.latitude;
				$scope.position.lng = position.coords.longitude;
				geocodePickup();
				$scope.$watch('lat', geocodePickup);
				$scope.$watch('lng', geocodePickup);
			};
			model.getLocation();

			$scope.pickup_address = '';

			function geocodePickup() {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.position.lat, $scope.position.lng);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var res = results[0].formatted_address.split(", ", 3);
							$scope.pickup_address = res[0];
						} else {
							$scope.pickup_address = 'Location not found';
						}
					} else {
						$scope.pickup_address = 'Geocoder failed due to: ' + status;
					}
				});
			}

			$scope.position = {
				lat: 0,
				lng: 0
			};

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
				var latlng = new google.maps.LatLng($scope.deliverLat, $scope.deliverLon);

				//VALORAR EN QUE FIELD PONER LA DIRECCION
				var fielToPutData;

				if ($scope.valueBool) {
					fielToPutData = assignToPickupAddress;
				} else {
					fielToPutData = assignToDeliveryAddress;
				}


				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					//console.log('results', results);
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var res = results[0].formatted_address.split(", ", 3);
							fielToPutData(res[0]);
							//$scope.delivery_address = res[0];
						} else {
							fielToPutData('Location not found');
							//$scope.delivery_address = 'Location not found';
						}
					} else {
						fielToPutData('Geocoder failed due to: ' + status);
						//$scope.delivery_address = 'Geocoder failed due to: ' + status;
					}
				});
			}

			$scope.setLatLong = function(lat, lon, valueBool) {
				$scope.$apply(function() {
					$scope.deliverLat = parseFloat(lat);
					$scope.deliverLon = parseFloat(lon);
					$scope.valueBool = valueBool;
					console.log("VALOR DEL BOOL", $scope.valueBool);

					geocodeDelivery();
				});
				getDistance($scope.deliverLat, $scope.deliverLon);
			};

			$scope.distance = {
				pickupLatitud: $scope.position.lat,
				pickupLongitud: $scope.position.lng,
				deliveryLatitud: $scope.deliverLat,
				deliveryLongitud: $scope.deliverLon,
			};

			function getDistance(destinationLat, destinationLon) {
					console.log('entra a esta función');
					var loc1 = '';
					var loc2 = '';
					if (destinationLat !== 0) {
						loc1 = $scope.position.lat + "," + $scope.position.lng;
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
						console.log('no estan todos los paarmetros requeridos');
					}
				}
				//$scope.$watch('distance', getDistance);

			var pickupItem = {};
			var deliveryItem = {};
			model.requestMessenger = function() {
				model.delivery.pickup_object = {};
				model.delivery.pickup_object.address = $scope.pickup_address;
				model.delivery.pickup_object.lat = $scope.position.lat;
				model.delivery.pickup_object.lon = $scope.position.lng;

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
						//console.log('pickupItem ', pickupItem);
						//console.log('deliveryItem ', deliveryItem);
						SaveAddresses.save(pickupItem, deliveryItem);
						PickupAddresses.push(pickupItem);
						DeliveryAddresses.push(deliveryItem);
						$state.go('searchingMessenger', {
							delivery_id: response.data._id
						});
						//console.log('ARRAY RECOGIDA ', PickupAddresses);
						//console.log('ARRAY ENTREGA ', DeliveryAddresses);
						//User = user;
						//Session.setUser(User);
					}
				});
			};
		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
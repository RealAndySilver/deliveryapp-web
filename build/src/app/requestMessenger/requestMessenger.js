(function(module) {

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', 'RequestMessengerService', 'Session', 'GetPrice', '$stateParams', function($scope, $mdDialog, RequestMessengerService, Session, GetPrice, $stateParams) {
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
				/*.then(function(answer) {
					$scope.alert = 'You said the information was "' + answer + '".';
				}, function() {
					$scope.alert = 'You cancelled the dialog.';
				});*/
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

			function geocodeDelivery() {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.deliverLat, $scope.deliverLon);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					//console.log('results', results);
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var res = results[0].formatted_address.split(", ", 3);
							$scope.delivery_address = res[0];
						} else {
							$scope.delivery_address = 'Location not found';
						}
					} else {
						$scope.delivery_address = 'Geocoder failed due to: ' + status;
					}
				});
			}

			$scope.setLatLong = function(lat, lon) {
				$scope.$apply(function() {
					$scope.deliverLat = parseFloat(lat);
					$scope.deliverLon = parseFloat(lon);
					geocodeDelivery();
				});
				console.log('setLatLong:', 'lat', $scope.deliverLat, 'lon', $scope.deliverLon);
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
							$scope.deliveryPrice = response.data;
							console.log(response);
						});
					} else {
						console.log('no estan todos los paarmetros requeridos');
					}
				}
				//$scope.$watch('distance', getDistance);

			var maxAddresses = 10;
			$scope.pickupAddresses = [];
			$scope.deliveryAddresses = [];
			model.requestMessenger = function() {
				model.delivery.pickup_object = {};
				model.delivery.pickup_object.address = $scope.pickup_address;
				model.delivery.pickup_object.lat = $scope.position.lat;
				model.delivery.pickup_object.lon = $scope.position.lng;
				/*if (model.delivery.pickup_object) {
					//$scope.pickupItem = model.delivery.pickup_object;
					$scope.pickupAddress.push(model.delivery.pickup_object);
					//console.log($scope.pickupAddress);
				}*/

				model.delivery.delivery_object = {};
				model.delivery.delivery_object.address = $scope.delivery_address;
				model.delivery.delivery_object.lat = $scope.deliverLat;
				model.delivery.delivery_object.lon = $scope.deliverLon;
				/*if (model.delivery.delivery_object) {
					//$scope.deliveryItem = model.delivery.delivery_object;
					$scope.deliveryAddresses.push(model.delivery.delivery_object);
					//console.log($scope.deliveryAddresses);
				}*/

				model.delivery.price_to_pay = $scope.deliveryPrice;
				model.delivery.user_info = $scope.currentUser;
				model.delivery.user_id = $scope.currentUser._id;
				//console.log('objeto arrays direcciones ', $scope.pickupItem, $scope.deliveryItem);
				console.log('objeto servicio ', model.delivery);
				RequestMessengerService.requestMessenger(model.delivery, function(response) {
					console.log(response);
					if (response.data) {
						$mdDialog.show(
							$mdDialog.alert()
							.content(response.msg)
							.ariaLabel('Succesful request')
							.ok('Aceptar')
							.disableParentScroll(false)
						);
					}
					var pickupItem = response.data;
					/*if (response.data) {
						User = user;
						Session.setUser(User);
					}*/
				});
			};
		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
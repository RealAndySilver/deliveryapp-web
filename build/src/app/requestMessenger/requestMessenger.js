(function(module) {

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', 'RequestMessengerService', 'Session', '$stateParams', function($scope, $mdDialog, RequestMessengerService, Session, $stateParams) {
		var model = this;

		$scope.position = {
			lat: 0,
			lng: 0
		};

		init();

		function init() {
			$scope.showAlert = function() {
				$mdDialog.show(
					$mdDialog.alert()
					.content('Recuerda activar el permiso para localización en la barra superior derecha.')
					.ariaLabel('Allow user geolocation')
					.ok('Aceptar')
					.disableParentScroll(false)
				);
			};
			$scope.showAlert();

			model.getCurrentUser = function() {
				//return Session.getUser();
				$scope.currentUser = Session.getUser();
				//console.log('usuario actual ', $scope.currentUser);
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
				console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
			};

			model.getLocation();
			$scope.pickup_address = '';

			function geocodePickup() {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.position.lat, $scope.position.lng);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					//console.log('results', results);
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
					console.log('pickup_address', $scope.pickup_address);
				});
			}

			model.requestMessenger = function() {
				model.delivery.pickup_object = {};
				model.delivery.pickup_object.address = $scope.pickup_address;
				model.delivery.pickup_object.lat = $scope.position.lat;
				model.delivery.pickup_object.lon = $scope.position.lng;
				model.delivery.user_info = $scope.currentUser;
				model.delivery.user_id = $stateParams.id;
				console.log('objeto servicio ', model.delivery);
				/*RequestMessengerService.requestMessenger(model.delivery, function(response) {
					console.log(response);
				});*/
			};
		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
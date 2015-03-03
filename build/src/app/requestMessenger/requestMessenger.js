(function(module) {

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', 'RequestMessengerService', function($scope, $mdDialog, RequestMessengerService) {
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

			model.getLocation = function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(model.showPosition);
				} else {
					alert("Geolocation is not supported by this browser.");
				}
			};

			model.showPosition = function(position) {
				$scope.position.lat = position.coords.latitude;
				$scope.position.lng = position.coords.longitude;
				onChange();
				$scope.$watch('lat', onChange);
				$scope.$watch('lng', onChange);
				console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
			};

			model.getLocation();
			$scope.pickup_object = '';

			function onChange() {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.position.lat, $scope.position.lng);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					//console.log('results', results);
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var res = results[0].formatted_address.split(", ", 3);
							$scope.pickup_object = res[0];
						} else {
							$scope.pickup_object = 'Location not found';
						}
					} else {
						$scope.pickup_object = 'Geocoder failed due to: ' + status;
					}
					console.log('pickup_object', $scope.pickup_object);
				});
			}

			model.requestMessenger = function() {
				model.delivery.pickup_object = $scope.pickup_object;
				console.log('objeto servicio ', model.delivery);
				RequestMessengerService.requestMessenger(model.delivery, function(response) {
					console.log(response);
				});
			};
		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
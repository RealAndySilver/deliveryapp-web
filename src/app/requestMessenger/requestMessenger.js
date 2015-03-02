(function(module) {

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
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
					//.title('Permiso de Localización')
					.content('Recuerda activar el permiso para localización en la barra superior derecha.')
					.ariaLabel('Allow user geolocation')
					.ok('Aceptar')
					.disableParentScroll(false)
					//.targetEvent(ev)
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

			// $scope.$watch('lat', onChange);
			// $scope.$watch('lng', onChange);

			$scope.pickup_object = '';

			// $scope.lat = 40.730885;
			// $scope.lng = -73.997383;

			//onChange();

			function onChange() {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.position.lat, $scope.position.lng);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					console.log('results', results);
					//console.log('status', status);
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
				console.log('objeto servicio ', model.user);
			};
		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
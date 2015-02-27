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
					.content('Recuerda activar el permiso para Localización en la barra superior derecha.')
					.ariaLabel('Allow user geolocation')
					.ok('Aceptar')
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
				console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
			};

			model.getLocation();

			/*$scope.$watch('lat', onChange);
			$scope.$watch('lng', onChange);

			$scope.ome = 'location';

			$scope.lat = 40.730885;
			$scope.lng = -73.997383;

			onChange();

			function onChange() {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) {
					console.log('results', results);
					console.log('status', status);
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							$scope.ome = results[0].formatted_address;
						} else {
							$scope.ome = 'Location not found';
						}
					} else {
						$scope.ome = 'Geocoder failed due to: ' + status;
					}
					console.log('ome', $scope.ome);
				});
			}*/

			model.requestMessenger = function() {
				console.log('objeto servicio ', model.user);
			};
		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
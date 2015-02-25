(function(module) {

	module.controller('RequestMessengerController', ['$scope', function($scope) {
		var model = this;

		init();

		function init() {
			var x = document.getElementById("geo-cositas");

			model.getLocation = function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(model.showPosition);
				} else {
					x.innerHTML = "Geolocation is not supported by this browser.";
				}
			};

			model.showPosition = function(position) {
				x.innerHTML = "Latitude: " + position.coords.latitude +
					"<br>Longitude: " + position.coords.longitude;
			};

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
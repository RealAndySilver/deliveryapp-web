(function(module) {

	module.directive('userMap', function() {
		return {
			restrict: 'E',
			templateUrl: 'userMap/userMap.tpl.html',
			controller: 'UserMapController',
			controllerAs: 'mapCtrl',
			scope: {
				lat: "=",
				lon: "=",
			},
		};
	});

	module.controller('UserMapController', ['$scope', function($scope) {
		var model = this;

		init();

		function init() {

			function latLngCallback(newValue) {
				console.log('watching latlong', $scope.lat, $scope.lon);

				if (!$scope.map) {
					var mapOptions = {
						zoom: 15,
						center: new google.maps.LatLng($scope.lat, $scope.lon),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};

					//var initialMarker = [];
					$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
				}

				addPoint();

				$scope.map.panTo(new google.maps.LatLng($scope.lat, $scope.lon));

				function addPoint(event) {
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng($scope.lat, $scope.lon),
						map: $scope.map,
					});
				}
			}

			$scope.$watch('lat', latLngCallback);
		}
	}]);

}(angular.module("appMensajeria.userMap", [])));
(function(module) {

	module.directive('pickupMap', function() {
		return {
			restrict: 'E',
			templateUrl: 'userMap/pickupMap.tpl.html',
			controller: 'PickupMapController',
			//controllerAs: 'mapCtrl',
			scope: {
				lat: "=",
				lon: "=",
			},
		};
	});

	module.controller('PickupMapController', ['$scope', function($scope) {
		var model = this;

		init();

		function init() {

			function latLngCallback(newValue) {
				if (!$scope.pickupMap) {
					var mapOptions = {
						zoom: 15,
						center: new google.maps.LatLng($scope.lat, $scope.lon),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};

					$scope.pickupMap = new google.maps.Map(document.getElementById('map'), mapOptions);
				}

				addPoint();

				$scope.pickupMap.panTo(new google.maps.LatLng($scope.lat, $scope.lon));

				function addPoint(event) {
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng($scope.lat, $scope.lon),
						map: $scope.pickupMap,
					});
				}
			}

			$scope.$watch('lat', latLngCallback);
		}
	}]);

	module.directive('deliveryMap', function() {
		return {
			restrict: 'E',
			templateUrl: 'userMap/deliveryMap.tpl.html',
			controller: 'DeliveryMapController',
			//controllerAs: 'mapCtrl',
			scope: {
				setLatLong: '&callback',
			},
		};
	});

	module.controller('DeliveryMapController', ['$scope', function($scope) {
		var model = this;

		init();

		function init() {
			var mapOptions = {
				zoom: 12,
				center: new google.maps.LatLng(4.6683, -74.0620),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			$scope.deliveryMap = new google.maps.Map(document.getElementById('delmap'), mapOptions);

			myListener = google.maps.event.addListener($scope.deliveryMap, 'click', function(event) {
				placeMarker(event.latLng);
				google.maps.event.removeListener(myListener);
				$scope.setLatLong({
					lat: event.latLng.lat(),
					lon: event.latLng.lng()
				});
				//console.log('coordenadas de recogida ', event.latLng.lat(), event.latLng.lng());
				$scope.$digest();
			});
			var id = 0;

			google.maps.event.addListener($scope.deliveryMap, 'center_changed', function() {
				clearTimeout(id);
				// 3 seconds after the center of the map has changed, pan back to the
				// marker.
				//console.log('center change', $scope.deliveryMap.getCenter().lat(), $scope.deliveryMap.getCenter().lng());
				id = window.setTimeout(function() {
					$scope.setLatLong({lat: $scope.deliveryMap.getCenter().lat(), lon: $scope.deliveryMap.getCenter().lng()});
				}, 300);
			});


			function placeMarker(location) {
				var marker = new google.maps.Marker({
					position: location,
					map: $scope.deliveryMap,
					draggable: true
				});
				$scope.deliveryMap.setCenter(location);

				return marker;

				//console.log('coordenadas de recogida ', marker.position.lat, marker.position.lng);
				//var markerPosition = marker.getPosition();
				/*populateInputs(markerPosition);
				google.maps.event.addListener(marker, "drag", function(mEvent) {
					populateInputs(mEvent.latLng);
				});*/
			}

		}
	}]);

}(angular.module("appMensajeria.userMap", [])));
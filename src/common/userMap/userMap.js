(function(module) {

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
		var centerLatPickup = 4.6683;
		var centerLonPickup = -74.0620;

		var centerLatDelivery = 4.6683;
		var centerLonDelivery = -74.0620;
		//var centerLatDelivery = 0;
		//var centerLonDelivery = 0;

		init();

		function init() {

			$scope.pickupBool = true;
			$scope.deliveryBool = false;
			/////////////

			model.getLocation = function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(model.pickupPosition);
				} else {
					alert("Geolocation is not supported by this browser.");
				}
			};

			model.pickupPosition = function(position) {
				centerLatPickup = position.coords.latitude;
				centerLonPickup = position.coords.longitude;

				centerLatDelivery = position.coords.latitude;
				centerLonDelivery = position.coords.longitude;

				$scope.setLatLong({
					lat1: centerLatPickup,
					lon1: centerLonPickup,

					lat2: centerLatDelivery,
					lon2: centerLonDelivery,
					valueBool: $scope.pickupBool,
				});
			};
			model.getLocation();
			/////////////

			$scope.pickupOrDeliveryAddress = function() {

				console.log("Antes", $scope.pickupBool);
				if ($scope.pickupBool) {
					$scope.pickupBool = false;
					$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatDelivery, centerLonDelivery));

				} else {
					$scope.pickupBool = true;
					$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatPickup, centerLonPickup));


				}
				console.log("DESPUES", $scope.deliveryMap.getCenter());

			};

			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(centerLatPickup, centerLonPickup),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			$scope.deliveryMap = new google.maps.Map(document.getElementById('delmap'), mapOptions);
			var id = 0;

			google.maps.event.addListener($scope.deliveryMap, 'center_changed', function() {
				clearTimeout(id);
				if ($scope.pickupBool) {
					centerLatPickup = $scope.deliveryMap.getCenter().lat();
					centerLonPickup = $scope.deliveryMap.getCenter().lng();

				} else {
					centerLatDelivery = $scope.deliveryMap.getCenter().lat();
					centerLonDelivery = $scope.deliveryMap.getCenter().lng();

				}

				id = setTimeout(function() {
					$scope.setLatLong({
						lat1: centerLatPickup,
						lon1: centerLonPickup,

						lat2: centerLatDelivery,
						lon2: centerLonDelivery,
						valueBool: $scope.pickupBool,
					});
				}, 300);
			});

		}
	}]);

}(angular.module("appMensajeria.userMap", [])));
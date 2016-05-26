(function(module) {

	module.directive('deliveryMap', function() {
		return {
			restrict: 'E',
			templateUrl: 'userMap/deliveryMap.tpl.html',
			controller: 'DeliveryMapController',
			controllerAs: 'model',
			scope: {
				pickup: '=',
				delivery: '=',
				setLatLong: '&callback',
				messengers: '='

			}
		};
	});

	module.controller('DeliveryMapController', ['$scope','$rootScope', function($scope,$rootScope) {
		var model = this;
		var centerLatPickup = 0;
		var centerLonPickup = 0;

		var centerLatDelivery = 0;
		var centerLonDelivery = 0;

		var messengersLocations = [];
		var markers = [];
		$scope.pickupBool = true;


		/*$scope.$watch('pickup', function(newValue) {
			console.log("New Value",newValue);
			if (newValue.lat) {
				centerLatPickup = $scope.pickup.lat;
				centerLonPickup = $scope.pickup.lng;
				$scope.pickupBool = true;

				$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatPickup, centerLonPickup));
			}
		});*/


		$rootScope.updatePickupMap= function(newValue) {
				if (newValue && newValue.lat) {
					centerLatPickup = newValue.lat;
					centerLonPickup = newValue.lng;
					$scope.pickupBool = true;
					$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatPickup, centerLonPickup));
				}
		};

		$rootScope.updateDeliveryMap= function(newValue) {
			if (newValue && newValue.lat) {
				centerLatDelivery = newValue.lat;
				centerLonDelivery= newValue.lng;
				$scope.pickupBool = false;
				$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatDelivery, centerLonDelivery));
			}
		};

		/*$scope.$watch('delivery', function(newValue) {
			if (newValue.lat) {
				centerLatDelivery = $scope.delivery.lat;
				centerLonDelivery = $scope.delivery.lng;
				$scope.pickupBool = false;
				$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatDelivery, centerLonDelivery));
			}
		});*/

		$scope.$watch('messengers.locations', function(arg) {
			if(typeof(arg)!='undefined'){
				$scope.deleteMarkers();
				arg.forEach(function(messengerPosition){
					var marker = new google.maps.Marker({
						position: messengerPosition,
						map: $scope.deliveryMap,
						icon: 'assets/delivery.png'
					});
					markers.push(marker);
				});
			}

		});

		model.callbackCurrentPosition = function(position) {
			centerLatPickup = position.coords.latitude;
			centerLonPickup = position.coords.longitude;

			centerLatDelivery = position.coords.latitude;
			centerLonDelivery = position.coords.longitude;

			$scope.setLatLong({
				lat1: centerLatPickup,
				lon1: centerLonPickup,

				lat2: centerLatDelivery,
				lon2: centerLonDelivery,
				valueBool: true
			});
			$scope.setLatLong({
				lat1: centerLatPickup,
				lon1: centerLonPickup,

				lat2: centerLatDelivery,
				lon2: centerLonDelivery,
				valueBool: false
			});
			$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatDelivery, centerLonDelivery));
			//model.pickupOrDeliveryAddress();
		};

		model.getCurrentLocation = function() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(model.callbackCurrentPosition);
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		};

		// Sets the map on all markers in the array.
		$scope.setMapOnAll = function(map) {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(map);
			}
		};

		$scope.deleteMarkers= function() {
			$scope.setMapOnAll(null);
			markers = [];
		};

		model.reloadMapToPickupOrDelivery = function() {
			//console.log("Antes", $scope.pickupBool);
			if ($scope.pickupBool) {
				$scope.pickupBool = false;
				$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatDelivery, centerLonDelivery));
			} else {
				$scope.pickupBool = true;
				$scope.deliveryMap.panTo(new google.maps.LatLng(centerLatPickup, centerLonPickup));
			}
			//console.log("DESPUES", $scope.deliveryMap.getCenter());

		};

		function init() {

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
						valueBool: $scope.pickupBool
					});
				}, 1000);
			});

			/////////////

			model.getCurrentLocation();

		}

		init();
	}]);

}(angular.module("appMensajeria.userMap", [])));
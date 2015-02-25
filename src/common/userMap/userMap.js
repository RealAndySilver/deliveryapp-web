(function(module) {

	module.directive('userMap', function() {
		return {
			restrict: 'E',
			templateUrl: 'userMap/userMap.tpl.html',
			controller: 'UserMapController',
			controllerAs: 'mapCtrl',
		};
	});

	module.controller('UserMapController', ['$scope', function($scope) {
		var model = this;

		init();

		function init() {
			var mapOptions = {
				zoom: 5,
				center: new google.maps.LatLng(4.6777333, -74.0956373),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var initialMarker = [];
			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			google.maps.event.addListener($scope.map, 'click', addPoint);

			function addPoint(event) {
				var marker = new google.maps.Marker({
					position: event.latLng,
					map: $scope.map,
				});
			}
		}
	}]);

}(angular.module("appMensajeria.userMap", [])));
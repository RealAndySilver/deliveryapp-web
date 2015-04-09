(function(module) {

	module.directive('addressesList', function() {
		return {
			restrict: 'E',
			templateUrl: 'getAddresses/getAddresses.tpl.html',
			controller: 'GetAddressesController',
			//controllerAs: 'mapCtrl',
			scope: {
				pickupAddresses: "=",
				deliveryAddresses: "=",
			},
		};
	});

	module.controller('GetAddressesController', ['$scope', function($scope) {
		var model = this;

		init();

		function init() {
			console.log('objeto arrays direcciones en el new scope ', $scope.pickupAddresses, $scope.deliveryAddresses);

			var maxAddresses = 10;
			var pickupAddresses = [];
			var deliveryAddresses = [];

		}
	}]);

}(angular.module("appMensajeria.getAddresses", [])));
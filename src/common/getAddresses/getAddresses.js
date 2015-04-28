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

	module.controller('GetAddressesController', ['$scope', 'PickupAddresses', 'DeliveryAddresses', function($scope, PickupAddresses, DeliveryAddresses) {
		var model = this;

		init();

		function init() {
			var maxAddresses = 10;
		}
	}]);

}(angular.module("appMensajeria.getAddresses", [])));
(function(module) {

	module.controller('SearchingMessengerController', ['$scope', '$stateParams', function($scope, $stateParams) {
		var model = this;

		init();

		function init() {
			var deliveryId = $stateParams.delivery_id;
			console.log('id de servicio ', deliveryId);

		}
	}]);

}(angular.module("appMensajeria.searchingMessenger")));
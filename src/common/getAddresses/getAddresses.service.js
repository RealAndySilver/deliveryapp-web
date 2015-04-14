(function(module) {

	module.service('SaveAddresses', ['$http', 'ServerComunicator', function($http, ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.save = function(pickupAddress, deliveryAddress, callback) {
				console.log('dirección de recogida ', pickupAddress);
				console.log('dirección de entrega ', deliveryAddress);

				/*var getPricePromise = ServerComunicator.getPrice(loc1, loc2);
				getPricePromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message,
							data: response.data.value,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: response.data.message,
							error: e,
						});
					});*/
			};

		}
	}]);

}(angular.module("appMensajeria.getAddresses", [])));
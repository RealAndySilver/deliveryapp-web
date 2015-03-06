(function(module) {

	module.service('GetPrice', ['$http', 'ServerComunicator', function($http, ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.getPrice = function(loc1, loc2, callback) {
				var getPricePromise = ServerComunicator.getPrice(loc1, loc2);
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
					});
			};

		}
	}]);

}(angular.module("appMensajeria.getPrice", [])));
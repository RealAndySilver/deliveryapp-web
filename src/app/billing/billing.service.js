(function(module) {

	module.service('BillingService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.createPayment = function(data, callback) {
				var createPaymentPromise = ServerComunicator.createPayment(data);
				createPaymentPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message || response.data.error,
							data: response.data.response,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
							error: e,
						});
					});
			};

			model.getFranchise = function(data, callback) {
				var getFranchisePromise = ServerComunicator.getFranchise(data);
				getFranchisePromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message || response.data.error,
							data: response.data.response,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
							error: e,
						});
					});
			};

			model.getPaymentMethods = function(data, callback) {
				var getPaymentMethodsPromise = ServerComunicator.getPaymentMethods(data);
				getPaymentMethodsPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message || response.data.error,
							data: response.data.response,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
							error: e,
						});
					});
			};

		}
	}]);

}(angular.module("appMensajeria.billing")));
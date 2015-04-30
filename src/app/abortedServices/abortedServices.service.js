(function(module) {

	module.service('AbortedServicesService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.getAbortedServices = function(idUser, callback) {
				var detailsPromise = ServerComunicator.getAbortedDeliveryItems(idUser);
				detailsPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg:  response.data.message || response.data.error,
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

}(angular.module("appMensajeria.abortedServices")));
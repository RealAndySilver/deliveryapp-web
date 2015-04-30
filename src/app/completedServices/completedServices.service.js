(function(module) {

	module.service('CompletedServicesService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.getCompletedServices = function(idUser, callback) {
				var detailsPromise = ServerComunicator.getCompletedDeliveryItems(idUser);
				detailsPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message|| response.data.error,
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

}(angular.module("appMensajeria.completedServices")));
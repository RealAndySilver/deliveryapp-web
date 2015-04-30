(function(module) {

	module.service('ActiveServicesService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.getActiveServices = function(idUser,callback) {
				var detailsPromise = ServerComunicator.getActiveDeliveryItems(idUser);
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

}(angular.module("appMensajeria.activeServices")));
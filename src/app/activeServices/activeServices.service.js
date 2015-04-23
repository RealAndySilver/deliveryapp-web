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
							msg: response.data.message,
							data: response.data.response,
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

}(angular.module("appMensajeria.activeServices")));
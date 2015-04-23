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

}(angular.module("appMensajeria.completedServices")));
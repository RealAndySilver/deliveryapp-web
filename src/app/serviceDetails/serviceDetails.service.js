(function(module) {

	module.service('DetailsDeliveryItemService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.serviceDetails = function(id, callback) {
				var detailsPromise = ServerComunicator.getDeliveryItemDetails(id);
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

}(angular.module("appMensajeria.serviceDetails")));
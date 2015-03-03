(function(module) {

	module.service('RequestMessengerService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.requestMessenger = function(delivery, callback) {
				var requestMessengerPromise = ServerComunicator.requestMessenger(delivery);
				requestMessengerPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: 'succesful request',
							data: response.data.response,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'failed request',
							error: e,
						});
					});
			};

		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
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
							msg: response.data.message || response.data.error,
							data: response.data.response
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
							error: e
						});
					});
			};

			model.closeToMe = function(lat,lon,callback) {
				var closeToMePromise = ServerComunicator.closeToMe(lat,lon);
				closeToMePromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message || response.data.error,
							data: response.data.response
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
							error: e
						});
					});
			};

		}
	}]);

}(angular.module("appMensajeria.requestMessenger")));
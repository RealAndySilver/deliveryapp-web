(function(module) {

	module.service('LoginMessengerService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.loginMessenger = function(email, password, callback) {
				password = btoa(password);
				var loginPromise = ServerComunicator.loginMessenger(email, password);
				loginPromise.then(
					function success(response) {
                        //console.log(response);
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

}(angular.module("appMensajeria.loginMessenger")));
(function(module) {

	module.service('CreateUserService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.createUser = function(name, lastname, email, password, mobilephone, callback) {
				password = btoa(password);
				var registerPromise = ServerComunicator.register(name, lastname, email, password, mobilephone);
				registerPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message ||response.data.error,
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

}(angular.module("appMensajeria.createUser")));
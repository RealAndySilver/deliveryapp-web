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
							msg: 'succesful register',
							data: response.data.response,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: 'failed register',
							error: e,
						});
					});
			};

		}
	}]);

}(angular.module("appMensajeria.createUser")));
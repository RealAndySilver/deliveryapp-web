(function(module) {

	module.service('LoginUserService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.loginUser = function(email, password, callback) {
				password = btoa(password);
				var loginPromise = ServerComunicator.login(email, password);
				loginPromise.then(
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

}(angular.module("appMensajeria.loginUser")));
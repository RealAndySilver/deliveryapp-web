(function(module) {

	module.service('RecoverPassword', ['$http', 'ServerComunicator', function($http, ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.recoverPassword = function(email, callback) {
				var recoverPromise = ServerComunicator.recoverPassword(email);
				recoverPromise.then(
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

}(angular.module("appMensajeria.recoverPassword", [])));
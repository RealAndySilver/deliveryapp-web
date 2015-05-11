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


	module.service('ChangePass', ['$http', 'ServerComunicator', function($http, ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.changePass= function(password,token, callback) {
				password=btoa(password);
				var recoverPromise = ServerComunicator.changePass(password,token);
				recoverPromise.then(
					function success(response) {
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

}(angular.module("appMensajeria.recoverPassword")));
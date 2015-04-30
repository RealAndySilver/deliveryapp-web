(function(module) {

	module.service('ChangePasswordService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.changePass = function(idUser, oldPass, newPass, callback) {
				oldPass = btoa(oldPass);
				newPass = btoa(newPass);
				console.log(oldPass+newPass);

				var detailsPromise = ServerComunicator.changePassword(idUser, oldPass, newPass);
				detailsPromise.then(
					function success(response) {
						console.log(response);
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

}(angular.module("appMensajeria.changePassword")));
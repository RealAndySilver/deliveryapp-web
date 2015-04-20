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

}(angular.module("appMensajeria.changePassword")));
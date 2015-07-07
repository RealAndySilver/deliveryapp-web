(function(module) {

	module.service('RecoverPassFromUrlService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.newPassFromUrl = function(pass,token, callback) {
				var detailsPromise = ServerComunicator.newPassFromUrl(pass,token);
				detailsPromise.then(
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

}(angular.module("appMensajeria.recoverPassFromUrl")));
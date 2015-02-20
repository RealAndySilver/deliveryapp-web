(function(module) {

	module.service('ServerComunicator', ['$http', function($http) {
		var model = this;
		var endpoint = "http://192.241.187.135:2000/api_1.0/";
		//var endpoint = "http://192.168.0.32:2000/api_1.0/";

		init();

		function init() {
			model.login = function(email, password) {
				return $http({
					method: 'PUT',
					data: {
						email: email,
						password: password,
					},
					url: endpoint + 'User' + '/Login',
				});
			};
		}
	}]);

}(angular.module("appMensajeria.serverComunicator", [])));
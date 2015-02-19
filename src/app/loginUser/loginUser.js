(function(module) {

	module.controller('LoginUserController', ['LoginUserService', function(LoginUserService) {
		var model = this;

		init();

		function init() {

			model.loginUser = function() {
				LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
					console.log(response);
				});
			};

		}
	}]);

}(angular.module("appMensajeria.loginUser")));
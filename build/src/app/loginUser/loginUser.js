(function(module) {

	module.controller('LoginUserController', ['LoginUserService','$state', function(LoginUserService, $state) {
		var model = this;

		init();

		function init() {

			model.loginUser = function() {
				LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
					console.log(response);
				});
			};
			model.newAccount = function() {
				$state.go('createUser');
			};

		}
	}]);

}(angular.module("appMensajeria.loginUser")));
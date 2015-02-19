(function(module) {

	module.controller('LoginUserController', ['LoginUserService', function(LoginUserService) {
		var model = this;

		init();

		function init() {
			/*var response = LoginUserService.test('hello');
			console.log('response', response);*/
			model.loginUser = function() {
				console.log('crear usuario');
				console.log(model.user);
			};
		}
	}]);

}(angular.module("appMensajeria.loginUser")));
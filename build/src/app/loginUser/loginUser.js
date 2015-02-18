(function(module) {

	module.controller('LoginUserController', ['LoginUserService', function(LoginUserService) {
		var model = this;

		init();

		function init() {
			var response = LoginUserService.test('hello');
			console.log('test response', response);
		}
	}]);

}(angular.module("appMensajeria.loginUser")));
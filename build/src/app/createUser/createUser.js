(function(module) {

	module.controller('CreateUserController', ['CreateUserService', function(CreateUserService) {
		var model = this;

		init();

		function init() {
			model.createUser = function() {
				console.log('crear home ', model.user);
				CreateUserService.createUser(model.user.name, model.user.lastname, model.user.email, model.user.password, model.user.mobilephone, function(response) {
					console.log(response);
				});
			};
		}
	}]);

}(angular.module("appMensajeria.createUser")));
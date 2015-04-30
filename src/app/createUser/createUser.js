(function(module) {

	module.controller('CreateUserController', ['CreateUserService', '$state','AlertsService', function(CreateUserService, $state,AlertsService) {
		var model = this;

		init();

		function init() {
			model.createUser = function() {
				console.log('crear home ', model.user);
				CreateUserService.createUser(model.user.name, model.user.lastname, model.user.email, model.user.password, model.user.mobilephone, function(response) {
					console.log(response);
					if (response.response) {
						AlertsService.showAlert("Usuario creado Correctamente", "goHome");
					} else {
						AlertsService.showAlert(response.msg, "");
					}
				});
			};

			model.cancel = function() {
				$state.reload();
			};
		}
	}]);

}(angular.module("appMensajeria.createUser")));
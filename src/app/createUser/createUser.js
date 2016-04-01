(function(module) {

	module.controller('CreateUserController', ['CreateUserService', '$state', 'AlertsService', "$scope", function(CreateUserService, $state, AlertsService, $scope) {
		var model = this;

		init();

		function init() {
			model.createUser = function() {

				//if ($scope.registerForm.$valid) {
					//AlertsService.loading();
					console.log('crear user ', model.user);
					CreateUserService.createUser(model.user.name, model.user.lastname, model.user.email, model.user.password, model.user.mobilephone, function(response) {
						console.log(response);
						//AlertsService.cancel();
						if (response.response) {
							//AlertsService.showAlert("Usuario creado Correctamente", "goHome");
							alert('Usuario creado Correctamente');
						} else {
							//AlertsService.showAlert(response.msg, "");
							alert('Ha ocurrido un error');
						}
					});
				/*} else {
					AlertsService.showSimpleAlert("Completa todos los campos por favor.");
				}*/

			};
		}
	}]);

}(angular.module("appMensajeria.createUser")));
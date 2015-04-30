(function(module) {

	module.controller('ChangePasswordController', ["$state", "$stateParams", "ChangePasswordService", "$mdDialog","AlertsService", function($state, $stateParams, ChangePasswordService, $mdDialog,AlertsService) {
		var model = this;
		var proceed = false;

		init();

		function init() {
			console.log($stateParams.id);

			model.changePass = function() {
				if (model.repeatNewPass === model.newPass) {
					proceed = true;
				} else {
					proceed = false;
					AlertsService.showAlert("Las contraseñas no coinciden", "");
				}

				if (proceed === true) {
					ChangePasswordService.changePass($stateParams.id, model.oldPass, model.repeatNewPass, function(response) {
						console.log(response);
						if (response.response) {
							AlertsService.showAlert("Contraseña actualizada correctamente", "goProfile");
						} else {
							AlertsService.showAlert(response.msg, "");
						}

					});
				}

			};

			

		}
	}]);

}(angular.module("appMensajeria.changePassword")));
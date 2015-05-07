(function(module) {

	module.controller('ChangePasswordController', ["$state", "$stateParams", "ChangePasswordService", "$mdDialog", "AlertsService", "$scope", function($state, $stateParams, ChangePasswordService, $mdDialog, AlertsService, $scope) {
		var model = this;
		var proceed = false;

		init();

		function init() {
			console.log($stateParams.id);

			model.changePass = function() {

				if ($scope.changePassForm.$valid) {
					if (model.repeatNewPass === model.newPass) {
						proceed = true;
					} else {
						proceed = false;
						AlertsService.showAlert("Las contraseñas no coinciden", "");
					}

					if (proceed === true) {
						AlertsService.loading();
						ChangePasswordService.changePass($stateParams.id, model.oldPass, model.repeatNewPass, function(response) {
							console.log(response);
							AlertsService.cancel();
							if (response.response) {
								AlertsService.showAlert("Contraseña actualizada correctamente", "goProfile");
							} else {
								AlertsService.showAlert(response.msg, "");
							}

						});
					}

				} else {
					AlertsService.showSimpleAlert("Completa todos los campos por favor");
				}
			};

		}
	}]);

}(angular.module("appMensajeria.changePassword")));
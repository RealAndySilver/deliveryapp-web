(function(module) {

	module.controller('ChangePasswordController', ["$state", "$stateParams", "ChangePasswordService", "$mdDialog", "AlertsService", "$scope", "LogOut", function($state, $stateParams, ChangePasswordService, $mdDialog, AlertsService, $scope, LogOut) {
		var model = this;
		var proceed = false;

		init();

		function init() {
			model.changePass = function() {
				if ($scope.changePassForm.$valid) {
					if (model.repeatNewPass === model.newPass) {
						proceed = true;
					} else {
						proceed = false;
						$scope.BootstrapModal.show("Las contraseñas no coinciden");
					}
					if (proceed === true) {
						$scope.BootstrapLoading.show(true);
						ChangePasswordService.changePass($stateParams.id, model.oldPass, model.repeatNewPass, function(response) {
							console.log(response);
							$scope.BootstrapLoading.show(false);
							if (response.response) {
								if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
									LogOut.logOutFunction();
								} else {
									$scope.BootstrapModal.show("Contraseña actualizada correctamente.");
									sessionStorage.setItem('pass', btoa(model.repeatNewPass));
								}
							} else {
								$scope.BootstrapModal.show(response.msg);
							}
						});
					}
				} else {
					$scope.BootstrapModal.show("Completa todos los campos por favor.");
				}
			};
		}
	}]);

}(angular.module("appMensajeria.changePassword")));
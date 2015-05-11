(function(module) {

	module.controller('RecoverPasswordController', ["$state", "RecoverPassword", "AlertsService", "$scope", function($state, RecoverPassword, AlertsService, $scope) {
		var model = this;

		init();

		function init() {

			model.goLogin = function() {
				$state.go("loginUser");
			};

			model.recoverPass = function() {

				if ($scope.recoverForm.$valid) {
					AlertsService.loading();
					RecoverPassword.recoverPassword(model.email, function(response) {
						console.log(response);
						AlertsService.cancel();
						if (response.response) {
							AlertsService.showAlert("Se ha enviado un email para iniciar con el proceso de recuperar contraseña", "goProfile");
						} else {
							AlertsService.showAlert(response.msg, "");
						}

					});

				} else {
					AlertsService.showSimpleAlert("Completa todos los campos por favor");
				}

			};


		}
	}]);


	module.controller('ChangePassController', ["$state","$stateParams", "ChangePass", "AlertsService", "$scope", function($state, $stateParams,ChangePass, AlertsService, $scope) {
		var model = this;

		init();
		var proceed=false;

		function init() {
			model.goLogin = function() {
				$state.go("loginUser");
			};

			model.changePass = function() {

				if ($scope.changePassForm.$valid) {

					if (model.repeatPassword === model.password) {
						proceed = true;
					} else {
						proceed = false;
						AlertsService.showAlert("Las contraseñas no coinciden", "");
					}

					if (proceed === true) {
						AlertsService.loading();
						console.log(model.repeatPassword,"TOKEN",$stateParams.token);
						ChangePass.changePass(model.repeatPassword,$stateParams.token, function(response) {
							console.log(response);
							AlertsService.cancel();
							if (response.response) {
								AlertsService.showAlert("Se ha enviado un email para iniciar con el proceso de recuperar contraseña", "goProfile");
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



}(angular.module("appMensajeria.recoverPassword")));
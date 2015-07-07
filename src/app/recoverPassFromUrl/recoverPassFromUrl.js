(function(module) {

	module.controller('RecoverPassFromUrlController', ["$stateParams","RecoverPassFromUrlService","$scope","AlertsService", function($stateParams,RecoverPassFromUrlService,$scope,AlertsService) {
		var model = this;
		model.email="";

		init();

		function init() {
			//http://localhost:9000/#/recoverpassfromurl/JDJhJDEwJHZOZFdRVDVHb095OFZvUGp1enVsQk9OVWpmcVNjTDZIVW91NWR5N256dmp1ODA0Y0JBOG9x/user/new_password/ingwilsonnava@gmail.com
			console.log("TOKEN= " +$stateParams.token);
			model.email=$stateParams.email;
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
						//pass, token
						RecoverPassFromUrlService.newPassFromUrl(btoa(model.password), $stateParams.token, function(response) {
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

}(angular.module("appMensajeria.recoverPassFromUrl")));
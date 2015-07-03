(function(module) {

	module.controller('ProfileController', ["Session", 'ProfileService', "$state", 'AlertsService', "$scope", "LogOut", function(Session, ProfileService, $state, AlertsService, $scope, LogOut) {
		var model = this;
		model.User = (Session.getUser());

		init();
		//User/Logout/:userid   SI ES EXITOSO EL LOG OUT MANDO A LOGIN
		function init() {

			model.updateProfile = function() {
				if ($scope.profileForm.$valid) {
					AlertsService.loading();

					console.log("NEW NAME", model.User.name);
					ProfileService.updateProfile(model.User["_id"], model.User.name, model.User.lastname, model.User.mobilephone, function(response) {
						console.log(response);
						AlertsService.cancel();
						///
						if (response.response) {
							if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
								LogOut.logOutFunction();
							} else {
								AlertsService.showAlert("Datos actualizados correctamente", "");
								var user = response.data;
								Session.setUser(user);
							}

						} else {
							AlertsService.showAlert(response.msg, "");
						}


					});
				} else {
					AlertsService.showSimpleAlert("Completa todos los campos por favor");
				}


			};
			//model.updateProfile();

			model.goChangePassword = function() {
				$state.go('changePassword', {
					id: model.User["_id"]
				});
			};

		}
	}]);

}(angular.module("appMensajeria.profile")));
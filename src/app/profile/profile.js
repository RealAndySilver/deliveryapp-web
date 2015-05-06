(function(module) {

	module.controller('ProfileController', ["Session", 'ProfileService', "$state", 'AlertsService', "$scope", function(Session, ProfileService, $state, AlertsService, $scope) {
		var model = this;
		model.User = (Session.getUser());



		init();

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
							AlertsService.showAlert("Datos actualizados correctamente", "");
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
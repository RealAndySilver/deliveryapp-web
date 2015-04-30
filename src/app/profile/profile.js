(function(module) {

	module.controller('ProfileController', ["Session", 'ProfileService', "$state",'AlertsService', function(Session, ProfileService,$state,AlertsService) {
		var model = this;
		model.User = (Session.getUser());



		init();

		function init() {

			model.updateProfile = function() {

				AlertsService.loading();

				console.log("NEW NAME",model.User.name);
				ProfileService.updateProfile(model.User["_id"],model.User.name,model.User.lastname,model.User.mobilephone, function(response) {
					console.log(response);
					///
					if (response.response) {
							//AlertsService.showAlert("Datos actualizados correctamente", "");
						} else {
							//AlertsService.showAlert(response.msg, "");
						}
				});
			};
			//model.updateProfile();

			model.goChangePassword=function () {
				$state.go('changePassword', {id: model.User["_id"]});
			};

		}
	}]);

}(angular.module("appMensajeria.profile")));
(function(module) {

	module.controller('ProfileController', ["Session", 'ProfileService', "$state", function(Session, ProfileService,$state) {
		var model = this;
		model.User = (Session.getUser());



		init();

		function init() {
			model.updateProfile = function() {
				console.log("NEW NAME",model.User.name);
				ProfileService.updateProfile(model.User["_id"],model.User.name,model.User.lastname,model.User.mobilephone, function(response) {
					console.log(response);
				});
			};
			model.updateProfile();

			model.goChangePassword=function () {
				$state.go('changePassword', {id: model.User["_id"]});
			};

		}
	}]);

}(angular.module("appMensajeria.profile")));
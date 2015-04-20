(function(module) {

	module.controller('ProfileController', ["Session", 'ProfileService', function(Session, ProfileService) {
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

		}
	}]);

}(angular.module("appMensajeria.profile")));
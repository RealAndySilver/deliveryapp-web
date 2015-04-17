(function(module) {

	module.controller('ProfileController', ["Session", 'ProfileService', function(Session, ProfileService) {
		var model = this;
		model.User = (Session.getUser());

		init();

		function init() {
			model.updateProfile = function() {
				//idUser,name,lastname,mobilephone
				DetailsDeliveryItemService.updateProfile(model.User["_id"], function(response) {
					console.log(response);
				});
			};
			//model.updateProfile();

		}
	}]);

}(angular.module("appMensajeria.profile")));
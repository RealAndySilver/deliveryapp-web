(function(module) {

	module.controller('ChangePasswordController', ["$state","$stateParams", "ChangePasswordService", function($state,$stateParams, ChangePasswordService) {
		var model = this;
		var proceed = false;

		init();

		function init() {
			console.log($stateParams.id);

			model.changePass = function() {
				if (model.repeatNewPass === model.newPass) {
					proceed = true;
				} else {
					proceed = false;
				}

				console.log(proceed);
				if (proceed === true) {
					ChangePasswordService.changePass($stateParams.id, model.oldPass, model.repeatNewPass, function(response) {
						console.log(response);
						$state.go("profile");
					});
				}

			};


		}
	}]);

}(angular.module("appMensajeria.changePassword")));
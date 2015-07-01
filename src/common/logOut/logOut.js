(function(module) {

	module.service('LogOut', ["$state","ServerComunicator","LogOutService", function($state,ServerComunicator,LogOutService) {
		var model = this;
		var confirm;

		init();

		function init() {

			model.logOutFunction = function() {
				//AlertsService.loading();

				LogOutService.logout(function(response) {
					console.log("RESPUESTA DEL LOGOUT",response);
					//AlertsService.cancel();
					///
					if (response.response) {
						localStorage.removeItem('isLogin');
						//localStorage.removeItem('user');
						sessionStorage.removeItem('user');
						sessionStorage.removeItem('id');
						sessionStorage.removeItem('email');
						sessionStorage.removeItem('pass');
						sessionStorage.removeItem('token');
						localStorage.removeItem('userInfoLogin');
						$state.go('loginUser');

					} else {
						//AlertsService.showAlert(response.msg, "");
					}
				});
			};
		}
	}]);

}(angular.module("appMensajeria")));
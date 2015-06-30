(function(module) {

	module.service('LogOut', ["$state","ServerComunicator","LogOutService", function($state,ServerComunicator,LogOutService) {
		var model = this;
		var confirm;

		init();

		function init() {

			model.logOutFunction = function() {
				//AlertsService.loading();

				LogOutService.logout(function(response) {
					console.log(response);
					//AlertsService.cancel();
					///
					if (response.response) {
						localStorage.removeItem('isLogin');
						//localStorage.removeItem('user');
						sessionStorage.removeItem('user');
						localStorage.removeItem('userInfoLogin');
						$state.go('loginUser');

					} else {
						//AlertsService.showAlert(response.msg, "");
					}
				});
			};

			model.logout = function() {
				var detailsPromise = ServerComunicator.logout();
				detailsPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message || response.data.error,
							data: response.data.response,
						});

						localStorage.removeItem('isLogin');
						//localStorage.removeItem('user');
						sessionStorage.removeItem('user');
						localStorage.removeItem('userInfoLogin');
						$state.go('loginUser');
						
					},
					function error(e) {
						callback({
							response: false,
							msg: 'Ocurrio un error por favor intente más tarde o compruebe su conexión a internet',
							error: e,
						});
					});
			};

			

		}
	}]);

}(angular.module("appMensajeria")));
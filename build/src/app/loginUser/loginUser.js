(function(module) {

	module.controller('LoginUserController', ['LoginUserService', '$state', 'User', 'Session', function(LoginUserService, $state, User, Session) {
		var model = this;

		init();

		function init() {

			model.loginUser = function() {
				LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
					console.log(response);
					var user = response.data;
					if (response.data) {
						User = user;
						Session.setUser(User);
						$state.go('requestMessenger', {id: user._id});
					} else {
						console.log('respuesta de servidor ', response);
					}
				});
			};

			model.newAccount = function() {
				$state.go('createUser');
			};

			model.forgotPassword = function(email) {
				if (email) {
					console.log('email de usuario ', email);
				} else {
					console.log('MOSTRAR VENTANA PARA INTRODUCIR EMAIL');
				}
			};

		}
	}]);

}(angular.module("appMensajeria.loginUser")));
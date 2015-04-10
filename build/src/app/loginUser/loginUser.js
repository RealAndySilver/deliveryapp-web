(function(module) {

	module.controller('LoginUserController', ['LoginUserService', '$state', '$mdDialog', 'User', 'Session', 'RecoverPassword', function(LoginUserService, $state, $mdDialog, User, Session, RecoverPassword) {
		var model = this;

		init();

		function init() {
			model.loginAlert = function() {
				$mdDialog.show(
					$mdDialog.alert()
					.content('Usuario o contraseña incorrectos.')
					.ariaLabel('login validation')
					.ok('Aceptar')
					.disableParentScroll(false)
				);
			};
			model.recoverAlert = function() {
				$mdDialog.show(
					$mdDialog.alert()
					.content('Te hemos enviado un correo electrónico para que puedas recuperar tu contraseña.')
					.ariaLabel('recover password')
					.ok('Aceptar')
					.disableParentScroll(false)
				);
			};
			/*model.recoverDialog = function(ev) {
				$mdDialog.show({
						//controller: RecoverPasswordController,
						templateUrl: 'recoverPassword.tmpl.html',
						targetEvent: ev,
					});
			};*/

			model.loginUser = function() {
				LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
					console.log(response);
					var user = response.data;
					if (response.data) {
						User = user;
						Session.setUser(User);
						$state.go('requestMessenger', {
							id: user._id
						});
					} else {
						model.loginAlert();
					}
				});
			};

			model.newAccount = function() {
				$state.go('createUser');
			};

			model.recoverPassword = function(email) {
				RecoverPassword.recoverPassword(email, function(response) {
					//console.log(response);
					if (response) {
						model.recoverAlert();
					}
				});
			};

			model.forgotPassword = function(email) {
				if (email) {
					console.log('email de usuario ', email);
					model.recoverPassword(email);
				} else {
					console.log('MOSTRAR VENTANA PARA INTRODUCIR EMAIL');
					//model.recoverDialog();
				}
			};

		}
	}]);

}(angular.module("appMensajeria.loginUser")));
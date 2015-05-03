(function(module) {

	module.controller('LoginUserController', ['LoginUserService', '$state', '$mdDialog', 'User', 'Session', 'RecoverPassword','AlertsService',"ShowMenu", function(LoginUserService, $state, $mdDialog, User, Session, RecoverPassword,AlertsService,ShowMenu) {
		var model = this;

		init();

		function init() {
			console.log("SHOW MENU ANTES");
			console.log("SHOW MENU ANTES", ShowMenu);
			
			model.recoverAlert = function() {
				$mdDialog.show(
					$mdDialog.alert()
					.content('Te hemos enviado un correo electrónico para que puedas recuperar tu contraseña.')
					.ariaLabel('recover password')
					.ok('Aceptar')
					.disableParentScroll(false)
				);
			};

			model.loginUser = function() {
				AlertsService.loading();
				LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
					console.log(response);
					var user = response.data;
					AlertsService.cancel();

					if (!response.response) {
						AlertsService.showAlert(response.msg, "");
					} else if (response.data) {
						
						ShowMenu=true;
						console.log("SHOW MENU DESPUES", ShowMenu);
						User = user;
						console.log(User);
						Session.setUser(User);
						$state.go('profile');
					} else {
						AlertsService.showAlert('Usuario o contraseña incorrectos.','');
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
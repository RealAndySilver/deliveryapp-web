(function(module) {

	module.controller('LoginUserController', ['LoginUserService', '$state', '$mdDialog', 'User', 'Session', 'RecoverPassword', 'AlertsService', "$scope", function(LoginUserService, $state, $mdDialog, User, Session, RecoverPassword, AlertsService, $scope) {
		var model = this;
		model.rememberMe = false;
		model.MY_FORM = "";

		init();

		function init() {

			$scope.$watch('loginForm', function(newValue) {
				if(newValue) {
					model.MY_FORM = $scope.loginForm;
					model.autoLogin();
				}
			});
			
			model.recoverAlert = function() {
				$scope.BootstrapModal.show("Te hemos enviado un correo electrónico para que puedas recuperar tu contraseña.");
			};

			model.loginUser = function() {
				if (model.MY_FORM.$valid) {
					//AlertsService.loading();
					LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
						console.log(response);
						var user = response.data;
						console.log(user);
						//AlertsService.cancel();

						if (!response.response) {
							//AlertsService.showAlert(response.msg, "");
							$scope.BootstrapModal.show(" El usuario y/o contraseña son incorrectos"); 
						} else if (response.data) {
							//INFO PARA EL HEADER
							var headerInfo={"email":model.user.email,"password": btoa(model.user.password)};
							sessionStorage.setItem("id",user._id);
							sessionStorage.setItem('email', headerInfo.email);
							sessionStorage.setItem('pass', headerInfo.password);
							sessionStorage.setItem("token",response.data.session.token);

							if (model.rememberMe === true) {
								localStorage.setItem('isLogin', true);
								///////
								var userInfoLogin = {};
								userInfoLogin.email = model.user.email;
								userInfoLogin.password = btoa(model.user.password);
								localStorage.setItem('userInfoLogin', JSON.stringify(userInfoLogin));
								///////
							}

							User = user;
							//console.log(User);
							Session.setUser(User);
							$state.go('requestMessenger');
						} else {
							//AlertsService.showAlert('Usuario o contraseña incorrectos.', '');
							$scope.BootstrapModal.show("Usuario o contraseña incorrectos");
						}


					});
				} else {
					//AlertsService.showSimpleAlert("Completa los campos de email y contraseña");
					$scope.BootstrapModal.show("Completa los campos de email y contraseña");
				}

			};

			model.newAccount = function() {
				//console.log("IR A NUEVA CUENTA");
				$state.go('createUser');
			};

			model.recoverPassword = function() {
				//IR A LA VENTANA DE RECUPERAR CONTRASEÑA
				//console.log("RECUPERAR CONTRASEÑA");
				$state.go('recoverPassword');
			};

			model.createAccount = function() {
				$state.go('createUser');
			};

			model.autoLogin = function() {

				if (localStorage.getItem('isLogin')) {
					//console.log("EXISTE");
					var user = {};
					user = JSON.parse(localStorage.getItem("userInfoLogin"));
					model.user = {};
					model.user.email = user.email;
					model.user.password = atob(user.password);

					//console.log('form ', loginForm);
					model.loginUser();
				} 
			};

		}
	}]);

}(angular.module("appMensajeria.loginUser")));
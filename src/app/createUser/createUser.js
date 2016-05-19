(function(module) {

	module.controller('CreateUserController', ['ServerComunicator','CreateUserService', '$state', 'AlertsService', "$scope", 'LoginUserService', 'Session', "$rootScope", function(ServerComunicator,CreateUserService, $state, AlertsService, $scope, LoginUserService, Session,$rootScope) {
		var model = this;
		model.showBillingModal = false;
		console.log("Endpoint "+ServerComunicator.getEndpoint);
		model.endpoint=ServerComunicator.getEndpoint;

		//Funcion llamada por la directiva de adicionar tarjeta
		$rootScope.creditCardAdded=function(){
			$state.go('requestMessenger');
		};

		init();

		function init() {
		}

		model.createUser = function() {

			if ($scope.registerForm.$valid) {
				//AlertsService.loading();
				console.log('crear user ', model.user);
				CreateUserService.createUser(model.user.name, model.user.lastname, model.user.email, model.user.password, model.user.mobilephone, function(response) {
					console.log(response);
					//AlertsService.cancel();
					if (response.response) {
						//AlertsService.showAlert("Usuario creado Correctamente", "goHome");
						//alert('Usuario creado Correctamente');
						model.automaticLogin();
						$('#addBilling').modal('show');
					} else {
						//AlertsService.showAlert(response.msg, "");
						//alert('Ha ocurrido un error');
						$scope.BootstrapModal.show("Recuerde diligenciar el formulario correctamente");
					}
				});
			} else {
				$scope.BootstrapModal.show("Recuerde diligenciar el formulario");
			}

		};

		model.automaticLogin = function() {
			LoginUserService.loginUser(model.user.email, model.user.password, function(response) {
				console.log(response);
				var user = response.data;
				console.log(user);

				if (!response.response) {
					$scope.BootstrapModal.show(" El usuario y/o contraseña son incorrectos");
				} else if (response.data) {
					//INFO PARA EL HEADER
					var headerInfo={"email":model.user.email,"password": btoa(model.user.password)};
					sessionStorage.setItem("id",user._id);
					sessionStorage.setItem('email', headerInfo.email);
					sessionStorage.setItem('pass', headerInfo.password);
					sessionStorage.setItem("token",response.data.session.token);

					User = user;
					//console.log(User);
					Session.setUser(User);
				} else {
					$scope.BootstrapModal.show("Usuario o contraseña incorrectos");
				}
			});
		};
	}]);

}(angular.module("appMensajeria.createUser")));
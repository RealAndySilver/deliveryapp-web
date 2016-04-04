(function(module) {

	module.controller('CreateUserController', ['CreateUserService', '$state', 'AlertsService', "$scope", 'LoginUserService', 'Session', 'BillingService', function(CreateUserService, $state, AlertsService, $scope, LoginUserService, Session, BillingService) {
		var model = this;
		model.showBillingModal = false;

		init();

		function init() {
			var addPaymentRequest = {};
			model.currentFranchise = "";

			model.createUser = function() {

				//if ($scope.registerForm.$valid) {
					//AlertsService.loading();
					console.log('crear user ', model.user);
					CreateUserService.createUser(model.user.name, model.user.lastname, model.user.email, model.user.password, model.user.mobilephone, function(response) {
						console.log(response);
						//AlertsService.cancel();
						if (response.response) {
							//AlertsService.showAlert("Usuario creado Correctamente", "goHome");
							//alert('Usuario creado Correctamente');
							model.showBillingModal = true;
						} else {
							//AlertsService.showAlert(response.msg, "");
							//alert('Ha ocurrido un error');
							$scope.BootstrapModal.show("Recuerde diligenciar el formulario correctamente");
						}
					});
				/*} else {
					AlertsService.showSimpleAlert("Completa todos los campos por favor.");
				}*/

			};

			model.skipBilling = function() {
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
						$state.go('requestMessenger');
					} else {
						$scope.BootstrapModal.show("Usuario o contraseña incorrectos");
					}
				});
			};

			model.addBillingInformation = function(billingInformation) {
				console.log('current billing infotmation ',billingInformation);
				addPaymentRequest.user_id = sessionStorage.id;
				addPaymentRequest.card_number = billingInformation.cardNumber;
				addPaymentRequest.exp_date = billingInformation.expiryMonth + '/' + billingInformation.expiryYear;
				addPaymentRequest.franchise = 'VISA';
				addPaymentRequest.cvv = billingInformation.securityCode;
				console.log('current payment infotmation ',addPaymentRequest);

				BillingService.createPayment(addPaymentRequest, function(response) {
					console.log(response);

					if (response.response) {
						$state.go('requestMessenger'); 
					} else {
						$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
						$state.go('requestMessenger');
					}

				});
			};

			model.getFranchise = function(cardNumber) {
				if (cardNumber.length >3) {
					console.log('get getFranchise.....', cardNumber);

					BillingService.getFranchise(cardNumber, function(response) {
						console.log(response);

						model.currentFranchise = response.data;
						console.log('model.currentFranchise...--> ', model.currentFranchise);

						/*if (response.response) {
							$state.go('requestMessenger'); 
						} else {
							$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
							$state.go('requestMessenger');
						}*/

					});
				}
			};

		}
	}]);

}(angular.module("appMensajeria.createUser")));
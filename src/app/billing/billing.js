(function(module) {

	module.controller('BillingController', ['BillingService','ValidationService','$scope', function(BillingService,ValidationService,$scope) {
		var model = this;
		var userId = sessionStorage.id;

		model.isEditing = false;
		model.billingInformation = {};
		model.currentBillingInformation = [];
		model.currentFranchise = "";

		model.billingInformation.expiryMonth='01';
		model.billingInformation.expiryYear='16';

		var addPaymentRequest = {};

		model.getPaymentMethods = function() {

			BillingService.getPaymentMethods(userId, function(response) {
				//console.log('getPaymentMethods ->', response);

				if (response.response) {
					model.currentBillingInformation = response.data;
					//console.log('currentBillingInformation ->', model.currentBillingInformation);
					model.billingInformation = {};
				} else {
					//$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
					//$state.go('requestMessenger');
				}

			});
		};
		model.getPaymentMethods();

		model.addBillingInformation = function(billingInformation) {
			//console.log('current billing infotmation ',billingInformation);

			addPaymentRequest.user_id = userId;
			addPaymentRequest.card_number = billingInformation.cardNumber;
			addPaymentRequest.exp_date = billingInformation.expiryMonth + '/' + billingInformation.expiryYear;
			//addPaymentRequest.franchise = 'VISA';
			addPaymentRequest.cvv = billingInformation.securityCode;
			//console.log('current payment infotmation ',addPaymentRequest);

			model.isEditing = false;

			BillingService.createPayment(addPaymentRequest, function(response) {
				//console.log(response);

				if (response.response) {
					$('#addBilling').modal('hide');
					model.getPaymentMethods();
				} else {
					$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
				}

			});
		};

		model.deletePaymentMethod = function(currentBillingInfo) {
			//console.log('payment method for deleting ', currentBillingInfo);

			BillingService.deletePayment(currentBillingInfo._id, function(response) {
				console.log(response);

				if (response.response) {
					model.getPaymentMethods();
				} else {
					$scope.BootstrapModal.show("Ha ocurrido un error al eliminar método de pago, intenta mas tarde");
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

	}]);

}(angular.module("appMensajeria.billing")));
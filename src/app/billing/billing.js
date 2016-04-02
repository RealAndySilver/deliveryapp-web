(function(module) {

	module.controller('BillingController', ['BillingService', function(BillingService) {
		var model = this;
		var userId = sessionStorage.id;

		model.isEditing = false;
		model.billingInformation = {};
		var addPaymentRequest = {};

		/*model.currentBillingInformation = [
			{
				"cardHolderName": 'Juan Jose Perez',
				"cardNumber": "**** 1234",
				"securityCode": 7856,
				"expiryMonth": 12,
				"expiryYear": 21,
			},
			{
				"cardHolderName": 'Ana Maria Perez',
				"cardNumber": "**** 4321",
				"securityCode": 3390,
				"expiryMonth": 10,
				"expiryYear": 23,
			},
		];*/

		model.currentBillingInformation = [];

		model.getPaymentMethods = function() {

			BillingService.getPaymentMethods(userId, function(response) {
				console.log('getPaymentMethods ->', response);

				if (response.response) {
					model.currentBillingInformation = response.data;
					console.log('currentBillingInformation ->', model.currentBillingInformation);
				} else {
					//$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
					//$state.go('requestMessenger');
				}

			});
		};
		model.getPaymentMethods();

		model.addBillingInformation = function(billingInformation) {
			model.isEditing = false;
			console.log('current billing infotmation ',billingInformation);
			addPaymentRequest.user_id = userId;
			addPaymentRequest.card_number = billingInformation.cardNumber;
			addPaymentRequest.exp_date = billingInformation.expiryMonth + '/' + billingInformation.expiryYear;
			addPaymentRequest.franchise = 'VISA';
			addPaymentRequest.cvv = billingInformation.securityCode;
			console.log('current payment infotmation ',addPaymentRequest);

			BillingService.createPayment(addPaymentRequest, function(response) {
				console.log(response);

				if (response.response) {
					$('#addBilling').modal('hide');
					model.getPaymentMethods();
				} else {
					$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
				}

			});
		};

		model.editBillingInformation = function(currentBillingInfo, operation) {
			if (operation == 'Edit') {
				model.isEditing = true;
			}
			console.log('billing info for editing ', currentBillingInfo);
			model.billingInformation.cardHolderName = currentBillingInfo.cardHolderName;
			model.billingInformation.securityCode = currentBillingInfo.securityCode;
			model.billingInformation.expiryMonth = currentBillingInfo.expiryMonth;
			model.billingInformation.expiryYear = currentBillingInfo.expiryYear;
		};

		model.deletePaymentMethod = function(currentBillingInfo) {
			console.log('payment method for deleting ', currentBillingInfo);

			BillingService.deletePayment(currentBillingInfo._id, function(response) {
				console.log(response);

				if (response.response) {
					model.getPaymentMethods();
				} else {
					$scope.BootstrapModal.show("Ha ocurrido un error al eliminar método de pago, intenta mas tarde");
				}

			});
		};

	}]);

}(angular.module("appMensajeria.billing")));
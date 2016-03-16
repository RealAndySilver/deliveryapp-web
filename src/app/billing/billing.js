(function(module) {

	module.controller('BillingController', function() {
		var model = this;

		model.isEditing = false;

		model.billingInformation = {};

		model.currentBillingInformation = [
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
		];

		model.addBillingInformation = function(billingInformation) {
			model.isEditing = false;
			console.log('current billing infotmation ',billingInformation);
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

	});

}(angular.module("appMensajeria.billing")));
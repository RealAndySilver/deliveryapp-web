(function(module) {

	module.controller('BillingController', function() {
		var model = this;

		model.billingInformation = {};

		model.addBillingInformation = function(billingInformation) {
			console.log('current billing infotmation ',billingInformation);
		};

	});

}(angular.module("appMensajeria.billing")));
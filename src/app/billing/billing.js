(function(module) {

	module.controller('BillingController', ['BillingService','ValidationService','$scope','$rootScope', function(BillingService,ValidationService,$scope,$rootScope) {
		var model = this;
		var userId = sessionStorage.id;

		model.isEditing = false;
		model.billingInformation = {};
		model.currentBillingInformation = [];
		model.currentFranchise = "";

		model.billingInformation.expiryMonth='01';
		model.billingInformation.expiryYear='16';

		//Funcion llamada por la directiva de adicionar tarjeta
		$rootScope.creditCardAdded=function(){
			model.getPaymentMethods();
		};

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

		model.getUserId=function(){
			return sessionStorage.id;
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

	}]);

}(angular.module("appMensajeria.billing")));
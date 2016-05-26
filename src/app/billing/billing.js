(function(module) {

	module.controller('BillingController', ['BillingService','ValidationService','$scope','$rootScope', function(BillingService,ValidationService,$scope,$rootScope) {
		var model = this;
		var userId = sessionStorage.id;

		model.isEditing = false;
		model.billingInformation = {};
		model.currentBillingInformation = [];
		model.currentFranchise = "";

		model.paymentHistoryArray=[];

		model.getPaymentMethods = function() {
			BillingService.getPaymentMethods(userId, function(response) {
				if (response.response) {
					model.currentBillingInformation = response.data;
				}
			});
		};

		model.getPaymentHistory = function() {
			BillingService.getPaymentHistory(userId, function(response) {
				if (response.response) {
					model.paymentHistoryArray = response.data;
					console.log("Recibi ",model.paymentHistoryArray);
				}
			});
		};


		init();

		function init() {
			model.getPaymentMethods();
			model.getPaymentHistory();
		}

		//Funcion llamada por la directiva de adicionar tarjeta
		$rootScope.creditCardAdded=function(){
			model.getPaymentMethods();
		};



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
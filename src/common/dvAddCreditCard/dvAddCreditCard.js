(function(module) {

	module.directive('dvAddCreditCard', function() {
		return {
			restrict: 'E',
			templateUrl: 'dvAddCreditCard/dvAddCreditCard.tpl.html',
			controller: 'DVAddCreditCardController',
			//controllerAs: 'mapCtrl',
			scope: {
				user_id: "=user_id",
			},
		};
	});

	module.controller('DVAddCreditCardController', ['$scope','$rootScope','BillingService' , function($scope,$rootScope,BillingService) {
		var model = this;

		init();

		function init() {
			model.showErrorMessage=false;
		}

		model.cancelAction=function(){
			$rootScope.creditCardAdded();
		};

		model.addBillingInformation = function(billingInformation) {
			model.showErrorMessage=false;
			//console.log('current billing infotmation ',billingInformation);

			var addPaymentRequest={};

			addPaymentRequest.user_id = sessionStorage.id;
			addPaymentRequest.card_number = billingInformation.cardNumber;
			addPaymentRequest.exp_date = billingInformation.expiryMonth + '/' + billingInformation.expiryYear;
			addPaymentRequest.cvv = billingInformation.securityCode;
			addPaymentRequest.card_holder_first_name=billingInformation.cardHolderFirstName;
			addPaymentRequest.card_holder_last_name=billingInformation.cardHolderLastName;
			addPaymentRequest.card_holder_address=billingInformation.cardHolderAddress;
			addPaymentRequest.card_holder_city=billingInformation.cardHolderCity;
			addPaymentRequest.card_holder_doc_type=billingInformation.cardHolderDocType;
			addPaymentRequest.card_holder_doc_number=billingInformation.cardHolderDocNumber;
			addPaymentRequest.card_holder_email=billingInformation.cardHolderEmail;

			model.isEditing = false;

			//console.log("REQUEST ",addPaymentRequest);

			BillingService.createPayment(addPaymentRequest, function(response) {
				console.log(response);
				if (response.response) {
					$('#addBilling').modal('hide');
					$rootScope.creditCardAdded();
				} else {
					model.showErrorMessage=true;
					model.errorMessage=response.msg;
					//$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
				}

			});
		};

		model.getFranchise = function(cardNumber) {
			model.showErrorMessage=false;
			if (cardNumber && cardNumber.length >3) {
				//console.log('get getFranchise.....', cardNumber);
				BillingService.getFranchise(cardNumber, function(response) {
					//console.log(response);
					if (response.data==='NA') {
						model.currentFranchise = null;
					}else{
						model.currentFranchise = response.data;
					}
					console.log('model.currentFranchise...--> ', model.currentFranchise);
				});
			}else{
				model.currentFranchise = null;
			}
		};

	}]);

}(angular.module("appMensajeria.dvAddCreditCard", [])));
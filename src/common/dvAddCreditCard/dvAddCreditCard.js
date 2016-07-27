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

		/**
		 * Validates the doc number according to the doc type selected by the user
		 *
		 * */
		$scope.docNumberPatternValidator = (function() {
			var regExpNIT = /^[1-9]\d{6,8}\-?\d?$/;
			var regExpCC = /^[1-9]\d{4,9}$/;
			var regExpCE= /^[a-zA-Z]*[1-9]\d{3,7}$/;
			var regExpTI = /^\d{2}[0-1][0-9][0-3][0-9]\-\d{5}$/;
			var regExpPPN = /^\w{4,12}$/;

			return {
				test: function(value) {
					switch(model.billingInformation.cardHolderDocType){
						case ('PPN'):
							return regExpPPN.test(value);
						case ('CC'):
							return regExpCC.test(value);
						case ('CE'):
							return regExpCE.test(value);
						case ('NIT'):
							return regExpNIT.test(value);
						case ('TI'):
							return regExpTI.test(value);
					}
				}
			};
		})();

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
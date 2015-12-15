(function(module) {

	module.controller('RatingMessengerController', ["$scope", "RatingMessengerService", "Session", "$stateParams", "$state", "AlertsService","LogOut", function($scope, RatingMessengerService, Session, $stateParams, $state, AlertsService,LogOut) {
		var model = this;

		model.User = (Session.getUser());

		init();

		function init() {
			$scope.rate = 5;
			$scope.max = 5;
			$scope.isReadonly = false;
			model.review = "";

			$scope.ratingStates = [
				{ 
					stateOn: 'glyphicon-ok-sign',
					stateOff: 'glyphicon-ok-circle'
				}, 
				{
					stateOn: 'glyphicon-star',
					stateOff: 'glyphicon-star-empty'
				}, 
				{
					stateOn: 'glyphicon-heart',
					stateOff: 'glyphicon-ban-circle'
				}, 
				{
					stateOn: 'glyphicon-heart'
				}, 
				{
					stateOff: 'glyphicon-off'
				}
			];

			//console.log("RECIBIDO EN RATE", $stateParams.idItem);
			model.ratingMessenger = function() {
				//AlertsService.loading();
				$scope.BootstrapLoading.show(true);
				//idItem,idUser,numberStars,review
				RatingMessengerService.ratingMessenger($stateParams.idItem, model.User["_id"], $scope.rate, model.review, function(response) {
					console.log(response);
					//AlertsService.cancel();
					$scope.BootstrapLoading.show(false);
					if (response.response) {
						if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
							LogOut.logOutFunction();
						} else {
							$scope.BootstrapModal.show("Gracias por calificar al mensajero");
							//AlertsService.showAlert("Gracias por calificar al mensajero", "goProfile");
						}
					} else {
						$scope.BootstrapModal.show(response.msg);
						//AlertsService.showAlert(response.msg, "");
					}
					$state.go("requestMessenger");

				});
			};



		}
	}]);

}(angular.module("appMensajeria.ratingMessenger")));
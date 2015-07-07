(function(module) {

	module.controller('AccountActivationController', ["$state","$stateParams",function($state,$stateParams) {
		var model = this;
		model.email="";

		init();

		function init() {
			model.email=$stateParams.email;
			model.goHome=function(){
				$state.go("loginUser");
			};

		}
	}]);

}(angular.module("appMensajeria.AccountActivation")));
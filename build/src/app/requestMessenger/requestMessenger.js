(function(module) {

	module.controller('RequestMessengerController', function() {
		var model = this;

		init();

		function init() {
			model.requestMessenger = function() {
				console.log('objeto servicio ', model.user);
			};
		}
	});

}(angular.module("appMensajeria.requestMessenger")));
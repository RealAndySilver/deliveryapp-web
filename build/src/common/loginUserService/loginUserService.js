(function(module) {

	module.service('LoginUserService', function() {
		var model = this;

		init();

		function init() {
			model.test = function(hello) {
				console.log('Hello!');
				if(hello !== 'hello') {
					return false;
				}
				return true;
			};
		}
	});

}(angular.module("appMensajeria.loginUserService", [
	'ui.router'
])));
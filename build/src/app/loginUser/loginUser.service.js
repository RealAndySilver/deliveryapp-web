(function(module) {

	module.service('LoginUserService', function() {
		var model = this;

		init();

		function init() {
			self.create = function() {
			var type = "Login";
			return $http({
				method: 'GET',
				url: endpoint + type + '/GetAll',
			});
		};
		}
	});

}(angular.module("appMensajeria.loginUser")));
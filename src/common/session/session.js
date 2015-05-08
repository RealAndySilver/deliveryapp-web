(function(module) {

	module.service('Session', ['$http', 'User', function($http, User) {
		var model = this;

		init();

		function init() {

			model.setUser = function(user) {
				sessionStorage.setItem('user', JSON.stringify(user));
			};

			model.getUser = function() {
				if (!sessionStorage.getItem("user")) {
					return User;
				}

				var user = JSON.parse(sessionStorage.getItem("user"));
				User = user;

				return User;
			};

		}
	}]);

}(angular.module("appMensajeria.session", [])));